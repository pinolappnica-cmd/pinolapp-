import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Rutas que requieren autenticación
  const protectedPaths = ["/admin", "/profile"];

  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: number;
        role: string;
        email: string;
      };

      // Si es admin, puede entrar a /admin
      if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/profile", req.url));
      }

      // Si es cliente o driver, puede entrar a /profile
      if (req.nextUrl.pathname.startsWith("/profile") && !["customer", "driver"].includes(decoded.role)) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
