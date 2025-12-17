import bullmq = require("bullmq");
import MockDexRouter =  require("../dex/mockDexRouter");
import wsManager = require( "../webSocket/wsManager");

const router = new MockDexRouter();
new bullmq.Worker(
  "orders",
  async (job: bullmq.Job<{ orderId: string }>) => {
    const { orderId } = job.data;

    wsManager.sendStatus(orderId, { status: "routing" });

    const raydium = await router.getRaydiumQuote(1);
    const meteora = await router.getMeteoraQuote(1);

    const best =
      raydium.price > meteora.price ? raydium : meteora;

    wsManager.sendStatus(orderId, {
      status: "building",
      dex: best.dex
    });

    wsManager.sendStatus(orderId, { status: "submitted" });

    const result = await router.executeSwap(best.dex);

    wsManager.sendStatus(orderId, {
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
