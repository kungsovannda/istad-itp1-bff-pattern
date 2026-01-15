import { Product } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
};

type CartState = {
  items: CartItem[];
  total: number;
  itemCount: number;
};

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existItem = state.items.find((item) => item.id === product.uuid);
      if (existItem) {
        existItem.quantity += 1;
      } else {
        state.items.push({
          id: product.uuid,
          title: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          description: product.description,
        });
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const product = state.items.find((p) => p.id === id);
      if (product) {
        product.quantity = Math.max(0, quantity);
        if (product.quantity === 0) {
          state.items = state.items.filter((p) => p.id !== id);
        }
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal: (state) => {
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.items = state.items.filter((p) => p.id !== id);
      cartSlice.caseReducers.calculateTotal(state);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
