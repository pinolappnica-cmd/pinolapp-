import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET(req: Request) {
  try {
    const userId = new URL(req.url).searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Falta userId" }, { status: 400 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      include: { items: true, driver: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener órdenes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, items, deliveryAddress, deliveryLat, deliveryLng } = await req.json();
    if (!userId || !items || items.length === 0) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        deliveryAddress,
        deliveryLat,
        deliveryLng,
        status: "pending",
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.id,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear orden" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { orderId, status, driverId } = await req.json();
    if (!orderId || !status) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id
