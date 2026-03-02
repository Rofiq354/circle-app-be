import { Request, Response } from "express";
import { prismaMock } from "../lib/__mocks__/prisma";
import { mockReset } from "jest-mock-extended";

jest.mock("../prisma/prismaClient", () => ({
  prisma: require("../lib/__mocks__/prisma").prismaMock,
}));

import { getUserFollowers } from "../controllers/follow";

describe("getUserFollowers Controller", () => {
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
    nextFunction = jest.fn();
  });

  it("harus mengembalikan daftar followers dengan status isFollowing yang benar", async () => {
    mockRequest = {
      user: { id: 1 },
      params: { id: "10", type: "follower" },
    };

    prismaMock.following.findMany.mockImplementation(((args: any): any => {
      const where = args?.where;

      if (where?.followerId === 1 && !args.include) {
        return Promise.resolve([{ followingId: 2 }]);
      }

      if (where?.followingId === 10 && args.include?.follower) {
        return Promise.resolve([
          {
            follower: {
              id: 2,
              username: "user_dua",
              fullname: "User Dua",
              photo_profile: null,
              bio: "Halo",
            },
          },
          {
            follower: {
              id: 3,
              username: "user_tiga",
              fullname: "User Tiga",
              photo_profile: null,
              bio: "Halo juga",
            },
          },
        ]);
      }

      return Promise.resolve([]);
    }) as any);

    await getUserFollowers(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    const responseData = (mockResponse.json as jest.Mock).mock.calls[0][0];

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseData.status).toBe("success");
    expect(responseData.message).toContain(
      "Berhasil mengambil data follower id ke10",
    );

    const followers = responseData.data.followers;
    expect(followers).toHaveLength(2);

    expect(followers[0].id).toBe(2);
    expect(followers[0].isFollowing).toBe(true);

    expect(followers[1].id).toBe(3);
    expect(followers[1].isFollowing).toBe(false);
  });

  it("harus mengembalikan error 400 jika type tidak dikirim", async () => {
    mockRequest = {
      user: { id: 1 },
      params: { id: "10" },
    };

    await getUserFollowers(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "error",
        message: "Query parameter 'type' is required.",
      }),
    );
  });

  it("harus menangani kasus 'following' dengan benar", async () => {
    mockRequest = {
      user: { id: 1 },
      params: { id: "10", type: "following" },
    };

    prismaMock.following.findMany.mockImplementation(((args: any): any => {
      const where = args?.where;

      if (where?.followerId === 1 && !args.include) {
        return Promise.resolve([]);
      }

      if (where?.followerId === 10 && args.include?.following) {
        return Promise.resolve([
          {
            following: {
              id: 99,
              username: "target_follow",
              fullname: "Target Follow",
              photo_profile: null,
              bio: "Bio",
            },
          },
        ]);
      }
      return Promise.resolve([]);
    }) as any);

    await getUserFollowers(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    const responseData = (mockResponse.json as jest.Mock).mock.calls[0][0].data;
    expect(responseData.followers[0].id).toBe(99);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});
