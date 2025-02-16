import { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
import ChatContact from "../components/ChatContact";

const socket = io("http://localhost:5000"); // Update with backend URL

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 85vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 12px 0px;
  @media (max-width: 800px) {
      height: 82vh;
      border-radius: 0px;
      height: 87vh;
  }
`;

const ChatsContact = styled.div`
  margin: 12px 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  height: 100%;
  background-color: ${({ theme }) => theme.card};
  border-right: 1px solid ${({ theme }) => theme.soft};
  @media (max-width: 800px) {
    border-right: none;
    border-radius: 0px;
  }
  border-radius: 10px 0px 0px 10px;
`;

const ChatsContainer = styled.div`
  margin: 12px 0px;
  display: flex;
  max-width: 800px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  border-radius: 0px 10px 10px 0px;
`;

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 768;
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off("message");
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <Container>
      <Wrapper>
        {width < breakpoint ? (
          showChat ? (
            <ChatContainer showChat={showChat} setShowChat={setShowChat} />
          ) : (
            <ChatContact showChat={showChat} setShowChat={setShowChat} />
          )
        ) : (
          <>
            <ChatsContact>
              <ChatContact showChat={showChat} setShowChat={setShowChat} />
            </ChatsContact>
            <ChatsContainer>
              <ChatContainer showChat={showChat} setShowChat={setShowChat} />
            </ChatsContainer>
          </>
        )}
      </Wrapper>
    </Container>
  );
}
