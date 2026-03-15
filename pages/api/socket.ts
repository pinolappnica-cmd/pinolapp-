import { NextApiRequest } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";

export const config = {
  api: {
    bodyParser: false, // Desactivamos bodyParser para WebSockets
  },
};

export default function handler(req: NextApiRequest, res: any) {
  if (!res.socket.server.io) {
    console.log("Inicializando Socket.io...");

    const httpServer: HTTPServer = res.socket.server as any;
    const io = new SocketIOServer(httpServer, {
      path: "/api/socket",
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("Cliente conectado:", socket.id);

      // Escuchar unirse a un canal de cliente
      socket.on("join", (customerId: number) => {
        socket.join(`customer_${customerId}`);
        console.log(`Cliente ${customerId} unido a su canal`);
      });

      // Enviar notificación a un cliente específico
      socket.on("notify", ({ customerId, message }) => {
        io.to(`customer_${customerId}`).emit("notification", {
          message,
          timestamp: new Date(),
        });
        console.log(`Notificación enviada a cliente ${customerId}: ${message}`);
      });

      socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
