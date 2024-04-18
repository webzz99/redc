import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function CountComment({ _id, token }) {
  const [commentCount, setCommentCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { usersComments } = useAuth();

  function countPostId(usersComments, _id) {
    let count = 0;
    for (let item of usersComments) {
      if (item.hasOwnProperty("postId") && item.postId === _id) {
        count++;
      }
    }
    return count;
  }

  const fetchCommentCount = () => {
    try {
      const count = countPostId(usersComments, _id);
      if (count) {
        setCommentCount(count);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCommentCount();
  }, [_id, usersComments]);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!isLoading) {
    return (
      <>
        {!commentCount ? (
          <span>No Comment</span>
        ) : (
          <span>
            {commentCount > 0
              ? `${commentCount} Comment${commentCount > 1 ? "s" : ""}`
              : "No Comment"}
          </span>
        )}
      </>
    );
  }
}

export default CountComment;
