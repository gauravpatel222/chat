import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const { username, email, password } = values;

      try {
        const response = await axios.post('http://localhost:8000/register', { username, email, password });

        if (response.data.status === false) {
          toast.error(response.data.msg, toastOptions);
        } else {
          // localStorage.setItem('chat-app-current-user', JSON.stringify(response.data.user));
          navigate('/login');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validate = () => {
    const { username, email, password, confirmpassword } = values;

    if (password !== confirmpassword) {
      toast.error('Password and confirm password should be the same.', toastOptions);
      return false;
    } else if (email === '') {
      toast.error('Email cannot be empty.', toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };





  
  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h1>snappy</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmpassword"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Create User</button>
        <span>
          Already have an account? <Link to="/login">Login.</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Register;
