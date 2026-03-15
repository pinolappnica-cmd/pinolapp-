import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { customerId, itemId, quantity } = req.body;

    // LISTAR carrito de un cliente
    if (req.method === "GET") {
      const { customerId } = req.query;
      if (!customerId) {
        return res.status(400).json({ error: "Falta el parámetro customerId" });
      }

      const cartItems = await prisma.cartItem.findMany({
        where: { customerId: Number(customerId) },
        include: { menuItem: true },
      });

      return res.status(200).json(cartItems);
    }

    // AGREGAR producto al carrito
    if (req.method === "POST") {
      if (!customerId || !itemId || !quantity) {
        return res.status(400).json({ error: "Faltan parámetros: customerId, itemId, quantity" });
      }

      const cartItem = await prisma.cartItem.upsert({
        where: {
          customerId_menuItemId: {
            customerId: Number(customerId),
            menuItemId: Number(itemId),
          },
        },
        update: { quantity: { increment: Number(quantity) } },
