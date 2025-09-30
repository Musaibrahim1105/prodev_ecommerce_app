import React from "react";
import { Product } from "../interfaces/product";
import { useCartContext } from "../context/CartContext";
import Link from "next/link";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { dispatch } = useCartContext();

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition relative group">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition"
      />
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer">
            {product.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">${product.price}</span>
          <button
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
      {/* Badge */}
      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
        {product.category}
      </span>
    </div>
  );
};

export default ProductCard;
