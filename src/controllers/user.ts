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
      threads: user?._count.threads,
    };

    res.status(200).json(result);
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

    return res.status(200).json({ data: result });
  } catch (error) {
    next(new AppError("Gagal update profile.", 500));
  }
};
