import { Product } from '../interfaces/product';


const BASE = 'https://dummyjson.com';


export async function fetchProducts(offset = 0, limit = 12, category?: string): Promise<{products: Product[]; total: number}> {
try {
if (category) {
const res = await fetch(`${BASE}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${offset}`);
if (!res.ok) throw new Error('Failed to fetch category products');
const data = await res.json();
return { products: data.products as Product[], total: data.total };
}
const res = await fetch(`${BASE}/products?limit=${limit}&skip=${offset}`);
if (!res.ok) throw new Error('Failed to fetch products');
const data = await res.json();
return { products: data.products as Product[], total: data.total };
} catch (err) {
throw err;
}
}


export async function fetchCategories(): Promise<string[]> {
const res = await fetch(`${BASE}/products/categories`);
if (!res.ok) throw new Error('Failed to fetch categories');
return res.json();
}