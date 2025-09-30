import { Product } from "../interfaces/product";
import { useCartContext } from "../context/CartContext";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCartContext();

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition flex flex-col">
      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="flex-1">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg"
        />
      </Link>

      {/* Product Info */}
      <div className="mt-3 flex flex-col flex-1">
        <Link href={`/products/${product.id}`}>
          <h2 className="font-semibold text-base sm:text-lg line-clamp-2 hover:underline">
            {product.title}
          </h2>
        </Link>

        <p className="text-gray-700 text-sm sm:text-base mt-1">${product.price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-auto bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
