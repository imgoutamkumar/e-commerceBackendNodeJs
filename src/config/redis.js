const { Redis } = require("ioredis");

const redis = new Redis({
  host: "redis-12284.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 12284,
  password: "7DL9HVR47R24uKmDoZWU333HVlfP2Tlq",
});

redis.on("connect", () => {
  console.log("redis connected");
});
redis.on("error", (error) => {
  console.log("Error while connecting to redis server : ", error);
});

module.exports = { redis };
