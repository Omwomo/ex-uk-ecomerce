import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/actions';
import Cart from './Cart';

const Checkout = () => {
  const { cartItems, user } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [contactNumber, setContactNumber] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.subtotal_price), 0);

  const handleOrderSubmit = () => {
    const orderDetails = {
      contact_number: contactNumber,
      pickup_location_id: totalAmount < 5000 ? pickupLocation : null,
      delivery_address: totalAmount >= 5000 ? deliveryAddress : null,
      total_price: totalAmount,
      user_id: user.id,
      status: 'pending',
      email: email,
    };

    if (paymentMethod === 'MPESA') {
      // Navigate to MPESA payment page
    } else if (paymentMethod === 'CARD') {
      // Navigate to Stripe payment page
    } else if (paymentMethod === 'WHATSAPP') {
      // Navigate to WhatsApp order page
    } else {
      dispatch(createOrder(orderDetails));
    }
  };

  
};

export default Checkout;
