import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  categories: [],
  products: [],
  cartItems: [],
  checkouts: [],
  product: {},
  user: null,
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
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    editProduct(state, action) {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    removeProduct(state, action) {
      state.products = state.products.filter(product => product.id !== action.payload);
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
    removeCartItemFromState(state, action) {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
    signOut(state) {
      state.user = null;
      state.cartItems = []; // Clear cart items on sign out
      localStorage.removeItem('token');
    },
    setCheckouts(state, action) {
      state.checkouts = action.payload;
    },
    addCheckout(state, action) {
      state.checkouts.push(action.payload);
    },
    updateCheckoutInState(state, action) {
      const index = state.checkouts.findIndex((checkout) => checkout.id === action.payload.id);
      if (index !== -1) {
        state.checkouts[index] = action.payload;
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setCategories, setProducts, setProduct, addProduct, editProduct, removeProduct, setLoading, addCartItem, setCartItems, updateCartItemInState, removeCartItemFromState, setCurrentUser, signOut, setCheckouts, addCheckout, updateCheckoutInState } = appSlice.actions;
export default appSlice.reducer;
