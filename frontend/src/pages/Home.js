import React, { useEffect, useState } from "react";
import "./home.css";
import Post from "../component/Post";
import { useAuth } from "../contexts/AuthContext";
import { getAllComments } from "../api/commentPosts";
function Home() {
  const [isLoading, setISLoading] = useState(false);
  const [fetchingPostError, setfetchingPostError] = useState("");
  const [fetchingCommentsError, seFetchingCommentsError] = useState("");
  const [fetchingNameError, setFetchingNameErrors] = useState("");
  const [fetchingVoteError, setFetchingVoteError] = useState("");

  // const [post, setPost] = useState("");
  const {
    usersPost,
    setUsersPost,
    setUsersComments,
    setIdToUsersName,
    idToUsersName,
    setUsersVote,
  } = useAuth();
  const getPosts = async () => {
    try {
      const response = await fetch("/api/v1/posts");
      if (response.ok) {
        const postData = await response.json();
        const postJSON = JSON.parse(postData.payload);
        setUsersPost(postJSON);
        setISLoading(false);
      } else if (!response.ok) {
        setfetchingPostError("Error when fetching");
      }
    } catch (error) {
      console.error(error);
      setfetchingPostError(error);
    }
  };
  //fetchurl
  const fetchUserName = async () => {
    try {
      const url = `/api/v1/users`;
      const response = await fetch(`${url}`);
      if (response.ok) {
        const usersNameData = await response.json();
        const usersNameJSON = JSON.parse(usersNameData.payload);
        setIdToUsersName(usersNameJSON);
        setISLoading(false);
      } else if (!response.ok) {
        setFetchingNameErrors("Error fetching username");
      }
    } catch (error) {
      console.error(error);
      setFetchingNameErrors(error);
    }
  };
  //this is for fetching for vote
  const fetchUserVote = async () => {
    try {
      // http://localhost:8080/api/v1/getallvotes
      const url = `/api/v1/getallvotes`;
      const response = await fetch(`${url}`);
      if (response.ok) {
        const usersVoteData = await response.json();
        const usersVoteJSON = JSON.parse(usersVoteData.payload);
        setUsersVote(usersVoteJSON);
        setISLoading(false);
      } else if (!response.ok) {
        setFetchingVoteError("Error Fetching vote");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const fetchAllComments = getAllComments();
  const fetchAllComments = async () => {
    try {
      const allComments = await getAllComments();
      setUsersComments(allComments);
      setISLoading(false);
      return allComments;
    } catch (error) {
      console.error("Error occurred fetching comments:", error);
      seFetchingCommentsError(error);
      throw error;
    }
  };
  // fetchAllComments();

  useEffect(() => {
    setISLoading(true);
    const timeoutFetch = setTimeout(() => {
      getPosts();
      fetchAllComments();
      fetchUserName();
      fetchUserVote();
    }, 1000);

    return () => {
      clearTimeout(timeoutFetch);
      setISLoading(false);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (
    fetchingPostError |
    fetchingCommentsError |
    fetchingVoteError |
    fetchingNameError
  ) {
    return (
      <>
        <div className="errors">{fetchingPostError}</div>
      </>
    );
  }
  return (
    <>
      <div className="home">
        {(usersPost.length > 0) | (idToUsersName.length > 0) &&
          usersPost.map((post, index) => <Post key={index} {...post} />)}
      </div>
    </>
  );
}

export default Home;
