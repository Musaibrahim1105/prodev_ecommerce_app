import Link from "next/link";
import Image from "next/image"; // ✅ Import Image component
import { useCartContext } from "../context/CartContext";

export default function Header() {
  const { state } = useCartContext();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png" // 👈 place your logo inside /public/logo.png
            alt="MyStore Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-blue-600">MovicStore</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-500 transition">
            Home
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center hover:text-blue-500 transition"
          >
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
