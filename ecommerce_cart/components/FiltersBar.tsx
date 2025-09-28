import { useProducts } from "../context/ProductsContext";

export default function FiltersBar() {
  const { state, dispatch } = useProducts();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "SET_CATEGORY", payload: e.target.value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Category Filter */}
      <select
        value={state.category}
        onChange={handleCategoryChange}
        className="border border-gray-300 rounded-md px-3 py-2"
      >
        <option value="">All Categories</option>
        {state.categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search products..."
        value={state.search}
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH", payload: e.target.value })
        }
        className="flex-1 border border-gray-300 rounded-md px-3 py-2"
      />
    </div>
  );
}
