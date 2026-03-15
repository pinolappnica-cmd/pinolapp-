import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { signToken } from "../../lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password, role, action } = await req.json();

  if (action === "register") {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Usuario ya existe" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, role: role || "customer" },
    });

    return NextResponse.json({ message: "Usuario registrado", user });
  }

  if (action === "login") {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });

    const token = signToken({ id: user.id, role: user.role, email: user.email });

    const res = NextResponse.json({ message: "Login exitoso", user });
    res.cookies.set("token", token, { httpOnly: true, path: "/" });
    return res;
  }

  return NextResponse.json({ error: "Acción inválida" }, { status: 400 });
}
