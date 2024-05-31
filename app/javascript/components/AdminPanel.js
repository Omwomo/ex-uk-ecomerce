import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useSelector((state) => state.app);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      {/* Add your admin functionalities here */}
    </div>
  );
};

export default AdminPanel;
