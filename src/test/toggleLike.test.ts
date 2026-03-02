import { Request, Response } from "express";
import { prismaMock } from "../lib/__mocks__/prisma";
import { mockReset } from "jest-mock-extended";

jest.mock("../prisma/prismaClient", () => ({
  prisma: require("../lib/__mocks__/prisma").prismaMock,
}));

import { toggleLike } from "../controllers/like";

describe("toggleLike Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction = jest.fn();
  let mockEmit = jest.fn();

  beforeEach(() => {
    mockReset(prismaMock);
    jest.clearAllMocks();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockRequest = {
      user: { id: 1 },
      body: { tweet_id: "100" },
      io: { emit: mockEmit } as any,
    };

    nextFunction = jest.fn();
  });

  it("harus return 404 jika thread tidak ditemukan", async () => {
    prismaMock.thread.findUnique.mockResolvedValue(null);

    await toggleLike(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Thread not found",
    });
  });

  it("harus melakukan LIKE jika belum pernah like", async () => {
    const userId = 1;
    const threadId = 100;

    prismaMock.thread.findUnique.mockResolvedValue({ id: threadId } as any);
    prismaMock.like.findFirst.mockResolvedValue(null);
    prismaMock.like.count.mockResolvedValue(1);

    await toggleLike(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(prismaMock.like.create).toHaveBeenCalledWith({
      data: { threadId, userId },
    });

    expect(mockEmit).toHaveBeenCalledWith("update-like", {
      threadId,
      likesCount: 1,
    });

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        isLiked: true,
        likesCount: 1,
        message: "Tweet liked successfully.",
      }),
    );
  });

  it("harus melakukan UNLIKE jika sudah pernah like", async () => {
    const userId = 1;
    const threadId = 100;
    const existingLikeId = 555;

    prismaMock.thread.findUnique.mockResolvedValue({ id: threadId } as any);
    prismaMock.like.findFirst.mockResolvedValue({
      id: existingLikeId,
      userId,
      threadId,
    } as any);
    prismaMock.like.count.mockResolvedValue(0);

    await toggleLike(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(prismaMock.like.delete).toHaveBeenCalledWith({
      where: { id: existingLikeId },
    });

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        isLiked: false,
        likesCount: 0,
        message: "Unliked successfully.",
      }),
    );
  });
});
