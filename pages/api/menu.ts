import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET(req: Request) {
  try {
    const restaurantId = new URL(req.url).searchParams.get("restaurantId");
    if (!restaurantId) {
      return NextResponse.json({ error: "Falta restaurantId" }, { status: 400 });
    }

    const items = await prisma.menuItem.findMany({
      where: { restaurantId: Number(restaurantId) },
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener menú" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { restaurantId, name, price } = await req.json();
    if (!restaurantId || !name || !price) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const item = await prisma.menuItem.create({
      data: { restaurantId, name, price },
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear ítem de menú" }, { status: 500 });
  }
}
