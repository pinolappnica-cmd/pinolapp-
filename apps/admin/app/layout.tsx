"use client";
import Link from "next/link";
import "../../client/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Leer cookie "token"
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("token="));
    if (cookie) {
      const token = cookie.split("=")[1];
      try {
        const decoded = jwt.decode(token) as { id: number; role: string; email?: string };
        if (decoded && decoded.email) {
          setUserEmail(decoded.email);
        } else {
          setUserEmail("admin@pinolapp.com");
        }
      } catch {
        setUserEmail("admin@pinolapp.com");
      }
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/"; // limpia cookie
    router.push("/login");
  };

  return (
    <html lang="es">
      <body className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 text-white flex flex-col p-4">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav className="flex flex-col space-y-2">
            <Link href="/admin" className="hover:bg-gray-700 px-3 py-2 rounded">
              Dashboard
            </Link>
            <Link href="/admin/restaurants" className="hover:bg-gray-700 px-3 py-2 rounded">
              Restaurantes
            </Link>
            <Link href="/admin/menu" className="hover:bg-gray-700 px-3 py-2 rounded">
              Menús
            </Link>
            <Link href="/admin/orders" className="hover:bg-gray-700 px-3 py-2 rounded">
              Órdenes
            </Link>
            <Link href="/admin/drivers" className="hover:bg-gray-700 px-3 py-2 rounded">
              Repartidores
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar superior */}
          <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
            <span className="font-semibold">
              Usuario: {userEmail ? userEmail : "Cargando..."}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </header>

          <main className="flex-1 bg-gray-100 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
