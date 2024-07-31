import React, { useState } from 'react';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userslice';
import { setAuthToken } from './authUtils';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const login = await axios.post("http://localhost:4000/api/signin", data)
      console.log("login", login)
      localStorage.setItem("token", login?.data?.token);
      setAuthToken(login.data.token);
      const decoded = jwtDecode(login.data.token);
      dispatch(addUser(decoded));
      toast.success('Login Successful', { position: 'top-center', autoClose: 3000 });
      navigate("/")
    } catch (error) {
      console.log("Error object:", error);
      toast.error(error?.response?.data?.message, { position: 'top-center', autoClose: 3000 });
    }
  };

  return (
    <div className="wrapper">
      <div className="title">
        Login Form
      </div>
      <form className='register-data' method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            required
            autoComplete='off'
          />
          <label>Email</label>
        </div>
        <div className="field">
          <input
            type="password"
            value={data.password}
            name="password"
            onChange={handleOnChange}
            required
            autoComplete='off'
          />
          <label>Password</label>
        </div>
        <div className="field">
          <input type="submit" value="Login" />
        </div>
        <div className="signup-link">
          Don't have account? <Link to="/register">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
