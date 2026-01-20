import { NextFunction, Request, Response } from "express-serve-static-core";
import { prisma } from "../prisma/prisaClient";
import { AppError } from "../errors/AppError";

export const getAllThreads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { limit = 10, page = 0 } = req.query;
    const userId = 1;
    const threads = await prisma.thread.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        createdBy: {
          select: {
            id: true,
            username: true,
            fullname: true,
            photo_profile: true,
          },
        },
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
        likes: {
          where: {
            userId,
          },
          select: {
            id: true,
          },
        },
      },
      take: Number(limit),
      skip: Number(page) === 0 ? 0 : (Number(page) - 1) * Number(limit),
    });

    if (!threads || threads.length === 0)
      throw new AppError("Data Threads Not Found", 404);

    const result = threads.map((thread) => ({
      id: thread.id,
      content: thread.content,
      user: thread.createdBy,
      created_at: thread.createdAt,
      likes: thread._count.likes,
      reply: thread._count.replies,
      isLiked: thread.likes.length > 0,
    }));

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Get Data Thread Successfully.",
      data: {
        threads: result,
      },
    });
  } catch (error) {
    next(error);
  }
};
