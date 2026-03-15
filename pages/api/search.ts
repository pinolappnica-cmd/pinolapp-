import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      return res.status(400).json({ error: "Falta parámetro q (texto de búsqueda)" });
    }

    const query = q.trim();

    // Buscar en restaurantes
    const restaurants = await prisma.restaurant.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
      },
      orderBy: { id: "asc" },
    });

    // Buscar en platillos (menu items)
    const menuItems = await prisma.menuItem.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
      },
      include: { restaurant: true },
      orderBy: { id: "asc" },
    });

    // Buscar
