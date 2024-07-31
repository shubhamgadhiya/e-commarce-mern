import React, { useState, useEffect ,Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import AboutUs from './Components/About';
import Login from './Components/Login';
import Register from './Components/Register';
import Cart from './Components/Cart';
import Dashboard from './Components/Dashboard';
import AllUser from './Components/Alluser';
import AllProduct from './Components/Allproduct';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TokenAdd from './ApiCheck/TokenAdd';
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { addUser, logOut } from './redux/userslice';
import axios from 'axios';
import Context from './Context/Context';
import Loader from './ApiCheck/Loader';
import PrivateRoute from './ApiCheck/PrivateRoute';
import PageNotFound from "./Components/PageNotFound";
import Profile from './Components/Profile';
import AllProductDetails from './Components/AllProductDetails';

const App = () => {
  const dispatch = useDispatch();


  const token = localStorage.getItem('token');
  if (token) {
    // Set Auth Token header Auth
    TokenAdd(token);
    // Decode Token and get user info and exp
    const decoded = jwtDecode(token);
    console.log('decoded', decoded);

    dispatch(addUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      dispatch(logOut());
      window.location.href = '/';
    }
  }

  const [count, setCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/cartcount');
      const data = response.data.data;
      setCount(data);
    } catch (error) {
      console.error('Error fetching cart count', error);
    }
  };
  
  useEffect(() => {
    fetchCartCount();
  },[]);

  return (
    <Context.Provider value={{ count, fetchCartCount }}>
      <Router>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/product/:id" element={<AllProductDetails />} />

          <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Allusers" element={<AllUser />} />
          <Route path="/Allproducts" element={<AllProduct />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </Suspense>
      </Router>
    </Context.Provider>
  );
};

export default App;
