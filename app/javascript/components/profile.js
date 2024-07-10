import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserCheckouts, updateCheckoutStatus, fetchCurrentUser } from '../redux/actions';

const UserProfile = () => {
  const { user, checkouts } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserData = async () => {
      dispatch(fetchCurrentUser());
    };
    loadUserData();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserCheckouts(user.id));
    }
  }, [dispatch, user]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateCheckoutStatus(orderId, status));
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <h1>Orders</h1>
        <ul>
          {checkouts.length > 0 ? (
            <ul>
              {checkouts.map((order) => (
                <li key={order.id}>
                  <div>Order ID: {order.id}</div>
                  <div>Contact Number: {order.contact_number}</div>
                  <div>Email: {order.email}</div>
                  <div>Pickup Location: {order.pickup_location_id}</div>
                  <div>Delivery Address: {order.delivery_address}</div>
                  <div>Total Price: {order.total_price}</div>
                  <div>Status: {order.status}</div>
                  {order.status === 'paid' && (
                    <button onClick={() => handleStatusChange(order.id, 'shipping')}>Mark as Shipping</button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
