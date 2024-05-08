import { setCategories, setProducts, setProduct } from './slices/slices';
// import { fetch } from 'whatwg-fetch';

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/v1/categories');
      const data = await response.json();
      dispatch(setCategories(data));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
};

export const fetchProductsByCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/v1/categories/${categoryId}/products`);
      const data = await response.json();
      dispatch(setProducts(data));
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };
};

export const fetchProduct = (productId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/v1/products/${productId}`);
      const data = await response.json();
      dispatch(setProduct(data));
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
};
