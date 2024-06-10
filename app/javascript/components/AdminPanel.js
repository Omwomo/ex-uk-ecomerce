import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, deleteProduct, fetchCategories } from '../redux/actions';
import { Navigate, Link } from 'react-router-dom';

const AdminPanel = () => {
  const { user, products, categories } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    inventory: '',
    image: null
  });

  useEffect(() => {
    if (user && user.role === 'admin') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setProductForm({
      ...productForm,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in productForm) {
      formData.append(`product[${key}]`, productForm[key]);
    }
    await dispatch(createProduct(formData));
    setProductForm({ name: '', description: '', price: '', category_id: '', inventory, image: null });
  };

  const handleEdit = (productId) => {
    // Logic for editing product
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
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
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">Add Product</button>
      </form>
      <div>
        <h1>Products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div>
                  <img className='product_image' src={product.image_url} alt='product image' />
                  <div>{product.name}</div>
                  <div>{product.description}</div>
                  <div>{product.price}</div>
                </div>
              </Link>
              <button onClick={() => handleEdit(product.id)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
