import { NextFunction, Request, Response } from "express-serve-static-core";
import { prisma } from "../prisma/prismaClient";
import { AppError } from "../errors/AppError";

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
        image: true,
        threadId: true,
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
        threadId: reply.threadId,
        content: reply.content,
        image: reply.image,
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

export const createReplyByThreadId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;

    const { thread_id } = req.query;

    const thread = await prisma.thread.findUnique({
      where: {
        id: Number(thread_id),
      },
    });

    if (!thread) {
      return next(new AppError("Thread not found", 404));
    }

    let image_url = null;

    if (req.file) {
      image_url = `${req.protocol}://${req.get("host")}/public/uploads/${req.file.filename}`;
    }

    const reply = await prisma.reply.create({
      data: {
        content,
        userId,
        threadId: thread.id,
        image: image_url,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        image: true,
        user: true,
        threadId: true,
      },
    });

    const id = reply.id;

    const timestamp = new Date().toISOString();

    const result = {
      id,
      user_id: userId,
      thread_id,
      content,
      image_url,
      timestamp,
    };

    const replySocket = {
      id: reply.id,
      content: reply.content,
      image_url: reply.image ? reply.image : null,
      created_at: reply.createdAt,
      threadId: reply.threadId,
      user: {
        id: reply.user.id,
        username: reply.user.username,
        name: reply.user.fullname,
        profile_picture: reply.user.photo_profile,
      },
    };

    req.io.emit("new-reply", replySocket);

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Reply berhasil diposting.",
      data: {
        tweet: result,
      },
    });
  } catch (error) {
    next(new AppError("Invalid thread content", 500));
  }
};
