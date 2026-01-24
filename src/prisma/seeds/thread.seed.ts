import { PrismaClient } from "@prisma/client";

export async function seedThreads(
  prisma: PrismaClient,
  users: { id: number }[],
) {
  return prisma.thread.createMany({
    data: [
      {
        content: "Belajar Prisma ORM ternyata menyenangkan 🔥",
        image: "http://localhost:3003/public/uploads/image-1.jpg",
        createdById: users[0].id,
      },
      {
        content: "Circle App mirip Threads, tapi versi lokal 😄",
        createdById: users[1].id,
      },
      {
        content: "Design yang simpel bikin UX makin nyaman",
        createdById: users[2].id,
      },
    ],
  });
}
