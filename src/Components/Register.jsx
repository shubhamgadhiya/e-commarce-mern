import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import loginIcons from '../image/signin.gif';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
const Register = () => {
  const navigate = useNavigate();
const user = useSelector((state) => state.user);


  const [data, setData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phonenumber: '',
    profilepic: null,
    image: '',
  });
  console.log("data",data)
  const [image, setImage] = useState({ profilepic: null });
  const [image1, setImage1] = useState();

  const [error, setError] = useState('');

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phonenumber' && !/^[0-9+]*$/.test(value)) {
      return; // Do not update state if input is invalid
    }

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    setImage1(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setData ({
        ...data,
        image:file.name,
        profilepic: reader.result,
      });
    }
    reader.readAsDataURL(file);
    setImage((prev) => ({
      ...prev,
      profilepic: file,
    }));

    setError("");

  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!data.profilepic) {
        setError('Profile picture is required.');
        return;
      }
      const responce = await axios.post("http://localhost:4000/api/signup", data);
      console.log("responce", responce);
      if (responce.status == 200) {
        const formData = new FormData();
        formData.append('image', image1);
        console.log("file", image1)

        const image = await axios.post("http://localhost:4000/upload", formData, {
          headers: {
            'content-Type': "multipart/form-data",
          },
        });

        console.log("image", image);
      }

      toast.success('Register Successful', { position: 'top-center', autoClose: 3000 });
      navigate("/login")
    }
    catch (error) {
      console.log("Error object:", error);
      toast.error(error.response.data.message, { position: 'top-center', autoClose: 3000 });

    }
  };

  return (
    <div className="wrapper">
      <div className="title">Register Form</div>
      <div className="profile-pic-wrapper mt-2">
        <div className="position-relative overflow-hidden rounded-circle mx-auto" style={{ width: '100px', height: '100px' }}>
          <img src={data.profilepic ? data.profilepic : loginIcons} alt="login icons" className="w-100 h-100 object-cover" />
          <form>
            <label className="w-100 position-absolute bottom-0 text-center bg-light bg-opacity-80 cursor-pointer"
              style={{ opacity: data.profilepic ? 0 : 1 }}
            >
              Upload Photo
              <input type="file" className="d-none" onChange={handleImageChange} accept="image/*" required />
            </label>
          </form>
        </div>
        {error && <p className="text-danger text-center">{error}</p>}
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
          <input
            type="password"
            value={data.password}
            name="password"
            onChange={handleOnChange}
            required
            autoComplete='off'
          />
          <label>Password *</label>
        </div>
        <div className="field">
          <input type="submit" value="Sign In" />
        </div>
        <div className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
