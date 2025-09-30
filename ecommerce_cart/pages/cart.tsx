// pages/cart.tsx
import { useCartContext } from "../context/CartContext";

export default function CartPage() {
  const { state, removeFromCart, clearCart } = useCartContext();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {state.items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-600">
                  ${item.price} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
