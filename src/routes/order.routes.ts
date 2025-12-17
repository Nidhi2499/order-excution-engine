import type { FastifyInstance } from "fastify";
const { v4: uuid } = require("uuid");
const { orderQueue } = require("../queue/order.queue");
import registerClient = require( "../webSocket/wsManager");

async function orderRoutes(app: FastifyInstance) {
  app.post("/api/orders/execute", async (req, reply) => {
    const orderId = uuid();

    await orderQueue.add("order", { orderId });

    reply.send({ orderId });
  });

  app.get("/ws/:orderId", { websocket: true }, (conn, req) => {
    const { orderId } = req.params as any;
    registerClient.registerClient(orderId, conn.socket);
  });
}

export = orderRoutes;