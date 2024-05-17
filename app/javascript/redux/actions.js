import { setCategories, setProducts, setProduct, addCartItem, setCartItems, updateCartItemInState } from './slices/slices';
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
  return async (dispatch, getState) => {
    try {
      const response = await fetch('/api/v1/orders/${order_id}/order_items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ order_item: { product_id: product.id, quantity: 1 } }),
      });
      const data = await response.json();

      // After adding the item to the cart, update the cartItems state
      dispatch(addCartItem(data)); // Use a separate action for adding cart items
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
};

export const fetchCartItems = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/v1/orders');
      const data = await response.json();

      // Extract order items from each order and flatten the array
      const cartItems = data.reduce((acc, order) => {
        if (Array.isArray(order.order_items) && order.order_items.length > 0) {
          acc.push(...order.order_items);
        }
        return acc;
      }, []);

      // Fetch product details for each order item
      for (const item of cartItems) {
        const productResponse = await fetch(`/api/v1/products/${item.product_id}`);
        const productData = await productResponse.json();
        item.product = productData; // Attach product details to each order item
      }

      dispatch(setCartItems(cartItems));
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
};

export const updateCartItem = (product_id, quantity) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`/api/v1/order_items/${product_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ order_item: { quantity } }),
      });
      const data = await response.json();
      dispatch(updateCartItemInState(data));
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };
};

export const updateCartItemInState = (item) => ({
  type: 'UPDATE_CART_ITEM',
  payload: item,
});
