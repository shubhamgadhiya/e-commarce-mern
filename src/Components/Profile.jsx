import React, { useEffect, useState } from 'react';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/userslice';
import { setAuthToken } from './authUtils';
import jwtDecode from 'jwt-decode';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user._id);

  const [data, setData] = useState({
    _id: "",
    email: '',
    firstname: '',
    lastname: '',
    phonenumber: '',
  });

  const userdetails = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/currentuser", { _id: user._id });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  useEffect(() => {
    if (user._id) {
      userdetails();
    }
  }, [user._id]);

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
      const update = await axios.put(`http://localhost:4000/api/update/${data._id}`, data);
      console.log("update", update);
      toast.success('Update Successful', { position: 'top-center', autoClose: 3000 });
      navigate("/");
    } catch (error) {
      console.log("Error object:", error);
      toast.error(error?.response?.data?.message || "Update failed", { position: 'top-center', autoClose: 3000 });
    }
  };

  return (
    <div className="wrapper">
      <div className="title">
        Update Details
      </div>
      <form className='register-data' method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            name="firstname"
            value={data.firstname}
            onChange={handleOnChange}
            required
            autoComplete='off'
          />
          <label>Firstname *</label>
        </div>
        <div className="field">
          <input
            type="text"
            name="lastname"
            value={data.lastname}
            onChange={handleOnChange}
            required
            autoComplete='off'
          />
          <label>Lastname *</label>
        </div>
        <div className="field">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            required
            autoComplete='off'
          />
          <label>Email *</label>
        </div>
        <div className="field">
          <input
            type="tel"
            name="phonenumber"
            value={data.phonenumber}
            onChange={handleOnChange}
            maxLength={10}
            minLength={10}
            pattern="[0-9+]*"
            required
            autoComplete='off'
          />
          <label>Phonenumber *</label>
        </div>
        <div className="field">
          <input type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default Profile;
