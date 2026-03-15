import Link from "next/link";
import "../../client/styles/globals.css"; // reutilizamos estilos globales

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
        <main className="flex-1 bg-gray-100 p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
