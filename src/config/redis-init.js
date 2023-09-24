const Redis = require("ioredis");

const isProduction = process.env.NODE_ENV === "production";

const redisClient = new Redis({
  host: isProduction ? process.env.REDIS_HOST : "redis",
  port: isProduction ? process.env.REDIS_PORT : 6379,
  password: isProduction ? process.env.REDIS_PASSWORD : null,
});

module.exports = redisClient;
