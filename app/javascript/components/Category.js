import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/actions';
import { Link } from 'react-router-dom';

const Category = () => {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <div>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.811719729086!2d34.750219475852504!3d-0.10422053547831442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa494b3e0b761%3A0xbe018687a73a5947!2sMega%20Plaza!5e0!3m2!1sen!2ske!4v1720509784889!5m2!1sen!2ske"
        width="600"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      </div>
    </div>
  );
};

export default Category;
