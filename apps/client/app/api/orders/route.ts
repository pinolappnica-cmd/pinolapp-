import { NextResponse } from "next/server";
import { prisma } from "../../../../database/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")[1];
  if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
  const orders = await prisma.order.findMany({
    where: { userId: decoded.id },
    include: { items: { include: { menuItem: true } } },
  });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")[1];
  if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
  const { items, deliveryAddress, deliveryLat, deliveryLng } = await req.json();

  const order = await prisma.order.create({
    data: {
      userId: decoded.id,
      status: "pending",
      deliveryAddress,
      deliveryLat,
      deliveryLng,
      items: {
        create: items.map((i: any) => ({
          menuItemId: i.id,
          quantity: i.quantity,
        })),
      },
    },
    include: { items: true },
  });

  return NextResponse.json(order);
}
