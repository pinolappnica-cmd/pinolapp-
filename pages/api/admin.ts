import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { entity } = req.query;

    if (!entity) {
      return res.status(400).json({ error: "Falta parámetro entity (restaurant, category, menu, driver)" });
    }

    // LISTAR entidades
    if (req.method === "GET") {
      switch (entity) {
        case "restaurant":
          return res.status(200).json(await prisma.restaurant.findMany());
        case "category":
          return res.status(200).json(await prisma.category.findMany());
        case "menu":
          return res.status(200).json(await prisma.menuItem.findMany({ include: { restaurant: true } }));
        case "driver":
          return res.status(200).json(await prisma.driver.findMany());
        default:
          return res.status(400).json({ error: "Entidad inválida" });
      }
    }

    // CREAR entidades
    if (req.method === "POST") {
      const data = req.body;

      switch (entity) {
        case "restaurant":
          if (!data.name || !data.categoryId) {
            return res.status(400).json({ error: "Faltan campos: name, categoryId" });
          }
          return res.status(201).json(await prisma.restaurant.create({ data }));

        case "category":
          if (!data.name || !data.icon) {
            return res.status(400).json({ error: "Faltan campos: name, icon" });
          }
          return res.status(201).json(await prisma.category.create({ data }));

        case "menu":
          if (!data.name || !data.price || !data.restaurantId) {
            return res.status(400).json({ error: "Faltan campos: name, price, restaurantId" });
          }
          return res.status(201).json(await prisma.menuItem.create({ data }));

        case "driver":
          if (!data.name || !data.phone || !data.vehicle) {
            return res.status(400).json({ error: "Faltan campos: name, phone, vehicle" });
          }
          return res.status(201).json(await prisma.driver.create({ data }));

        default:
          return res.status(400).json({ error: "Entidad inválida" });
      }
    }

    return res.status(405).json({ error: "Método no permitido" });
  } catch (error) {
    console.error("Error en /api/admin:", error);
    return res.status(500).json({ error: "Error en administración" });
  }
}
