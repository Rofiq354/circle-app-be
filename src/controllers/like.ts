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

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return res.status(200).json({
        message: "Unliked successfully",
        isLiked: false,
      });
    } else {
      await prisma.like.create({
        data: {
          threadId: Number(tweet_id),
          userId: userId,
        },
      });
    }

    res.status(200).json({
      message: "Tweet liked successfully.",
      tweet_id,
      user_id: userId,
      isLiked: true,
    });
  } catch (error) {
    next(error);
  }
};
