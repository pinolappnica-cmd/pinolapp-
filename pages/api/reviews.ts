import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // LISTAR reseñas de un restaurante
    if (req.method === "GET") {
      const { restaurantId } = req.query;

      if (!restaurantId) {
        return res.status(400).json({ error: "Falta parámetro restaurantId" });
      }

      const reviews = await prisma.review.findMany({
        where: { restaurantId: Number(restaurantId) },
        orderBy: { id: "desc" },
        include: { customer: true },
      });

      return res.status(200).json(reviews);
    }

    // CREAR reseña
    if (req.method === "POST") {
      const { customerId, restaurantId, rating, comment } = req.body;

      if (!customerId || !restaurantId || !rating) {
        return res.status(400).json({ error: "Faltan parámetros: customerId, restaurantId, rating" });
      }

      const review = await prisma.review.create({
        data: {
          customerId: Number(customerId),
          restaurantId: Number
