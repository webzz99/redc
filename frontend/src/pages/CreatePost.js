import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./createpost.css";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const { token, usersData } = useAuth();
  const [content, setContent] = useState("");
  const [createPostError, setCreatePostError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCreatePostError("");

    const data = {
      content: content,
      userId: usersData._id,
    };

    try {
      const response = await fetch(`/api/v1/posts`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setCreatePostError("Failed to create post");
        throw new Error("Failed to create post");
      }

      const responsedata = await response.json();
      if (responsedata.code === "OK") {
        navigate("/");
        setContent("");
        setIsLoading(false);
      } else {
        throw new Error("Creating Post error");
      }
    } catch (error) {
      console.error(error);
      setCreatePostError(error.message);
    }
  };

  return (
    <div className="createpost-container">
      <form onSubmit={handleCreatePost}>
        <h1>Hello CreatePost</h1>by{" "}
        {usersData && usersData.username && <>{usersData.username}</>}
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <button type="submit">Create Post</button>
        {createPostError && <div className="errors">{createPostError}</div>}
      </form>
    </div>
  );
}

export default CreatePost;
