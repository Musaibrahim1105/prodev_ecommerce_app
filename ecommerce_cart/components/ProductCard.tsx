import React from 'react';
import { Product } from '../interfaces/product';


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
return (
<article className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
<div className="h-48 w-full bg-gray-100 flex items-center justify-center">
<img src={product.thumbnail ?? product.images?.[0]} alt={product.title} className="object-cover h-full w-full" />
</div>
<div className="p-4 flex-1 flex flex-col">
<h3 className="text-sm font-semibold mb-2 truncate">{product.title}</h3>
<p className="text-xs text-gray-500 line-clamp-2 flex-1">{product.description}</p>
<div className="mt-4 flex items-center justify-between">
<span className="font-bold">₦{product.price}</span>
<button className="px-3 py-1 text-sm rounded-full border">Add</button>
</div>
</div>
</article>
);
};


export default ProductCard;