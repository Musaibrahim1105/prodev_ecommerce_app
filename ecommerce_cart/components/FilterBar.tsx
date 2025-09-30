import React, { useEffect, useState } from "react";
import { fetchCategories } from "../utils/api";
import { useProductContext } from "../context/ProductContext";

type Category = { slug: string; name: string };

const FilterBar: React.FC = () => {
  const { state, dispatch } = useProductContext();
  const [cats, setCats] = useState<Category[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchCategories()
      .then((c) => {
        if (mounted) setCats(c);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        {/* Category dropdown */}
        <select
          value={state.category ?? ""}
          onChange={(e) =>
            dispatch({
              type: "SET_CATEGORY",
              payload: e.target.value || null,
            })
          }
          className="border rounded px-3 py-2"
        >
          <option value="">All categories</option>
          {cats.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Sorting dropdown */}
        <select
          value={state.sort ?? ""}
          onChange={(e) =>
            dispatch({
              type: "SET_SORT",
              payload: (e.target.value as any) || null,
            })
          }
          className="border rounded px-3 py-2"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {/* Showing count */}
      <div className="text-sm text-gray-600">
        Showing <strong>{state.products.length}</strong> of{" "}
        <strong>{state.total}</strong>
      </div>
    </div>
  );
};

export default FilterBar;
