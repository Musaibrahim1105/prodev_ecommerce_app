import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ProductsProvider } from '../context/ProductsContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductsProvider>
      <Component {...pageProps} />
    </ProductsProvider>
  )
}
