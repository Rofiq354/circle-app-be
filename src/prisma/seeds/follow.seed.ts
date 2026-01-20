import { PrismaClient } from "@prisma/client";

export async function seedFollows(
  prisma: PrismaClient,
  users: { id: number }[],
) {
  return prisma.following.createMany({
    data: [
      {
        followerId: users[0].id,
        followingId: users[1].id,
      },
      {
        followerId: users[0].id,
        followingId: users[2].id,
      },
    ],
  });
}
