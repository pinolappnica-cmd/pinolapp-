import { NextResponse } from "next/server";
import { prisma } from "../../../../database/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    where: { status: { in: ["delivering", "pending"] } },
    include: { items: { include: { menuItem: true } }, driver: true },
  });
  return NextResponse.json(orders);
}

export async function PUT(req: Request) {
  const { id, status } = await req.json();
  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(order);
}
