import { prisma } from "./prisaClient";
import { seedFollows } from "./seeds/follow.seed";
import { seedLikes } from "./seeds/like.seed";
import { seedReplies } from "./seeds/reply.seed";
import { seedThreads } from "./seeds/thread.seed";
import { seedUsers } from "./seeds/user.seed";

async function main() {
  await seedUsers(prisma);

  const users = await prisma.user.findMany({
    orderBy: { id: "asc" },
  });

  await seedThreads(prisma, users);

  const threads = await prisma.thread.findMany({
    orderBy: { id: "asc" },
  });

  await seedReplies(prisma, users, threads);
  await seedLikes(prisma, users, threads);
  await seedFollows(prisma, users);

  console.log("✅ All seeders executed successfully");
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
