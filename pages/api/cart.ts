import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET(req: Request) {
  try {
    const userId = new URL(req.url).searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "Falta userId" }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: Number(userId) },
      include: { items: true },
    });

    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener carrito" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, itemId, quantity } = await req.json();
    if (!userId || !itemId || !quantity) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    // Buscar carrito del usuario
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    // Agregar ítem al carrito
    const item = await prisma.cartItem.create({
      data: { cartId: cart.id, itemId, quantity },
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Error al agregar al carrito" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { cartItemId } = await req.json();
    if (!cartItemId) {
      return NextResponse.json({ error: "Falta cartItemId" }, { status: 400 });
    }

    await prisma.cartItem.delete({ where: { id: cartItemId } });
    return NextResponse.json({ message: "Ítem eliminado del carrito" });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar ítem" }, { status: 500 });
  }
}
