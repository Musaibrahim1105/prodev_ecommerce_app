// components/ProductCard.tsx
import React from "react";
import { useProducts } from "../context/ProductsContext";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useProducts();

  return (
    <div className="border rounded-lg shadow-md p-4">
      <img
        src={product.image}
        alt={product.name}
        className="product-image mb-2"
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
