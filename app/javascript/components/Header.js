import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SignOut from './SignOut';
import { fetchCurrentUser } from '../redux/actions';

const Header = () => {
  const { cartItems, loading, user } = useSelector((state) => state.app);

  const cartItemsCount = cartItems ? cartItems.length : 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    console.log('Current user:', user);
  }, [user]);

  return (
    <header>
      <nav className="flex gap-5 justify-between px-px w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1b2ae81ec94f42c0f092161634cf73bafeb8f7edd3326d33f2270b16aed2423?apiKey=8a41c3772a284fe68e31011f9e179c73&"
          className="self-center mt-1 w-6 aspect-[12.5]"
        />
        <ul>
          <li><Link to="/">Ex-Uk</Link></li>
          <div>
            <Link to="/cart"> ({loading ? 'Loading...' : cartItemsCount})
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/93774a03377387f29ddd91198401738b9feb1bac424eb934797ea9c75e7a4794?apiKey=8a41c3772a284fe68e31011f9e179c73&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/93774a03377387f29ddd91198401738b9feb1bac424eb934797ea9c75e7a4794?apiKey=8a41c3772a284fe68e31011f9e179c73&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/93774a03377387f29ddd91198401738b9feb1bac424eb934797ea9c75e7a4794?apiKey=8a41c3772a284fe68e31011f9e179c73&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/93774a03377387f29ddd91198401738b9feb1bac424eb934797ea9c75e7a4794?apiKey=8a41c3772a284fe68e31011f9e179c73&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/93774a03377387f29ddd91198401738b9feb1bac424eb934797ea9c75e7a4794?apiKey=8a41c3772a284fe68e31011f9e179c73&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/93774a03377387f29ddd91198401738b9feb1bac424eb934797ea9c75e7a4794?apiKey=8a41c3772a284fe68e31011f9e179c73&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/93774a03377387f29ddd91198401738b9feb1bac424eb934797ea9c75e7a4794?apiKey=8a41c3772a284fe68e31011f9e179c73&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/93774a03377387f29ddd91198401738b9feb1bac424eb934797ea9c75e7a4794?apiKey=8a41c3772a284fe68e31011f9e179c73&"
              className="shrink-0 max-w-full aspect-[3.33] w-[101px]"
            />
            </Link>
          </div>
          {user ? (
            <>
              {user.role === "user" && <li><Link to="/profile">Profile</Link></li>}
              {user.role === "admin" && <li><Link to="/admin">Admin Panel</Link></li>}
              <li><SignOut /></li>
            </>
          ) : (
            <>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0a38896cfe4975e44099ac77ceaae609d1699ef46f881aa46317b404c55b678c?apiKey=8a41c3772a284fe68e31011f9e179c73&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a38896cfe4975e44099ac77ceaae609d1699ef46f881aa46317b404c55b678c?apiKey=8a41c3772a284fe68e31011f9e179c73&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a38896cfe4975e44099ac77ceaae609d1699ef46f881aa46317b404c55b678c?apiKey=8a41c3772a284fe68e31011f9e179c73&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a38896cfe4975e44099ac77ceaae609d1699ef46f881aa46317b404c55b678c?apiKey=8a41c3772a284fe68e31011f9e179c73&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a38896cfe4975e44099ac77ceaae609d1699ef46f881aa46317b404c55b678c?apiKey=8a41c3772a284fe68e31011f9e179c73&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a38896cfe4975e44099ac77ceaae609d1699ef46f881aa46317b404c55b678c?apiKey=8a41c3772a284fe68e31011f9e179c73&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a38896cfe4975e44099ac77ceaae609d1699ef46f881aa46317b404c55b678c?apiKey=8a41c3772a284fe68e31011f9e179c73&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a38896cfe4975e44099ac77ceaae609d1699ef46f881aa46317b404c55b678c?apiKey=8a41c3772a284fe68e31011f9e179c73&"
          className="shrink-0 w-8 aspect-square"
        />
      </nav>
    </header>
  );
};

export default Header;
