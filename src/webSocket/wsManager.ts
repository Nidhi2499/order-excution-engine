const clients = new Map<string, any>();

const registerClient = (orderId: string, socket: any) => {
  clients.set(orderId, socket);
};

const sendStatus = (orderId: string, status: any) => {
  const socket = clients.get(orderId);
  if (socket) {
    socket.send(JSON.stringify(status));
  }
};

export = { registerClient, sendStatus };
