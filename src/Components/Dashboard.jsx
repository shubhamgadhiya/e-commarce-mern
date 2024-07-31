import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Alluser from './Alluser';
import Allproduct from './Allproduct';
import './Dashboard.css';
import { logOut } from '../redux/userslice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

function Sidebar() {
  const [content, setContent] = useState('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user } = useSelector((state) => state.user);
console.log(user);
const profile = () => {
  if (content !== 'profile') {
    setContent('profile');
  }

};
  const handleUserClick = () => {
    if (content !== 'user') {
      setContent('user');
    }
  };

  const handleProductClick = () => {
    if (content !== 'product') {
      setContent('product');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(logOut());
  };

  return (
    <div className="d-flex">
      <div className="leftSideStyle">
        <p>{user.email} </p>
        <ul className="list">
          <li className={content === 'user' ? 'active listStyle' : 'listStyle'} onClick={handleUserClick}>
            User
          </li>
          <li className={content === 'product' ? 'active listStyle' : 'listStyle'} onClick={handleProductClick}>
            Product
          </li>
          <li className={content === 'profile' ? 'active listStyle' : 'listStyle'} onClick={profile}>
            Profile
          </li>
        </ul>
        <div className="logout-button mt-5 text-center">
          <Button variant="primary" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="content contentStyle">
        {content === 'user' && <Alluser key="user" />}
        {content === 'product' && <Allproduct key="product" />}
        {content === 'profile' && <Profile key="profile" />}
      </div>
    </div>
  );
}

export default Sidebar;
