import { GetServerSideProps } from "next";
import { Product } from "../../lib/api";
import { useProductsContext } from "../../context/ProductsContext";

type Props = { product: Product };

export default function ProductDetail({ product }: Props) {
  const { addToCart } = useProductsContext();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-6">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-cover rounded-xl"
          />
          <div className="grid grid-cols-4 gap-2">
            {product.images?.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Preview ${idx}`}
                className="h-20 w-full object-cover rounded-md border hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-extrabold text-green-600">
              ${product.price}
            </span>
            {product.discountPercentage && (
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                -{product.discountPercentage}% Off
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    return { notFound: true };
  }
  const product: Product = await res.json();
  return { props: { product } };
};
