export type Product = {
    id: number
    title: string
    description: string
    price: number
    discountPercentage?: number
    rating?: number
    stock?: number
    brand?: string
    category: string
    thumbnail?: string
    images?: string[]
    }
    
    
    const BASE = 'https://dummyjson.com'
    
    
    export async function fetchProducts({ limit = 12, skip = 0, q = '', category = '', sortByPrice = '' }: {
    limit?: number
    skip?: number
    q?: string
    category?: string
    sortByPrice?: 'asc' | 'desc' | ''
    }) {
    const params = new URLSearchParams()
    params.set('limit', String(limit))
    params.set('skip', String(skip))
    if (q) params.set('q', q)
    
    
    let url = `${BASE}/products?${params.toString()}`
    if (category) {
    url = `${BASE}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
    }
    
    
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch products')
    const data = await res.json()
    let products: Product[] = data.products
    
    
    if (sortByPrice === 'asc') products = products.sort((a, b) => a.price - b.price)
    if (sortByPrice === 'desc') products = products.sort((a, b) => b.price - a.price)
    
    
    return { products, total: data.total ?? products.length }
    }
    
    
    export async function fetchCategories() {
    const res = await fetch(`${BASE}/products/categories`)
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
    }