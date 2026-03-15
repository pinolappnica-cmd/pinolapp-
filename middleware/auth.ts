import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "../lib/auth";

export function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Si el usuario es admin, puede entrar a /admin
  if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // Si el usuario es cliente o driver, puede entrar a /profile
  if (req.nextUrl.pathname.startsWith("/profile") && !["customer", "driver"].includes(decoded.role)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
