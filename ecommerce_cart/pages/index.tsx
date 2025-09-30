import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import { useProductContext } from "../context/ProductContext";
import { Product } from "../interfaces/product";
import Skeleton from "../components/Skeleton";

export default function HomePage() {
  const { state, dispatch, filteredProducts } = useProductContext();
  const { loading, error } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        dispatch({
          type: "SET_PRODUCTS",
          payload: { products: data.products, total: data.total },
        });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch products" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchProducts();
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Hero />
      <main className="max-w-7xl mx-auto p-4">
        <FilterBar />
        {error && <p className="text-center text-red-500">{error}</p>}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {Array.from({ length: productsPerPage }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {currentProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && (
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </main>
    </>
  );
}
