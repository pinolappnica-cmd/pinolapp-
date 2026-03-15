import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const { orderId, driverId } = req.body;

    if (!orderId || !driverId) {
      return res.status(400).json({ error: "Faltan parámetros: orderId y driverId" });
    }

    // Actualizar la orden con el repartidor asignado
    const order = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { driverId: Number(driverId), status: "ASIGNADO" },
      include: { customer: true, driver: true },
    });

    // Crear notificación en BD
    await prisma.notification.create({
      data: {
        customerId: order.customerId,
        message: `Tu pedido ha sido asignado al repartidor ${order.driver?.name} 🚴`,
        type: "PUSH",
        status: "ENVIADO",
      },
    });

    // Emitir notificación en tiempo real vía Socket.io
    if (res.socket?.server?.io) {
      res.socket.server.io.to(`customer_${order.customerId}`).emit("notification", {
        message: `Tu pedido ha sido asignado al repartidor ${order.driver?.name} 🚴`,
        timestamp: new Date(),
      });
    }

    return res.status(200).json({ message: "Repartidor asignado correctamente", order });
  } catch (error) {
    console.error("Error en /api/assignDriver:", error);
    return res.status(500).json({ error: "Error al asignar repartidor" });
  }
}
