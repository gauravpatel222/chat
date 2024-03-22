import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.svg';

const Login = () => {
  const navigate = useNavigate();

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  };

  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = values;

    try {
      // Perform login
      const loginResponse = await axios.post('http://localhost:8000/login', { username, password });

      console.log(loginResponse.data);
      if (loginResponse.data.status === false) {
        toast(loginResponse.data.msg, toastOptions);
      } else if (loginResponse.data.status === true) {
        toast(loginResponse.data.msg, toastOptions);

        // Send a POST request to the '/user' endpoint with the 'username'
        const userResponse = await axios.post('http://localhost:8000/user', { username });

        // Store the complete user information in local storage
        navigate('/setAvatar');
        localStorage.setItem('chat-app-current-user', JSON.stringify(userResponse.data.user));

        // Redirect to '/chat'
        
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
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
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Login</button>
        <span>
          Does not have an account? <Link to="/register">Register</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
