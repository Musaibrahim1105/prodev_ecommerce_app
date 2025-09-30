// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ProductProvider } from "../context/ProductContext";
import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductProvider>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </ProductProvider>
  );
}

export default MyApp;
