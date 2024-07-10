import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, addToCart } from '../redux/actions';
import { useParams } from 'react-router-dom';
import SocialShare from './SocialShare';

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
    const quantityToAdd = Math.max(quantity, 1);
    dispatch(addToCart(product, quantityToAdd));
  };

  const handleQuantityChange = (e) => {
    let newQuantity = parseInt(e.target.value, 10);
    if (newQuantity < 1 || isNaN(newQuantity)) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
  };

  const handleWhatsAppOrder = () => {
    const adminPhoneNumber = '+254716335602';
    const message = `Hello, I would like to order the following product:
    Product Name: ${product.name}
    Price: ${product.price}
    Quantity: ${quantity}
    Total: ${product.price * quantity}`;

    const url = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  };

  const url = `${window.location.origin}/product/${product.id}`;
  const title = `Check out this product: ${product.name}`;

  return (
    <div>
      <h1>{product.name}</h1>
      <img className='product_image' src={product.image_url} alt='product image' />
      <div>{product.description}</div>
      <div>{product.price}</div>
      <div>{product.inventory}</div>
      <div>
        <input 
          type="number" 
          value={quantity} 
          onChange={handleQuantityChange} 
          min="1" 
        />
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleWhatsAppOrder}>Order via WhatsApp</button>
      <SocialShare url={url} title={title} />
    </div>
  );
};

export default ProductDetail;
