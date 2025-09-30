import type { AppProps } from "next/app";
import "../styles/globals.css";
import { ProductProvider } from "../context/ProductContext";


function MyApp({ Component, pageProps }: AppProps) {
return (
<ProductProvider>
<Component {...pageProps} />
</ProductProvider>
);
}


export default MyApp;