import { PrismaClient } from "@prisma/client";

export async function seedFollows(
  prisma: PrismaClient,
  users: { id: number }[],
) {
  if (users.length < 3) {
    console.error("Not enough users to seed follows");
    return;
  }

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
      {
        followerId: users[1].id,
        followingId: users[0].id,
      },
    ],
    skipDuplicates: true,
  });
}
