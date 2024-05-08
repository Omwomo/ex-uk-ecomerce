import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  categories: [],
  products: [],
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
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setCategories, setProducts, setProduct, setLoading } = appSlice.actions;
export default appSlice.reducer;
