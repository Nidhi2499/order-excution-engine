const { Queue } = require("bullmq");
const IORedis = require("ioredis");

const connection = new IORedis();

const orderQueue = new Queue("orders", {
  connection
});

export = { orderQueue };
