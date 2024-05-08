import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../redux/actions';
import { Link, useParams } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.app);
  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryId));
  }, [dispatch, categoryId]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              <div className='products'>
                <img src={product.image} alt='product image' />
                <div>{product.name}</div>
                <div>{product.description}</div>
                <div>{product.price}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
