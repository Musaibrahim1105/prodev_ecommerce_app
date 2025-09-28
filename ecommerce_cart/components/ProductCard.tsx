import Link from "next/link";
import { Product } from "../lib/api";
import { useProductsContext } from "../context/ProductsContext";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const { addToCart } = useProductsContext();

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <Link href={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md cursor-pointer"
        />
      </Link>
      <div className="mt-3 flex flex-col flex-1">
        <Link
          href={`/products/${product.id}`}
          className="font-semibold text-lg hover:text-blue-600 transition"
        >
          {product.title}
        </Link>
        <p className="text-sm text-gray-500 flex-1 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 font-bold text-xl text-green-600">
          ${product.price}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-3 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
