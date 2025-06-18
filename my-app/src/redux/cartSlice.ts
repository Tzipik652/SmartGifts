import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, Product } from "../models/product";



interface CartState {
    userId: string | null; 
  items: CartProduct[];
  itemCount: number;
  totalPrice: number;
}

const initialState: CartState = {
    userId: null,
  items: [],
  itemCount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(
      state,
      action: PayloadAction<{
        items: CartProduct[];
        itemCount: number;
        totalPrice: number;
      }>
    ) {
      state.items = action.payload.items;
      state.itemCount = action.payload.itemCount;
      state.totalPrice = action.payload.totalPrice;
    },
setCartUser(state, action: PayloadAction<string>) {
  state.userId = action.payload;
},
   addToCart(state, action: PayloadAction<{ userId: string; product: Product }>) {
  const { userId, product } = action.payload;

  if (state.userId !== userId) {
    // עובר למשתמש חדש – אפס את הסל
    state.userId = userId;
    state.items = [];
    state.itemCount = 0;
    state.totalPrice = 0;
  }

  const existingItem = state.items.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.items.push({ ...product, quantity: 1 });
  }
  state.itemCount += 1;
  state.totalPrice += product.price;
},

    removeFromCart(state, action: PayloadAction<string>) {
      const productId = action.payload;
      const index = state.items.findIndex((item) => item.id === productId);
      if (index !== -1) {
        const item = state.items[index];
        state.itemCount -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items.splice(index, 1);
      }
    },

    updateItemQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        const diff = quantity - item.quantity;
        item.quantity = quantity;
        state.itemCount += diff;
        state.totalPrice += diff * item.price;
      }
    },

    clearCart(state) {
      state.items = [];
      state.itemCount = 0;
      state.totalPrice = 0;
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
  const item = state.items.find((item) => item.id === action.payload);
  if (item) {
    item.quantity -= 1;
    state.itemCount -= 1;
    state.totalPrice -= item.price;
    if (item.quantity <= 0) {
      state.items = state.items.filter((i) => i.id !== item.id);
    }
  }
},
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.itemCount += 1;
        state.totalPrice += item.price;
      }
    },

  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  updateItemQuantity,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  setCartUser
} = cartSlice.actions;

export const selectCart = (state: any) => state.cart;
export const selectCartItems = (state: any) => state.cart.items;
export const selectCartItemCount = (state: any) => state.cart.itemCount;
export const selectCartTotalPrice = (state: any) => state.cart.totalPrice;

export default cartSlice.reducer;
