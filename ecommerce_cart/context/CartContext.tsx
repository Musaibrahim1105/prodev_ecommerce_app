import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "../interfaces/product";

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number } // product id
  | { type: "CLEAR_CART" }
  | { type: "INCREASE_QTY"; payload: number }
  | { type: "DECREASE_QTY"; payload: number };

const initialState: CartState = {
  items: [],
};

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case "INCREASE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case "DECREASE_QTY":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
};
