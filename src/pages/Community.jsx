import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/community");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (title && content) {
      try {
        const response = await axios.post("http://localhost:3000/api/community", {
          title,
          content,
        });
        setPosts([response.data, ...posts]);
        setTitle("");
        setContent("");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  return (
    <CommunityContainer>
      <h1>Community Discussions</h1>
      
      <PostForm onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your message here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Post</button>
      </PostForm>
      
      <PostsContainer>
        {posts.map((post) => (
          <Post key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </Post>
        ))}
      </PostsContainer>
    </CommunityContainer>
  );
};

export default Community;


/** Styled Components */
const CommunityContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
  font-family: "Arial", sans-serif;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  textarea {
    height: 100px;
    resize: none;
  }

  button {
    background: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.3s ease-in-out;
  }

  button:hover {
    background: #0056b3;
  }
`;

const PostsContainer = styled.div`
  margin-top: 20px;
`;

const Post = styled.div`
  background: #f4f4f4;
  padding: 15px;
  border-radius: 5px;
  margin-top: 10px;
  text-align: left;

  h2 {
    color: #333;
    margin: 0 0 5px;
    font-size: 18px;
  }

  p {
    color: #555;
    margin: 0;
  }
`;
