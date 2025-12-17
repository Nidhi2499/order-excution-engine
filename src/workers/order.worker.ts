import { Worker } from "bullmq";
import MockDexRouter =  require("../dex/mockDexRouter");
import sendStatus = require( "../webSocket/wsManager");

const router = new MockDexRouter();

new Worker(
  "orders",
  async job => {
    const { orderId } = job.data;

    sendStatus(orderId, { status: "routing" });

    const raydium = await router.getRaydiumQuote(1);
    const meteora = await router.getMeteoraQuote(1);

    const best =
      raydium.price > meteora.price ? raydium : meteora;

    sendStatus(orderId, {
      status: "building",
      dex: best.dex
    });

    sendStatus(orderId, { status: "submitted" });

    const result = await router.executeSwap(best.dex);

    sendStatus(orderId, {
      status: "confirmed",
      txHash: result.txHash,
      price: result.executedPrice
    });
  },
  {
    connection: { host: "localhost", port: 6379 },
    concurrency: 10
  }
);
