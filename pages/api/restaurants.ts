import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { categoryId } = req.query;

    // Si no se pasa categoryId, devolvemos todos los restaurantes
    if (!categoryId) {
      const restaurants = await prisma.restaurant.findMany({
        orderBy: { id: "asc" },
      });
      return res.status(200).json(restaurants);
    }

    // Si se pasa categoryId, filtramos por categoría
    const restaurants = await prisma.restaurant.findMany({
      where: { categoryId: Number(categoryId) },
      orderBy: { id: "asc" },
    });

    return res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error en /api/restaurants:", error);
    return res.status(500).json({ error: "Error al obtener restaurantes" });
  }
}
