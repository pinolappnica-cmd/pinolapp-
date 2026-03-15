import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { customerId, restaurantId } = req.query;

    // Si no se pasa ningún filtro, devolvemos todas las órdenes
    if (!customerId && !restaurantId) {
      const orders = await prisma.order.findMany({
        orderBy: { id: "desc" },
        include: {
          customer: true,
          restaurant: true,
          payments: true,
          notifications: true,
        },
      });
      return res.status(200).json(orders);
    }

    // Filtrar por cliente
    if (customerId) {
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
    }

    // Filtrar por restaurante
    if (restaurantId) {
      const orders = await prisma.order.findMany({
        where: { restaurantId: Number(restaurantId) },
        orderBy: { id: "desc" },
        include: {
          customer: true,
          payments: true,
          notifications: true,
        },
      });
      return res.status(200).json(orders);
    }
  } catch (error) {
    console.error("Error en /api/orders:", error);
    return res.status(500).json({ error: "Error al obtener órdenes" });
  }
}
