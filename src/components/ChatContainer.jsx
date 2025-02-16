import React from "react";
import styled from "styled-components";

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  height: 100%;
  overflow-y: auto;
`;

const MessageInput = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
  margin-top: 10px;
  width: 100%;
`;

const ChatContainer = ({ showChat, setShowChat }) => {
  const [input, setInput] = React.useState("");

  const sendMessage = () => {
    if (input.trim()) {
      // Emit the message to the server (socket)
      setInput("");
    }
  };

  return (
    <ChatWrapper>
      <h2>Chat Window</h2>
      <div>
        {/* Display messages here */}
        <div>Message 1</div>
        <div>Message 2</div>
      </div>
      <MessageInput
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </ChatWrapper>
  );
};

export default ChatContainer;
