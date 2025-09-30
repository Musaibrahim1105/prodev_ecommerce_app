// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ProductProvider } from "../context/ProductContext";
import { CartProvider } from "../context/CartContext"; // ✅ import CartProvider

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductProvider>
      <CartProvider>   {/* ✅ wrap your app here */}
        <Component {...pageProps} />
      </CartProvider>
    </ProductProvider>
  );
}

export default MyApp;
