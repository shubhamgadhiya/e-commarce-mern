import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from "../redux/userslice";
import Context from '../Context/Context';
import loginIcons from '../image/signin.gif';

const Header = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false); // Use boolean instead of string
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { count } = useContext(Context);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [location, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
    setLogin(false);
    setDropdownOpen(false);
    navigate("/");
  };

  const profile = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">E=commarce</Link>
        </div>
        <div>
          <ul className="menu">
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
          </ul>
        </div>
        {!login ? (
          <div className="right-menu">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <div className="right-menu">
            <div
              className={`profile-container ${dropdownOpen ? 'open' : ''}`}
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
              <img src={loginIcons} alt="login icons" className="profile-img" />
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li onClick={profile}>Profile</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </div>
            <Link to="/cart">Cart {count}</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
