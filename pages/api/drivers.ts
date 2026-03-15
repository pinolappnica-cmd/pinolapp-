import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { available } = req.query;

    // Si no se pasa filtro, devolvemos todos los repartidores
    if (!available) {
      const drivers = await prisma.driver.findMany({
        orderBy: { id: "asc" },
      });
      return res.status(200).json(drivers);
    }

    // Filtrar por disponibilidad
    const drivers = await prisma.driver.findMany({
      where: { available: available === "true" },
      orderBy: { id: "asc" },
    });

    return res.status(200).json(drivers);
  } catch (error) {
    console.error("Error en /api/drivers:", error);
    return res.status(500).json({ error: "Error al obtener repartidores" });
  }
}
