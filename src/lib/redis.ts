import Redis from "ioredis";

let redis: Redis;

if (process.env.UPSTASH_REDIS_URL) {
  // Jika ada Upstash URL, gunakan itu
  redis = new Redis(process.env.UPSTASH_REDIS_URL);
  console.log("Redis connected via Upstash URL");
} else {
  // Jika tidak ada, fallback ke Redis lokal
  redis = new Redis({
    host: process.env.REDIS_HOST || "redis",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  });
  console.log("Redis connected via local Redis");
}

export { redis };
