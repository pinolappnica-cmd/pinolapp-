import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ error: "Faltan parámetros: orderId y status" });
    }

    // Actualizar estado de la orden
    const order = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { status },
      include: { customer: true },
    });

    // Crear notificación en BD
    await prisma.notification.create({
      data: {
        customerId: order.customerId,
        message: `Tu pedido cambió a estado ${status} 📦`,
        type: "PUSH",
        status: "ENVIADO",
      },
    });

    // Emitir notificación en tiempo real vía Socket.io
    if (res.socket?.server?.io) {
      res.socket.server.io.to(`customer_${order.customerId}`).emit("notification", {
        message: `Tu pedido cambió a estado ${status} 📦`,
        timestamp: new Date(),
      });
    }

    return res.status(200).json({ message: "Estado actualizado correctamente", order });
  } catch (error) {
    console.error("Error en /api/updateOrderStatus:", error);
    return res.status(500).json({ error: "Error al actualizar estado de la orden" });
  }
}
