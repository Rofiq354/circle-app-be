import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prismaClient";
import { AppError } from "../errors/AppError";

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;

    if (!userId) next(new AppError("User Not Found.", 404));

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            likes: true,
            threads: true,
          },
        },
      },
    });

    // console.log(user);
    const result = {
      id: user?.id,
      username: user?.username,
      name: user?.fullname,
      photo_profile: user?.photo_profile,
      cover_photo: user?.cover_photo,
      bio: user?.bio,
      follower_count: user?._count.followers,
      following_count: user?._count.following,
      likes: user?._count.likes,
      threads_count: user?._count.threads,
    };

    res
      .status(200)
      .json({ message: "Berhasil mengambil data my profile.", data: result });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const { name, username, bio } = req.body;
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    const updateData: any = {};

    if (name) updateData.fullname = name;
    if (username) updateData.username = username;
    if (bio) updateData.bio = bio;

    const host = req.get("host");
    const protocol = req.protocol;

    if (files?.photo_profile?.[0]) {
      const fileName = files.photo_profile[0].filename;
      updateData.photo_profile = `${protocol}://${host}/public/uploads/${fileName}`;
    }

    if (files?.cover_photo?.[0]) {
      const fileName = files.cover_photo[0].filename;
      updateData.cover_photo = `${protocol}://${host}/public/uploads/${fileName}`;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        fullname: true,
        photo_profile: true,
        cover_photo: true,
        bio: true,
        _count: {
          select: {
            followers: true,
            following: true,
            threads: true,
            likes: true,
          },
        },
      },
    });

    const result = {
      id: updatedUser.id,
      username: updatedUser.username,
      name: updatedUser.fullname,
      photo_profile: updatedUser.photo_profile,
      cover_photo: updatedUser.cover_photo,
      bio: updatedUser.bio,
      follower_count: updatedUser._count.followers,
      following_count: updatedUser._count.following,
      likes: updatedUser._count.likes,
      threads: updatedUser._count.threads,
    };

    return res
      .status(200)
      .json({ message: "Profile berhasil diupdate.", data: result });
  } catch (error) {
    next(new AppError("Gagal update profile.", 500));
  }
};

export const getUserProfileByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username } = req.params;
    const currentUserId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { username: String(username) },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            threads: true,
            likes: true,
          },
        },
        followers: {
          where: { followerId: Number(currentUserId) },
        },
      },
    });

    if (!user) {
      return next(new AppError("User tidak ditemukan.", 404));
    }
    const result = {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      photo_profile: user.photo_profile,
      cover_photo: user.cover_photo,
      bio: user.bio,
      follower_count: user._count.followers,
      following_count: user._count.following,
      likes_count: user._count.likes,
      threads_count: user._count.threads,
      isFollowed: user.followers.length > 0,
    };
    return res.status(200).json({
      message: "Success get profile",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { page = 1, limit = 20, type = "all" } = req.query;
  try {
    const userId = req.user.id;

    let result;
    let message;

    if (type === "all") {
      const users = await prisma.user.findMany({
        where: {
          NOT: { id: Number(userId) },
        },
        select: {
          id: true,
          username: true,
          fullname: true,
          photo_profile: true,
          followers: {
            where: { followerId: Number(userId) },
          },
        },
        take: Number(limit),
        skip: Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit),
      });

      result = users.map((user) => {
        const { followers, ...userWithoutFollowers } = user;

        return {
          ...userWithoutFollowers,
          isFollowed: followers.length > 0,
        };
      });

      message = "Success get all user";
    } else if (type === "suggested") {
      const users = await prisma.user.findMany({
        where: {
          AND: [
            { NOT: { id: Number(userId) } },
            {
              followers: {
                // user yang tidak memiliki pengikut dengan ID saya
                none: {
                  followerId: Number(userId),
                },
              },
            },
          ],
        },
        select: {
          id: true,
          username: true,
          fullname: true,
          photo_profile: true,
          followers: {
            where: { followerId: Number(userId) },
          },
        },
        take: Number(limit),
        skip: Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit),
      });

      result = users.map((user) => {
        const { followers, ...userWithoutFollowers } = user;

        return {
          ...userWithoutFollowers,
          isFollowed: followers.length > 0,
        };
      });

      message = "Success get suggested user";
    }

    res.status(200).json({ message, data: result });
  } catch (error) {
    next(error);
  }
};

export const searchUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { keyword } = req.query;
  const currentUserId = req.user.id;
  try {
    let result;

    if (!keyword) {
      // Jika tidak ada keyword, tampilkan semua user (kecuali diri sendiri)
      result = await prisma.user.findMany({
        where: {
          NOT: { id: Number(currentUserId) },
        },
        select: {
          id: true,
          username: true,
          fullname: true,
          bio: true,
          photo_profile: true,
          followers: {
            where: { followerId: Number(currentUserId) },
          },
        },
        skip: 0,
        take: 10,
      });
    } else {
      // Jika ada keyword, cari berdasarkan username ATAU fullname
      result = await prisma.user.findMany({
        where: {
          AND: [
            { NOT: { id: Number(currentUserId) } },
            {
              OR: [
                {
                  username: { contains: String(keyword), mode: "insensitive" },
                },
                {
                  fullname: { contains: String(keyword), mode: "insensitive" },
                },
              ],
            },
          ],
        },
        select: {
          id: true,
          username: true,
          fullname: true,
          bio: true,
          photo_profile: true,
          followers: {
            where: { followerId: Number(currentUserId) },
          },
        },
        skip: 0,
        take: 10,
      });
    }

    // Mapping data agar frontend menerima format isFollowed: boolean
    const formattedResult = result.map((user) => {
      const { followers, ...userData } = user;
      return {
        ...userData,
        isFollowing: followers.length > 0,
      };
    });

    res.status(200).json({
      status: "success",
      message: "User found",
      data: formattedResult,
    });
  } catch (error) {
    next(
      new AppError("Failed to fetch user data. Please try again later.", 500),
    );
  }
};
