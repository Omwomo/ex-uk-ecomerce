import { setCategories, setProducts, setProduct, addProduct, editProduct, removeProduct, addCartItem, setCartItems, updateCartItemInState, removeCartItemFromState, setCurrentUser, setLoading, setCheckouts, updateCheckoutInState } from './slices/slices';

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
    const { order_id } = getState().app;

    if (quantity > product.inventory) {
      alert(`Only ${product.inventory} items available in stock.`);
      return;
    }

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
    const cartItem = getState().app.cartItems.find(item => item.id === itemId);
    const product = cartItem.product;

    if (quantity > product.inventory) {
      alert(`Only ${product.inventory} items available in stock.`);
      return;
    }

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

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch('/api/v1/products');
    const data = await response.json();
    dispatch(setProducts(data));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    const response = await fetch('/api/v1/products', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: productData
    });
    const data = await response.json();
    dispatch(addProduct(data));
  } catch (error) {
    console.error('Error creating product:', error);
  }
};

export const updateProduct = (productId, productData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/v1/products/${productId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: productData
    });
    const data = await response.json();
    dispatch(editProduct(data));
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    await fetch(`/api/v1/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    dispatch(removeProduct(productId));
    // Fetch updated cart items if the product is deleted
    dispatch(fetchCartItems());
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

export const fetchCheckouts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/v1/checkouts`);
      const data = await response.json();
      dispatch(setCheckouts(data));
    } catch (error) {
      console.error('Error fetching checkouts:', error);
    }
  };
};

export const fetchUserCheckouts = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/v1/users/${userId}/checkouts`);
      const data = await response.json();
      dispatch(setCheckouts(data));
    } catch (error) {
      console.error('Error fetching user checkouts:', error);
    }
  };
};
