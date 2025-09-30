import { GetServerSideProps } from "next";
import { Product } from "../../interfaces/product";
import { useCartContext } from "../../context/CartContext";

type Props = { product: Product };

const ProductDetail = ({ product }: Props) => {
  const { dispatch } = useCartContext();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-96 object-cover rounded-xl mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <span className="text-2xl font-bold mb-4 block">${product.price}</span>
      <button
        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();

  return { props: { product } };
};

export default ProductDetail;
