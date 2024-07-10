import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, deleteProduct, fetchCategories, fetchCheckouts, updateCheckoutStatus } from '../redux/actions';
import { Navigate, Link } from 'react-router-dom';

const AdminPanel = () => {
  const { user, products, categories, checkouts } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    inventory: '',
    image: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    if (user && user.role === 'admin') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
      dispatch(fetchCheckouts());
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProductForm({
      ...productForm,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in productForm) {
      formData.append(`product[${key}]`, productForm[key]);
    }
    if (editMode) {
      await dispatch(updateProduct(currentProductId, formData));
      setEditMode(false);
      setCurrentProductId(null);
    } else {
      await dispatch(createProduct(formData));
    }
    setProductForm({ name: '', description: '', price: '', category_id: '', inventory: '', image: null });
  };

  const handleEdit = (productId) => {
    const product = products.find((p) => p.id === productId);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.category_id,
      inventory: product.inventory,
    });
    setEditMode(true);
    setCurrentProductId(productId);
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleStatusChange = (orderId, status) => {
    dispatch(updateCheckoutStatus(orderId, status));
  };

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={productForm.name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="description" value={productForm.description} onChange={handleChange} placeholder="Description" />
        <input type="number" name="price" value={productForm.price} onChange={handleChange} placeholder="Price" />
        <input type="number" name="inventory" value={productForm.inventory} onChange={handleChange} placeholder="Inventory" />
        <select name="category_id" value={productForm.category_id} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.length > 0 ? (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          ) : (
            <option disabled>No categories available</option>
          )}
        </select>
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">{editMode ? 'Update Product' : 'Add Product'}</button>
      </form>
      <div>
        <h1>Products</h1>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <div>
                    <img className="product_image" src={product.image_url} alt="product image" />
                    <div>{product.name}</div>
                    <div>{product.description}</div>
                    <div>{product.price}</div>
                    <div>{product.inventory}</div>
                  </div>
                </Link>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available</p>
        )}
      </div>
      <div>
        <h1>Orders</h1>
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
      </div>
    </div>
  );
};

export default AdminPanel;
