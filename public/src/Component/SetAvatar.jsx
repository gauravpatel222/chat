import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import loader from '../assets/loader.gif';
import styled from "styled-components";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../Component/SetAvatar.css'

const SetAvatar = () => {
  const api = 'https://api.multiavatar.com/4645646';
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  useEffect(() => {
    const checkCurrentUser = async () => {
      const currentUser = localStorage.getItem('chat-app-current-user');
      // console.log(currentUser);
      if (!currentUser) {
        console.log('no user');
        navigate('/login');
      }
    };
  
    checkCurrentUser();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
    //   console.log(data);
      setAvatars(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);
 
  
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Select your avatar', toastOptions);
      return;
    }

    const user =await JSON.parse(localStorage.getItem('chat-app-current-user'));
    
    try {
    const response=  await axios.post(`http://localhost:8000/setAvatar/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if(response.data.status===true){
        user.isAvatarImageSet = true;
        user.avatarImage =avatars[selectedAvatar] ;
        localStorage.setItem(
            'chat-app-current-user',
            JSON.stringify(user)
          );
        
        toast.success('Profile picture set successfully!', toastOptions);
        console.log("gaurav");
        navigate('/chat');
      }

      
    //   navigate('/'); // Navigate to the desired page after successful profile picture update
    } catch (error) {
      console.error('Error setting profile picture:', error);
      toast.error('Failed to set profile picture. Please try again.', toastOptions);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}
                key={avatar}
                onClick={() => setSelectedAvatar(index)}
              >
                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </>
      )}
    </div>
  );
};



export default SetAvatar;
