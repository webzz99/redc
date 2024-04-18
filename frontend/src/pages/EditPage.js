import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import editPost from "../api/editPost";
import "./editpage.css";
import { handleLogin } from "../component/PopUpManager";
import { MdOutlineDelete } from "react-icons/md";
import deletePost from "../api/deletePost";
import ReactQuill from "react-quill";
import changeIdToName from "../utils/changeIdToName";
function EditPage() {
  const {
    usersPost,
    setUsersPost,
    usersData,
    isAuthenticate,
    setOpenLogin,
    setOpenSignup,
    setCheckPopup,
    token,
    idToUsersName,
  } = useAuth();
  //if user id and post id same can edit anything
  const { id } = useParams();
  const getPostData = usersPost && usersPost.find((item) => item._id === id);
  const isValidPost = getPostData && usersData._id === getPostData.createdBy;
  const [deleteErrors, setDeleteErrors] = useState("");
  const [editContent, setEditContent] = useState(getPostData.content);
  const [editPostErrors, setEditPostErrors] = useState("");
  const navigate = useNavigate();

  if (!isValidPost) {
    navigate("/");
  }
  const handleEditPost = async (e) => {
    e.preventDefault();
    const updatedData = {
      content: editContent,
    };
    const success = await editPost(getPostData._id, token, updatedData);
    if (success) {
      setUsersPost((prevValue) =>
        prevValue.map((item) =>
          item._id === getPostData._id ? { ...item, ...success } : item
        )
      );
      navigate(`/post/${id}`);
    } else if (!success) {
      setEditPostErrors("EditFail");
    }
  };
  const handleAuthorCLick = (author) => {
    alert("You are the author" + author);
  };
  const handleLoginCLick = (event) => {
    event.preventDefault();
    handleLogin(setOpenLogin, setOpenSignup, setCheckPopup);
  };
  const handleDelete = async () => {
    const success = await deletePost(getPostData._id, token);
    if (success) {
      navigate("/");
    } else if (!success) {
      setDeleteErrors("DeleteFail");
    }
  };
  return (
    <div className="editpost-container">
      <h1>EditPost</h1>
      <div className="post-header">
        <Link>
          <h5
            className="post-author"
            onClick={() => handleAuthorCLick(getPostData.createdBy)}
          >
            u/
            {changeIdToName(idToUsersName, getPostData.createdBy)}
          </h5>
        </Link>
        {!isAuthenticate && (
          <span className="post-join" onClick={handleLoginCLick}>
            Join
          </span>
        )}
        {usersData._id === getPostData.createdBy ? (
          <>
            <div className="post_delete" onClick={handleDelete}>
              <MdOutlineDelete /> Delete
            </div>
          </>
        ) : null}
      </div>

      <form onSubmit={handleEditPost}>
        <ReactQuill
          theme="snow"
          value={editContent}
          onChange={setEditContent}
        />
        <button>Update</button>
        {editPostErrors && <div className="errors">{editPostErrors}</div>}
        {deleteErrors && <div className="errors">{deleteErrors}</div>}
      </form>
    </div>
  );
}

export default EditPage;
