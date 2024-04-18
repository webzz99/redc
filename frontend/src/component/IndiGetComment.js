import React, { useEffect, useState } from "react";
import {
  commentsGet,
  deleteComment,
  editCommentPatch,
} from "../api/commentPosts";
import changeUKTime from "../utils/changeUKTimeFormat";
import "./indigetcomment.css";
import { useAuth } from "../contexts/AuthContext";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import changeIdToName from "../utils/changeIdToName";
function IndiGetComment({
  _id,
  token,
  setIsCommentWrite,
  clickEdit,
  setClickEdit,
}) {
  const [fetchedComments, isFetchedComments] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { usersData, usersComments, setUsersComments, idToUsersName } =
    useAuth();
  // const [quillEdit, setQUillEdit] = useState("");
  const [editItem, setEditItem] = useState("");

  useEffect(() => {
    getComments();
  }, [_id, token, usersComments]);

  const getComments = async () => {
    try {
      const comments = await commentsGet(_id, token);
      if (comments) {
        isFetchedComments(comments);
        setIsLoading(false);
      } else {
        isLoading(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleCommentDelete = async (id, token) => {
    try {
      const comments = await deleteComment(id, token);
      if (comments) {
        setUsersComments((prevValue) =>
          prevValue.filter((item) => item._id !== id)
        );
        setIsLoading(false);
      } else isLoading(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = (item) => {
    setClickEdit(true);
    setIsCommentWrite("");
    setEditItem(item);
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const handleFetchEditComment = async (e) => {
    e.preventDefault();
    const updateData = { content: editItem.content };

    const success = editCommentPatch(editItem._id, token, updateData);

    console.log(success);
    if (success) {
      setUsersComments((prevValue) =>
        prevValue.map((item) =>
          item._id === editItem._id ? { ...item, ...editItem } : { ...item }
        )
      );
      navigate(`/post/${id}`);
    } else if (!success) {
      console.log("NO success");
    }
  };
  const handleClearEdit = () => {
    setClickEdit(false);
  };

  if (isLoading) {
    return <div className="indipost-comment">Loading...</div>;
  }
  const handleQuillChange = (content) => {
    setEditItem((prevEditItem) => ({
      ...prevEditItem,
      content: content,
    }));
  };

  if (!isLoading) {
    return (
      <>
        {clickEdit && (
          <form className="comment-edit" onSubmit={handleFetchEditComment}>
            <h1>Comment Edit</h1> by{" "}
            {changeIdToName(idToUsersName, editItem.createdBy)}
            <ReactQuill
              theme="snow"
              value={editItem.content}
              onChange={handleQuillChange}
            />
            <button>Submit Edit</button>
            {setClickEdit && (
              <button onClick={handleClearEdit}>Clear Edit</button>
            )}
          </form>
        )}

        {fetchedComments.map((item, index) => (
          <div className="indipost-comment">
            <span>{index + 1}. </span>

            <span dangerouslySetInnerHTML={{ __html: item.content }}></span>

            <span>
              Created By {changeIdToName(idToUsersName, item.createdBy)}
            </span>
            <span>{changeUKTime(item.createdAt)}</span>

            {usersData._id === `${item.createdBy}` && (
              <>
                <button
                  onClick={() => {
                    handleEdit(item);
                  }}
                >
                  Edit
                </button>
                <button
                  className="errors"
                  onClick={() => handleCommentDelete(`${item._id}`, token)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </>
    );
  }
}

export default IndiGetComment;
