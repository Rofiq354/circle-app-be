import { PrismaClient } from "@prisma/client";

export async function seedReplies(
  prisma: PrismaClient,
  users: { id: number }[],
  threads: { id: number }[],
) {
  return prisma.reply.createMany({
    data: [
      {
        content: "Setuju banget! Prisma enak dipakai.",
        userId: users[1].id,
        threadId: threads[0].id,
      },
      {
        content: "Mirip Threads tapi versi Indonesia 🇮🇩",
        userId: users[2].id,
        threadId: threads[1].id,
      },
      {
        content: "UX memang nomor satu 👍",
        userId: users[0].id,
        threadId: threads[2].id,
        image: "http://localhost:3003/public/uploads/image-2.jpg",
      },
    ],
  });
}
