import { NextFunction, Request, Response } from "express-serve-static-core";
import { prisma } from "../prisma/prismaClient";

export const getRepliesByThreadId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { thread_id } = req.query;

    const replies = await prisma.reply.findMany({
      where: {
        threadId: Number(thread_id),
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            fullname: true,
            photo_profile: true,
          },
        },
      },
    });

    const result = replies.map((reply) => {
      return {
        id: reply.id,
        content: reply.content,
        user: {
          id: reply.user.id,
          username: reply.user.username,
          name: reply.user.fullname,
          profile_picture: reply.user.photo_profile,
        },
        created_at: reply.createdAt,
      };
    });
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Get Data Thread Successfully.",
      data: {
        replies: result,
      },
    });
  } catch (error) {
    next(error);
  }
};
