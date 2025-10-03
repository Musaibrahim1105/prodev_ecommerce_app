import React, { createContext, useContext, useReducer, ReactNode, useMemo } from "react";
import { Product } from "../interfaces/product";

// State shape
interface State {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  category: string | null;
  sort: "price-asc" | "price-desc" | null;
  searchQuery: string; // NEW
}

const initialState: State = {
  products: [],
  total: 0,
  loading: false,
  error: null,
  category: null,
  sort: null,
  searchQuery: "", // NEW
};

// Actions
type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_PRODUCTS"; payload: { products: Product[]; total: number } }
  | { type: "ADD_PRODUCTS"; payload: { products: Product[] } }
  | { type: "SET_ERROR"; payload?: string }
  | { type: "SET_CATEGORY"; payload?: string | null }
  | { type: "SET_SORT"; payload?: State["sort"] }
  | { type: "SET_SEARCH"; payload: string } // NEW
  | { type: "RESET" };

// Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload.products, total: action.payload.total };
    case "ADD_PRODUCTS":
      return { ...state, products: [...state.products, ...action.payload.products] };
    case "SET_ERROR":
      return { ...state, error: action.payload ?? null };
    case "SET_CATEGORY":
      return { ...state, category: action.payload ?? null };
    case "SET_SORT":
      return { ...state, sort: action.payload ?? null };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload }; //  handle search
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

// Context
const ProductContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  filteredProducts: Product[];
} | null>(null);

// Provider
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 👇 Apply filtering + sorting + search dynamically
  const filteredProducts = useMemo(() => {
    let result = [...state.products];

    // filter by category
    if (state.category) {
      result = result.filter((p) => p.category === state.category);
    }

    // filter by search query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // sort by price
    if (state.sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (state.sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [state.products, state.category, state.sort, state.searchQuery]);

  return (
    <ProductContext.Provider value={{ state, dispatch, filteredProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook
export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProductContext must be used within ProductProvider");
  return ctx;
};
