import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Post from "../component/Post";
import { useParams } from "react-router-dom";

function UserPost() {
  const { usersPost, idToUsersName } = useAuth();
  const { id } = useParams();

  return (
    <>
      <div className="home">
        {(usersPost.length > 0) | (idToUsersName.length > 0) &&
          usersPost
            .filter((post, index) => post.createdBy === id)
            .map((filterPost, index) => <Post key={index} {...filterPost} />)}
        {/* usersPost.map((post, index) => <Post key={index} {...post} />) */}
      </div>
    </>
  );
}

export default UserPost;
