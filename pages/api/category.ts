import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Si es GET, devolvemos todas las categorías
    if (req.method === "GET") {
      const categories = await prisma.category.findMany({
        orderBy: { id: "asc" },
      });
      return res.status(200).json(categories);
    }

    // Si es POST, creamos una nueva categoría
    if (req.method === "POST") {
      const { name, icon } = req.body;

      if (!name || !icon) {
        return res.status(400).json({ error: "Faltan campos obligatorios: name, icon" });
      }

      const category = await prisma.category.create({
        data: { name, icon },
      });

      return res.status(201).json(category);
    }

    // Si el método no está soportado
    return res.status(405).json({ error: "Método no permitido" });
  } catch (error) {
    console.error("Error en /api/categories:", error);
    return res.status(500).json({ error: "Error al procesar categorías" });
  }
}
