import { NextResponse } from "next/server";

let cart: any[] = [];

export async function GET() {
  return NextResponse.json(cart);
}

export async function POST(req: Request) {
  const item = await req.json();
  cart.push(item);
  return NextResponse.json({ message: "Item agregado", cart });
}

export async function DELETE() {
  cart = [];
  return NextResponse.json({ message: "Carrito limpiado" });
}
