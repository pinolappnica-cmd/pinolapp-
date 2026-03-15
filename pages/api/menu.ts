import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { restaurantId } = req.query;

    // Si no se pasa restaurantId, devolvemos todos los platillos
    if (!restaurantId) {
      const menuItems = await prisma.menuItem.findMany({
        orderBy: { id: "asc" },
        include: { restaurant: true },
      });
      return res.status(200).json(menuItems);
    }

    // Si se pasa restaurantId, filtramos por restaurante
    const menuItems = await prisma.menuItem.findMany({
      where: { restaurantId: Number(restaurantId) },
      orderBy: { id: "asc" },
      include: { restaurant: true },
    });

    return res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error en /api/menu:", error);
    return res.status(500).json({ error: "Error al obtener menú" });
  }
}
