import sleep = require("../utils/sleep");

class MockDexRouter {
  async getRaydiumQuote(amount: number) {
    await sleep(200);
    return {
      dex: "Raydium",
      price: 100 * (0.98 + Math.random() * 0.04),
      fee: 0.003
    };
  }

  async getMeteoraQuote(amount: number) {
    await sleep(200);
    return {
      dex: "Meteora",
      price: 100 * (0.97 + Math.random() * 0.05),
      fee: 0.002
    };
  }

  async executeSwap(dex: string) {
    await sleep(2000 + Math.random() * 1000);
    return {
      txHash: `MOCK_TX_${Math.random().toString(36).slice(2)}`,
      executedPrice: 100 + Math.random() * 5
    };
  }
}
export = MockDexRouter;
