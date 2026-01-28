import { redis } from "../lib/redis";
import { prisma } from "../prisma/prismaClient";

afterAll(async () => {
  // Menutup semua handle yang mungkin terbuka secara global
  await prisma.$disconnect();
  if (redis) await redis.quit();
});
