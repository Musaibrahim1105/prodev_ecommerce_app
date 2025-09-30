import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "../interfaces/product";

// Define the shape of our state
interface State {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  category: string | null;
  sort: "asc" | "desc" | null;
}

// Initial state
const initialState: State = {
  products: [],
  total: 0,
  loading: false,
  error: null,
  category: null,
  sort: null,
};

// Actions
type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_PRODUCTS"; payload: { products: Product[]; total: number } }
  | { type: "ADD_PRODUCTS"; payload: { products: Product[] } }
  | { type: "SET_ERROR"; payload?: string }
  | { type: "SET_CATEGORY"; payload?: string | null }
  | { type: "SET_SORT"; payload?: State["sort"] }
  | { type: "RESET" };

// Reducer function
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
} | null>(null);

// Provider
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

// Hook
export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProductContext must be used within ProductProvider");
  return ctx;
};
