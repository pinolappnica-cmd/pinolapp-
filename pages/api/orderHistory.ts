import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { customerId } = req.query;

    if (!customerId) {
      return res.status(400).json({ error: "Falta el parámetro customerId" });
    }

    // Obtener historial de pedidos del cliente
    const orders = await prisma.order.findMany({
      where: { customerId: Number(customerId) },
      orderBy: { id: "desc" },
      include: {
        restaurant: true,
        payments: true,
        notifications: true,
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error en /api/orderHistory:", error);
    return res.status(500).json({ error: "Error al obtener historial de pedidos" });
  }
}
