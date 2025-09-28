// context/ProductsContext.tsx
import React, { createContext, useContext, useReducer } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & { quantity: number };

type State = {
  cart: CartItem[];
  search: string;
  category: string;
  categories: { slug: string; name: string }[];
};

type Action =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_CATEGORY"; payload: string };

const initialState: State = {
  cart: [],
  search: "",
  category: "",
  categories: [
    { slug: "electronics", name: "Electronics" },
    { slug: "fashion", name: "Fashion" },
    { slug: "home", name: "Home" },
  ],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.cart.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "SET_SEARCH":
      return { ...state, search: action.payload };

    case "SET_CATEGORY":
      return { ...state, category: action.payload };

    default:
      return state;
  }
}

const ProductsContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
} | null>(null);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product: Product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });
  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

  return (
    <ProductsContext.Provider value={{ state, dispatch, addToCart, removeFromCart }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) throw new Error("useProducts must be used within ProductsProvider");
  return context;
};
