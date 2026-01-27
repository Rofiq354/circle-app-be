import { NextFunction, Request, Response } from "express-serve-static-core";
import { prisma } from "../prisma/prismaClient";
import { AppError } from "../errors/AppError";

export const getAllThreads = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { limit = 50, page = 0 } = req.query;
    const userId = req.user.id;

    const threads = await prisma.thread.findMany({
      select: {
        id: true,
        content: true,
        image: true,
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
      orderBy: { createdAt: "desc" },
    });

    if (!threads || threads.length === 0)
      throw new AppError("Data Threads Not Found", 404);

    const result = threads.map((thread) => ({
      id: thread.id,
      content: thread.content,
      images: thread.image,
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

export const createThread = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    let imagePath = null;

    if (req.file) {
      imagePath = `${req.protocol}://${req.get("host")}/public/uploads/${req.file.filename}`;
    }
    const newThread = await prisma.thread.create({
      data: {
        content,
        image: imagePath,
        createdById: userId,
      },
      include: {
        createdBy: true,
      },
    });

    const tweet = {
      id: newThread.id.toString(),
      user_id: newThread.createdById.toString(),
      content: newThread.content,
      image_url: newThread.image ?? null,
      timestamp: newThread.createdAt,
    };

    const tweetSocket = {
      id: tweet.id,
      content: tweet.content,
      images: tweet.image_url,
      user: newThread.createdBy,
      created_at: newThread.createdAt,
      likes: 0,
      reply: 0,
      isLiked: false,
    };

    req.io.emit("new-thread", tweetSocket);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Thread berhasil diposting.",
      data: {
        tweet,
      },
    });
  } catch (error) {
    next(new AppError("Invalid thread content", 500));
  }
};

export const getThreadById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { threadId } = req.params;

    const thread = await prisma.thread.findUnique({
      where: {
        id: Number(threadId),
      },
      select: {
        id: true,
        content: true,
        image: true,
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
      },
    });

    if (!thread) throw new AppError("Data Thread Not Found", 404);

    const { id, content, image, createdAt, createdBy, _count } = thread;

    const { likes, replies } = _count;

    const userId = createdBy.id;
    const { username, fullname, photo_profile } = createdBy;

    const user = {
      userId,
      username,
      name: fullname,
      profile_picture: photo_profile ? photo_profile : null,
    };

    res.status(200).json({
      code: 200,
      status: "success",
      message: "Get Data Thread Successfully.",
      data: {
        id,
        content,
        image,
        user,
        created_at: createdAt,
        likes,
        replies,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getThreadByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    if (!userId) return;

    const threads = await prisma.thread.findMany({
      where: { createdById: Number(userId) },
      select: {
        id: true,
        content: true,
        createdAt: true,
        image: true,
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
      },
    });

    if (threads.length === 0) throw new AppError("Data Threads Not Found", 404);

    const result = threads.map((thread) => ({
      id: thread.id,
      content: thread.content,
      images: thread.image,
      user: thread.createdBy,
      created_at: thread.createdAt,
      likes: thread._count.likes,
      reply: thread._count.replies,
      isLiked: thread._count.likes > 0,
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
