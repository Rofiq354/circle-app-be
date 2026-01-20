import { PrismaClient } from "@prisma/client";

export async function seedThreads(
  prisma: PrismaClient,
  users: { id: number }[],
) {
  return prisma.thread.createMany({
    data: [
      {
        content: "Belajar Prisma ORM ternyata menyenangkan 🔥",
        createdById: users[0].id,
      },
      {
        content: "Circle App mirip Threads, tapi versi lokal 😄",
        image: "thread2.png",
        createdById: users[1].id,
      },
      {
        content: "Design yang simpel bikin UX makin nyaman",
        createdById: users[2].id,
      },
    ],
  });
}
