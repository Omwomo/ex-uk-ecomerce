import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/actions';
import Cart from './Cart';

const Checkout = () => {
  const { cartItems, user } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contactNumber, setContactNumber] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.subtotal_price), 0);

  const handleOrderSubmit = async () => {
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
      navigate('/mpesa');
    } else if (paymentMethod === 'CARD') {
      navigate('/card_payment')
    } else if (paymentMethod === 'WHATSAPP') {
      navigate('/whatsapp')
    } else {
      dispatch(createOrder(orderDetails));
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <label>Contact Number:</label>
        <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {totalAmount < 5000 ? (
        <div>
          <label>Pickup Location:</label>
          <select value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
            <option value="">Select Pickup Location</option>
            {/* Populate this with pickup locations from the backend */}
          </select>
        </div>
      ) : (
        <div>
          <label>Delivery Address:</label>
          <input type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
        </div>
      )}
      <div>
        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="">Select Payment Method</option>
          <option value="MPESA">MPESA</option>
          <option value="CARD">Bank Card</option>
          <option value="WHATSAPP">Order via WhatsApp</option>
        </select>
      </div>
      <button onClick={handlePreview}>Preview Order</button>

      {showPreview && (
        <div>
          <h3>Order Preview</h3>
          <div>Contact Number: {contactNumber}</div>
          <div>Email: {email}</div>
          {totalAmount < 5000 ? (
            <div>Pickup Location: {pickupLocation}</div>
          ) : (
            <div>Delivery Address: {deliveryAddress}</div>
          )}
          <div>Payment Method: {paymentMethod}</div>
          <div>Total Amount: {totalAmount}</div>
          <Cart />
          <button onClick={handleOrderSubmit}>Confirm Order</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
