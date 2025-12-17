import Fastify from "fastify";
import websocket from "@fastify/websocket";
import orderRoutes = require("./routes/order.routes");

const app = Fastify();
app.register(websocket);
app.register(orderRoutes);

app.listen({ port: 3000 }, () =>
  console.log("Server running on port 3000")
);
