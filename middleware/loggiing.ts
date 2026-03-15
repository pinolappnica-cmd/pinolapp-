import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "../lib/auth";

export function loggingMiddleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? decodeToken(token) as any : null;

  const logEntry = {
    path: req.nextUrl.pathname,
    method: req.method,
    user: decoded ? decoded.email : "anon",
    role: decoded ? decoded.role : "none",
    timestamp: new Date().toISOString(),
  };

  // Aquí puedes enviar el log a un servicio externo (Datadog, Logtail, etc.)
  // Por ahora lo dejamos en consola
  console.log("[REQUEST LOG]", logEntry);

  return NextResponse.next();
}
