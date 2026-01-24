import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prismaClient";

export const toggleLike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { tweet_id } = req.body;
    const userId = req.user.id;

    const thread = await prisma.thread.findUnique({
      where: { id: Number(tweet_id) },
    });

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        threadId: Number(tweet_id),
        userId: userId,
      },
    });

    let isLikeAction = false;

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      isLikeAction = false;
    } else {
      await prisma.like.create({
        data: {
          threadId: Number(tweet_id),
          userId: userId,
        },
      });

      isLikeAction = true;
    }

    const likesCount = await prisma.like.count({
      where: { threadId: Number(tweet_id) },
    });

    req.io.emit("update-like", {
      threadId: Number(tweet_id),
      likesCount: likesCount,
    });

    res.status(200).json({
      message: isLikeAction
        ? "Tweet liked successfully."
        : "Unliked successfully.",
      tweet_id,
      user_id: userId,
      isLiked: isLikeAction,
      likesCount,
    });
  } catch (error) {
    next(error);
  }
};
