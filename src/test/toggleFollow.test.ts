import { Request, Response } from "express";
import { prismaMock } from "../lib/__mocks__/prisma";
import { redis } from "../lib/redis";
import { mockReset } from "jest-mock-extended";

jest.mock("../prisma/prismaClient", () => ({
  prisma: require("../lib/__mocks__/prisma").prismaMock,
}));

jest.mock("../lib/redis", () => ({
  redis: {
    keys: jest.fn(),
    del: jest.fn(),
  },
}));

import { toggleFollow } from "../controllers/follow";

describe("toggleFollow Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction = jest.fn();

  beforeEach(() => {
    mockReset(prismaMock);
    jest.clearAllMocks();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // --- CASE 1: Follow diri sendiri ---
  it("harus return 400 jika mencoba follow diri sendiri", async () => {
    mockRequest = {
      user: { id: 1 },
      params: { followingId: "1" },
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

  // --- CASE 2: Unfollow sudah ada data ---
  it("harus melakukan UNFOLLOW jika existingFollow ditemukan", async () => {
    const followerId = 1;
    const followingId = 2;

    mockRequest = {
      user: { id: followerId },
      params: { followingId: followingId.toString() },
    };

    // Simulasi data ditemukan (maka harus di-delete)
    prismaMock.following.findFirst.mockResolvedValue({
      id: 55,
      followerId,
      followingId,
    } as any);

    // Simulasi redis keys ditemukan
    (redis.keys as jest.Mock).mockResolvedValue(["users:cache:1"]);

    await toggleFollow(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(prismaMock.following.delete).toHaveBeenCalledWith({
      where: { id: 55 },
    });

    expect(redis.keys).toHaveBeenCalled();
    expect(redis.del).toHaveBeenCalled();

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Berhasil unfollow user.",
        data: { user_id: followingId, isFollowed: false },
      }),
    );
  });

  // --- CASE 3: FOLLOW (BELUM ADA DATA) ---
  it("harus melakukan FOLLOW jika existingFollow tidak ditemukan", async () => {
    const followerId = 1;
    const followingId = 10;

    mockRequest = {
      user: { id: followerId },
      params: { followingId: followingId.toString() },
    };

    // Simulasi data tidak ditemukan
    prismaMock.following.findFirst.mockResolvedValue(null);
    (redis.keys as jest.Mock).mockResolvedValue([]);

    await toggleFollow(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    // Verifikasi Prisma Create dipanggil
    expect(prismaMock.following.create).toHaveBeenCalledWith({
      data: { followerId, followingId },
    });

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Berhasil follow user.",
        data: { user_id: followingId, isFollowed: true },
      }),
    );
  });

  // --- CASE 4: ERROR HANDLING ---
  it("harus memanggil next() dengan AppError jika terjadi crash", async () => {
    mockRequest = {
      user: { id: 1 },
      params: { followingId: "2" },
    };

    // Paksa prisma throw error
    prismaMock.following.findFirst.mockRejectedValue(new Error("DB Error"));

    await toggleFollow(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(nextFunction).toHaveBeenCalled();
  });
});
