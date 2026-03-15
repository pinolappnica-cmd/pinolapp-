import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const orders = await prisma.order.findMany({
      where: { status: "ENTREGADO" },
      include: { payment: true },
    });

    const totalRevenue = orders.reduce((sum, o) => sum + (o.payment?.amount || 0), 0);
    const commissionRate = 0.15; // 15% comisión
    const commission = totalRevenue * commissionRate;
    const payoutRestaurants = totalRevenue - commission;

    return res.status(200).json({
      totalRevenue,
      commission,
      payoutRestaurants,
      ordersCount: orders.length,
    });
  } catch (error) {
    console.error("Error en /api/admin/earnings:", error);
    return res.status(500).json({ error: "Error al calcular ganancias" });
  }
}
