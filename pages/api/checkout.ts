import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const { customerId, restaurantId, paymentMethod } = req.body;

    if (!customerId || !restaurantId || !paymentMethod) {
      return res.status(400).json({ error: "Faltan parámetros: customerId, restaurantId, paymentMethod" });
    }

    // Obtener carrito del cliente
    const cartItems = await prisma.cartItem.findMany({
      where: { customerId: Number(customerId) },
      include: { menuItem: true },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío" });
    }

    // Calcular total
    const total = cartItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

    // Crear orden
    const order = await prisma.order.create({
      data: {
        customerId: Number(customerId),
        restaurantId: Number(restaurantId),
        status: "PENDIENTE",
        total,
        items: {
          create: cartItems.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price
