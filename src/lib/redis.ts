import Redis from "ioredis";

// Port 6379 adalah port default di Docker
export const redis = new Redis({
  host: "localhost",
  port: 6379,
});
