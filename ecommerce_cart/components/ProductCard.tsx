// components/ProductCard.tsx
import { Product } from "../interfaces/product";
import { useCartContext } from "../context/CartContext";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCartContext();

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Link href={`/products/${product.id}`}>
        <h2 className="font-semibold text-lg hover:underline">{product.title}</h2>
      </Link>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded my-2"
      />
      <p className="text-gray-700">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
