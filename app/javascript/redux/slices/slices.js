import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  categories: [],
  products: [],
  cartItems: [],
  product: {},
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    setProduct(state, action) {
      state.product = action.payload;
    },
    setCartItems(state, action) {
      state.cartItems = action.payload
    },
    addCartItem(state, action) {
      state.cartItems.push(action.payload);
    },
    updateCartItemInState(state, action) {
      const index = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.cartItems[index] = action.payload;
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setCategories, setProducts, setProduct, setLoading, addCartItem, setCartItems, updateCartItemInState } = appSlice.actions;
export default appSlice.reducer;
