import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prismaClient";
import { AppError } from "../errors/AppError";

export const getUserFollowers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const { id, type } = req.params;
    // const { type } = req.query;

    if (!type) {
      return res.status(400).json({
        status: "error",
        message: "Query parameter 'type' is required.",
      });
    }

    let result;

    const myFollowing = await prisma.following.findMany({
      where: { followerId: Number(userId) },
      select: { followingId: true },
    });

    // Ubah ke Set agar pencarian (lookup) lebih cepat
    const myFollowingIds = new Set(myFollowing.map((f) => f.followingId));

    if (type === "following") {
      result = await prisma.following.findMany({
        where: { followerId: Number(id) },
        include: {
          following: {
            select: {
              id: true,
              username: true,
              fullname: true,
              photo_profile: true,
              bio: true,
            },
          },
        },
      });

      result = {
        followers: result.map((item) => ({
          ...item.following,
          isFollowing: myFollowingIds.has(item.following.id),
        })),
      };
    } else {
      result = await prisma.following.findMany({
        where: { followingId: Number(id) },
        include: {
          follower: {
            select: {
              id: true,
              username: true,
              fullname: true,
              photo_profile: true,
              bio: true,
            },
          },
        },
      });

      result = {
        followers: result.map((item) => ({
          ...item.follower,
          isFollowing: myFollowingIds.has(item.follower.id),
        })),
      };
    }

    // const result = followers;
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    next(
      new AppError(
        "Failed to fetch follower data. Please try again later.",
        500,
      ),
    );
  }
};

export const toggleFollow = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const followerId = req.user.id;
    const followingId = parseInt(req.params.followingId as string);

    // Cegah user follow diri sendiri
    if (followerId === followingId) {
      return res
        .status(400)
        .json({ message: "Anda tidak boleh follow diri sendiri" });
    }

    // Cek apakah sudah follow
    const existingFollow = await prisma.following.findFirst({
      where: {
        followerId,
        followingId,
      },
    });

    if (existingFollow) {
      // Jika SUDAH ada, maka UNFOLLOW (Delete)
      await prisma.following.delete({
        where: {
          id: existingFollow.id,
        },
      });

      return res.status(200).json({
        status: "success",
        message: "Berhasil unfollow user.",
        data: {
          user_id: followingId,
          isFollowed: false,
        },
      });
    } else {
      // Jika BELUM ada, maka FOLLOW (Create)
      await prisma.following.create({
        data: {
          followerId: followerId,
          followingId: followingId,
        },
      });

      return res.status(200).json({
        status: "success",
        message: "Berhasil follow user.",
        data: {
          user_id: followingId,
          isFollowed: true,
        },
      });
    }
  } catch (error) {
    next(
      new AppError("Failed to follow the user. Please try again later.", 500),
    );
  }
};
