import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prismaClient";
import { AppError } from "../errors/AppError";
import { redis } from "../lib/redis";

export const getUserFollowers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const { id, type } = req.params;

    if (!type) {
      return res.status(400).json({
        status: "error",
        message: "Query parameter 'type' is required.",
      });
    }

    const myFollowingQuery = prisma.following.findMany({
      where: { followerId: Number(userId) },
      select: { followingId: true },
    });

    let mainQuery;
    if (type === "following") {
      mainQuery = prisma.following.findMany({
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
    } else {
      mainQuery = prisma.following.findMany({
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
    }

    const [myFollowing, rawData] = await Promise.all([
      myFollowingQuery,
      mainQuery,
    ]);

    const myFollowingIds = new Set(myFollowing.map((f) => f.followingId));

    const followers = rawData.map((item: any) => {
      const userData = type === "following" ? item.following : item.follower;
      return {
        ...userData,
        isFollowing: myFollowingIds.has(userData.id),
      };
    });

    res.status(200).json({
      status: "success",
      message: "Berhasil mengambil data follower id ke" + id,
      data: { followers },
    });
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

    const existingFollow = await prisma.following.findFirst({
      where: { followerId, followingId },
    });

    const clearFollowCache = async () => {
      try {
        const userCacheKeys = await redis.keys(`users:*:viewer:${followerId}`);
        const profileCacheKey = `threads:user_profile:${followingId}`;

        const allKeysToDel = [...userCacheKeys, profileCacheKey];

        if (allKeysToDel.length > 0) {
          await redis.del(...allKeysToDel);
        }
      } catch (err) {
        console.error("Redis Delete Error:", err);
      }
    };

    if (existingFollow) {
      // Jika SUDAH ada, maka UNFOLLOW (Delete)
      await prisma.following.delete({ where: { id: existingFollow.id } });

      await clearFollowCache();

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

      await clearFollowCache();

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
