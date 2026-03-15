import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    // Si no se pasa id, devolvemos todos los clientes
    if (!id) {
      const customers = await prisma.customer.findMany({
        orderBy: { id: "asc" },
      });
      return res.status(200).json(customers);
    }

    // Si se pasa id, devolvemos el perfil del cliente
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
      include: {
        orders: true, // historial de pedidos
        notifications: true, // notificaciones asociadas
      },
    });

    if (!customer) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error en /api/customers:", error);
    return res.status(500).json({ error: "Error al obtener clientes" });
  }
}
