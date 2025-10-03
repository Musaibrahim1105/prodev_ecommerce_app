// pages/cart.tsx
import { useCartContext } from "../context/CartContext";

export default function CartPage() {
  const { state, removeFromCart, clearCart } = useCartContext();

  // Calculate total
  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Checkout successful!");
    clearCart();
  };

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

          {/* Cart Summary */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-lg font-semibold">
              Total: ${total.toFixed(2)}
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Clear Cart
              </button>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
