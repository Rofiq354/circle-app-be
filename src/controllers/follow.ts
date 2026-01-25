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
    const { type } = req.query;

    if (!type) {
      return res.status(400).json({
        status: "error",
        message: "Query parameter 'type' is required.",
      });
    }

    let result;

    if (type === "following") {
      result = await prisma.following.findMany({
        where: { followerId: userId },
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
        following: result.map((item) => item.following),
      };
    } else {
      result = await prisma.following.findMany({
        where: { followingId: userId },
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
        followers: result.map((item) => item.follower),
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
      return res.status(400).json({ message: "You cannot follow yourself" });
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
        message: "You have successfully unfollowed the user.",
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
        message: "You have successfully followed the user.",
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
