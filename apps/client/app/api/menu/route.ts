import { NextResponse } from "next/server";
import { prisma } from "../../../../database/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const restaurantId = searchParams.get("restaurantId");

  if (!restaurantId) {
    return NextResponse.json({ error: "restaurantId requerido" }, { status: 400 });
  }

  const menu = await prisma.menuItem.findMany({
    where: { restaurantId: Number(restaurantId) },
  });

  return NextResponse.json(menu);
}
