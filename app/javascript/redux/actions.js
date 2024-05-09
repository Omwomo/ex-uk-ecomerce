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

export const addToCart = (product) => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/v1/orders/order_items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include user token if available
        },
        body: JSON.stringify({ order_item: { product_id: product.id, quantity: 1 } }),
      });
      const data = await response.json();
      dispatch({ type: 'ADD_TO_CART', payload: data });
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
};
