import { NextResponse } from "next/server";
import { prisma } from "../../../../database/prisma";

export async function GET() {
  const restaurants = await prisma.restaurant.findMany({ include: { menuItems: true } });
  const orders = await prisma.order.findMany({ include: { items: true } });
  return NextResponse.json({ restaurants, orders });
}

export async function POST(req: Request) {
  const { name, category, address, phone } = await req.json();
  const restaurant = await prisma.restaurant.create({
    data: { name, category, address, phone },
  });
  return NextResponse.json(restaurant);
}
