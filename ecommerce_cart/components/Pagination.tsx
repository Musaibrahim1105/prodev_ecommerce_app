import React from "react";


interface PaginationProps {
productsPerPage: number;
totalProducts: number;
paginate: (pageNumber: number) => void;
currentPage: number;
}


const Pagination: React.FC<PaginationProps> = ({
productsPerPage,
totalProducts,
paginate,
currentPage,
}) => {
const pageNumbers = [];


for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
pageNumbers.push(i);
}


return (
<nav className="flex justify-center mt-8">
<ul className="flex space-x-2">
{pageNumbers.map((number) => (
<li key={number}>
<button
onClick={() => paginate(number)}
className={`px-3 py-1 rounded-lg border transition-colors duration-200 ${
currentPage === number
? "bg-blue-600 text-white border-blue-600"
: "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
}`}
>
{number}
</button>
</li>
))}
</ul>
</nav>
);
};


export default Pagination;