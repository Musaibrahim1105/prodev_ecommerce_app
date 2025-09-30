import { useProductContext } from "../context/ProductContext";

export default function FilterBar() {
  const { state, dispatch } = useProductContext();

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={state.searchQuery}
        onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
        className="border rounded px-3 py-2 w-60"
      />

      {/* 🏷 Category filter */}
      <select
        value={state.category ?? ""}
        onChange={(e) =>
          dispatch({ type: "SET_CATEGORY", payload: e.target.value || null })
        }
        className="border rounded px-3 py-2"
      >
        <option value="">All Categories</option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
        <option value="fragrances">Fragrances</option>
        <option value="groceries">Groceries</option>
        {/* 👉 you can map dynamically from API categories */}
      </select>

      {/* 💰 Sort by price */}
      <select
        value={state.sort ?? ""}
        onChange={(e) =>
          dispatch({ type: "SET_SORT", payload: e.target.value as any })
        }
        className="border rounded px-3 py-2"
      >
        <option value="">Sort by</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
      </select>
    </div>
  );
}
