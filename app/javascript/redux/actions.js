import { setCategories, setProducts, setProduct, addCartItem, setCartItems, updateCartItemInState, removeCartItemFromState, setCurrentUser, setLoading } from './slices/slices';

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

export const addToCart = (product, quantity) => {
  return async (dispatch, getState) => {
    const { order_id } = getState().app; // Assuming order_id is stored in the state

    try {
      const response = await fetch(`/api/v1/orders/${order_id}/order_items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ order_item: { product_id: product.id, quantity } }),
      });
      const data = await response.json();
      dispatch(addCartItem(data));
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
};

export const fetchCartItems = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/v1/orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();

      const cartItems = data.flatMap(order => order.order_items || []);
      dispatch(setCartItems(cartItems));
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
};

export const updateCartItem = (itemId, quantity) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`/api/v1/order_items/${itemId}`, {
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

export const removeCartItem = (itemId) => {
  return async (dispatch) => {
    try {
      await fetch(`/api/v1/order_items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(removeCartItemFromState(itemId));
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };
};

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(setLoading(false));
    return;
  }

  try {
    const response = await fetch('/api/v1/current_user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setCurrentUser(data));
    }
  } catch (error) {
    console.error('Failed to fetch current user', error);
  } finally {
    dispatch(setLoading(false));
  }
};
