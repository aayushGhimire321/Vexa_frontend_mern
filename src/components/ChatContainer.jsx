import React, { useState } from "react";
import styled from "styled-components";
import { IoSend } from "react-icons/io5";

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  height: 100%;
  max-width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ChatHeader = styled.h2`
  margin-bottom: 15px;
  font-size: 18px;
  text-align: center;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.soft};
  height: 300px;
`;

const Message = styled.div`
  padding: 8px 12px;
  background-color: ${({ isUser }) => (isUser ? "#007bff" : "#f1f1f1")};
  color: ${({ isUser }) => (isUser ? "#fff" : "#000")};
  border-radius: 8px;
  max-width: 75%;
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
  font-size: 14px;
  outline: none;
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChatContainer = ({ showChat, setShowChat }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", isUser: false },
  ]);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "Thank you for your message!", isUser: false },
        ]);
      }, 1000);
    }
  };

  return (
    <ChatWrapper>
      <ChatHeader>Live Chat</ChatHeader>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>
            {msg.text}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <MessageInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <SendButton onClick={sendMessage}>
          <IoSend size={20} />
        </SendButton>
      </InputContainer>
    </ChatWrapper>
  );
};

export default ChatContainer;
