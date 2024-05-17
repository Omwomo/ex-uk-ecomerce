import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, addToCart } from '../redux/actions';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.app);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product, quantity));
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt='product image' />
      <div>{product.description}</div>
      <div>{product.price}</div>
      <div>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))} 
          min="1" 
        />
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
