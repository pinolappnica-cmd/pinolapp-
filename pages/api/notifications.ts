import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { customerId } = req.query;

    // Validación
    if (!customerId) {
      return res.status(400).json({ error: "Falta el parámetro customerId" });
    }

    // Obtener notificaciones del cliente
    const notifications = await prisma.notification.findMany({
      where: { customerId: Number(customerId) },
      orderBy: { id: "desc" },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Error en /api/notifications:", error);
    return res.status(500).json({ error: "Error al obtener notificaciones" });
  }
}
