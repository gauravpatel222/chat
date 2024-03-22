import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Contacts from '../Component/Contacts';
import Welcome from '../Component/Welcome';
import ChatContainer from '../Component/ChatContainer';
import styled from "styled-components";


const Chat = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  

  useEffect(() => {
    const checkCurrentUser = () => {
      if (!localStorage.getItem('chat-app-current-user')) {
        // Redirect to login page if there's no current user
        navigate('/');
      }
    };

    checkCurrentUser();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('chat-app-current-user'));
        setCurrentUser(user);

        const response = await axios.get('http://localhost:8000/allUsers');
        
        // console.log(response.data);
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error or set appropriate state
      }
    };

    fetchData();
  }, []);
    function handlecurrentchat(chat){
      setCurrentChat(chat);
    }
  return (
    <Container>
        <div className="container">
          <Contacts contacts={contacts}  currentChat={handlecurrentchat}/>
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} />
          )}
        </div>
      </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;


export default Chat;
