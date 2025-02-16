import React from "react";
import styled from "styled-components";

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  height: 100%;
  overflow-y: auto;
`;

const ContactButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const ChatContact = ({ showChat, setShowChat }) => {
  return (
    <ContactWrapper>
      <h2>Contact List</h2>
      <p>Select a contact to chat with.</p>
      <ContactButton onClick={() => setShowChat(!showChat)}>
        {showChat ? "Close Chat" : "Open Chat"}
      </ContactButton>
    </ContactWrapper>
  );
};

export default ChatContact;
