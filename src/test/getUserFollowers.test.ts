import { Request, Response } from "express";
import { getUserFollowers } from "../controllers/follow";
import { prismaMock } from "../lib/__mocks__/prisma";

describe("getUserFollowers Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    prismaMock.following.findMany.mockReset();

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

    prismaMock.following.findMany
      .mockResolvedValueOnce([{ followingId: 2 }] as any)
      .mockResolvedValueOnce([
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
      ] as any);

    await getUserFollowers(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    const responseData = (mockResponse.json as jest.Mock).mock.calls[0][0].data;
    // console.log("DEBUG DATA:", JSON.stringify(responseData, null, 2));

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseData.followers[0].id).toBe(2);
    expect(responseData.followers[0].isFollowing).toBe(true);
    expect(responseData.followers[1].id).toBe(3);
    expect(responseData.followers[1].isFollowing).toBe(false);
  });

  it("harus mengembalikan error 400 jika type tidak dikirim", async () => {
    mockRequest = {
      user: { id: 1 },
      params: { id: "10" }, // Tanpa type
    };

    await getUserFollowers(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Query parameter 'type' is required.",
      }),
    );
  });
});
