import { setProduct } from './slices/productSlice';

export const fetchProducts = () => {
  return (dispatch) => {
    fetch('/api/v1/products')
      .then((response) => response.json())
      .then((data) => dispatch(setProduct(data)))
      .catch((error) => console.error('Error fetching greeting:', error));
  };
};
