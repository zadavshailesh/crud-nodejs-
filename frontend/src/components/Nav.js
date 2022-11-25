import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signUp');
  };

  return (
    <div>
      <img className='logo' src='https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png' 
      alt='logo'/>
      {auth ? (
        <ul className="nav-bar">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signUp">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-bar nav-right">
          <li>
            <Link to="/login">Login</Link>{' '}
          </li>
          <li>
            <Link to="/SignUp">SignUp</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
