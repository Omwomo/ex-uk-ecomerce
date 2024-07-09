import React, { useState } from 'react';

const MPESAPage = ({ onPaymentSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch access token
      const tokenResponse = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa('YOUR_CONSUMER_KEY:YOUR_CONSUMER_SECRET')}`
        }
      });
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Simulate C2B payment
      const paymentResponse = await fetch('https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          "ShortCode": "YOUR_SHORTCODE",
          "CommandID": "CustomerBuyGoodsOnline",
          "Amount": "1",
          "MSISDN": phoneNumber,
          "BillRefNumber": ""
        })
      });

      const paymentData = await paymentResponse.json();

      if (paymentData.ResponseCode === '0') {
        onPaymentSuccess();
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>MPESA Payment</h2>
      <input
        type="text"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default MPESAPage;
