import React, { useState } from 'react';
import styled from 'styled-components';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import Picker from 'emoji-picker-react';

function Chatinput({handleSendMsg}) {
  const [value, setValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleEmojiClick = (emoji) => {
    setValue((prevValue) => prevValue + emoji.emoji);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMsg(value);
    console.log(value);
    setValue("");
    // Additional logic or actions can be added here
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Type a message..."
        />
        <ButtonContainer>
          <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <BsEmojiSmileFill size={20} />
          </Button>
          <SendButton type="submit">
            <IoMdSend size={20} />
          </SendButton>
        </ButtonContainer>
        {showEmojiPicker && (
          <emojicontainer>
            <Picker onEmojiClick={handleEmojiClick}  />
          </emojicontainer>
        )}
      </form>
    </Container>
  );
}

const Container = styled.div`
  margin-top: auto;
`;

const Input = styled.input`
  width: 80%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #fff;
  border: none;
  cursor: pointer;
`;

const SendButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
`;

const emojicontainer = styled.div`
  position: absolute;
  bottom: 40px;
  right: 0;
  z-index: 1;
`;

export default Chatinput;
