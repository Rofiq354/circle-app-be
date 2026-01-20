import { PrismaClient } from "@prisma/client";

export async function seedLikes(
  prisma: PrismaClient,
  users: { id: number }[],
  threads: { id: number }[],
) {
  return prisma.like.createMany({
    data: [
      { userId: users[1].id, threadId: threads[0].id },
      { userId: users[2].id, threadId: threads[0].id },
      { userId: users[0].id, threadId: threads[1].id },
    ],
  });
}
