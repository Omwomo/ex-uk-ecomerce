import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../redux/actions';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.app);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt='product image' />
      <div>{product.description}</div>
      <div>{product.price}</div>
    </div>
  );
};

export default ProductDetail;
