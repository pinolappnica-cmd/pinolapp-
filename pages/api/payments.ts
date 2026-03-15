import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { orderId } = req.query;

    // Validación
    if (!orderId) {
      return res.status(400).json({ error: "Falta el parámetro orderId" });
    }

    // Obtener pagos asociados a la orden
    const payments = await prisma.payment.findMany({
      where: { orderId: Number(orderId) },
      orderBy: { id: "desc" },
    });

    return res.status(200).json(payments);
  } catch (error) {
    console.error("Error en /api/payments:", error);
    return res.status(500).json({ error: "Error al obtener pagos" });
  }
}
