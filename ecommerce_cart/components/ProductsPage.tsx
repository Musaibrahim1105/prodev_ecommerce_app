import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import ProductCard from './ProductCard';
import FiltersBar from './FiltersBar';
import Pagination from './Pagination';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}

export default function ProductsPage() {
  const { state, dispatch } = useProducts();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('https://dummyjson.com/products?limit=100');
      const data = await res.json();
      dispatch({ type: 'SET_PRODUCTS', payload: data.products });
    }
    fetchProducts();

    async function fetchCategories() {
      const res = await fetch('https://dummyjson.com/products/categories');
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, [dispatch]);

  // Apply filters + sorting
  const filteredProducts = state.products
    .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>

      <FiltersBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
