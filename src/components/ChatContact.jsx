import React from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  height: 100%;
  max-width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
  overflow-y: auto;
  max-height: 300px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.soft};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.soft};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const ContactStatus = styled.span`
  font-size: 12px;
  color: gray;
`;

const ContactButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const ChatContact = ({ showChat, setShowChat }) => {
  const contacts = [
    { id: 1, name: "John Doe", status: "Online" },
    { id: 2, name: "Jane Smith", status: "Offline" },
    { id: 3, name: "Robert Brown", status: "Online" },
  ];

  return (
    <ContactWrapper>
      <Header>Contact List</Header>
      <ContactList>
        {contacts.map((contact) => (
          <ContactItem key={contact.id}>
            <FaUserCircle size={30} />
            <ContactInfo>
              <ContactName>{contact.name}</ContactName>
              <ContactStatus>{contact.status}</ContactStatus>
            </ContactInfo>
          </ContactItem>
        ))}
      </ContactList>
      <ContactButton onClick={() => setShowChat(!showChat)}>
        <IoChatbubblesOutline size={20} />
        {showChat ? "Close Chat" : "Open Chat"}
      </ContactButton>
    </ContactWrapper>
  );
};

export default ChatContact;
