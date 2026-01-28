import { redis } from "../lib/redis";
import { prisma } from "../prisma/prismaClient";
import { toggleFollow } from "../controllers/follow";
import { Request, Response } from "express";

// 1. Mock Prisma dan Redis
jest.mock("../prisma/prismaClient", () => ({
  prisma: {
    following: {
      findFirst: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("../lib/redis", () => ({
  redis: {
    keys: jest.fn(),
    del: jest.fn(),
  },
}));

describe("toggleFollow Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("harus mengembalikan 400 jika user follow diri sendiri", async () => {
    mockRequest = {
      user: { id: 1 },
      params: { followingId: "1" }, // ID sama
    };

    await toggleFollow(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Anda tidak boleh follow diri sendiri",
    });
  });

  it("harus melakukan UNFOLLOW jika data follow sudah ada", async () => {
    mockRequest = {
      user: { id: 1 },
      params: { followingId: "2" },
    };

    // Simulasi: Data follow ditemukan
    (prisma.following.findFirst as jest.Mock).mockResolvedValue({
      id: 99,
      followerId: 1,
      followingId: 2,
    });
    (redis.keys as jest.Mock).mockResolvedValue(["cache-key-1"]);

    await toggleFollow(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(prisma.following.delete).toHaveBeenCalledWith({ where: { id: 99 } });

    // Pastikan redis.del dipanggil (karena mock keys tadi ada isinya)
    expect(redis.del).toHaveBeenCalled();

    // Pastikan response sukses
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Berhasil unfollow user.",
      }),
    );
  });
});
