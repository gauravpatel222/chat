import React, { useEffect, useState, useRef } from 'react';
import Chatinput from './Chatinput';
import './ChatContainer.css';
import axios from 'axios';
import io from 'socket.io-client';
import Logout from './Logout';

const socket = io('http://localhost:8000'); // replace with your server URL

const ChatContainer = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [currentuser, setCurrentUser] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(localStorage.getItem('chat-app-current-user'));
      setCurrentUser(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        try {
          const response = await axios.post('http://localhost:8000/allmessage/', {
            from: currentuser._id,
            to: currentChat.id,
          });
          setMessages(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchData();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const id=await currentChat.id;
    console.log(id)
    
    const data=await axios.post('http://localhost:8000/addmessage/',{
      from:currentuser._id,
      to:currentChat.id,
      msg:msg
    });

    
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
    socket.emit('send-msg', {
      to: currentChat.id,
      from: currentuser._id,
      msg,
    });

  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      <Logout/>
      <div className="reciever">
        <h2>{currentChat.username}</h2>
        <img src={`data:image/svg+xml;base64,${currentChat.avatar}`} alt="" />
      </div>
      
      <div className="message_container">
        {messages.map((msg, index) => (
          <div className={`chat ${msg.fromSelf ? 'send' : 'receive'}`} key={index}>
            <h3>{msg.message}</h3>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      

      <Chatinput handleSendMsg={handleSendMsg} />
    </div>
  );
};

export default ChatContainer;
