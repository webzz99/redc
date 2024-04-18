import React, { useEffect, useState } from "react";
import { FaEdit, FaCommentAlt } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import { handleLogin } from "./PopUpManager";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import changeUKTime from "../utils/changeUKTimeFormat";
import deletePost from "../api/deletePost";
import upVote from "../api/upVote";
import downVote from "../api/downVote";
import CountComment from "./CountComment";
import checkvote from "../utils/checkvote";
import UpDownVoteMessage from "./UpDownVoteMessage";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import changeIdToName from "../utils/changeIdToName";
function Post({
  _id,
  content,
  createdBy,
  createdAt,
  numberOfUpVote,
  numberOfDownVote,
}) {
  const getPost = { numberOfDownVote, numberOfUpVote };
  const {
    setOpenLogin,
    setOpenSignup,
    setCheckPopup,
    isAuthenticate,
    usersData,
    token,
    setUsersPost,
    usersVote,
    usersPost,
    idToUsersName,
  } = useAuth();
  const [deleteErrors, setDeleteErrors] = useState("");
  const [upVoteErrors, setUpVoteErrors] = useState("");
  const [downVoteErrors, setDownVoteErrors] = useState("");
  const [isCommentWrite, setIsCommentWrite] = useState(true);
  const [isUserVote, setIsUserVote] = useState(true);
  const handleFindByUser = async (createdBy) => {
    try {
      const url = `/api/v1/posts?userId=${createdBy}`;
      const response = await fetch(`${url}`);
      if (response.ok) {
        const findByUserName = await response.json();
        const findByUserNameJson = JSON.parse(findByUserName.payload);

        setUsersPost(findByUserNameJson);
      } else if (!response.ok) {
        throw new Error(console.error);
      }
    } catch (errors) {
      console.error(errors);
    }
  };
  const navigate = useNavigate();
  const handleAuthorCLick = (createdBy) => {
    handleFindByUser(createdBy);
  };
  const handleLoginCLick = (event) => {
    event.preventDefault();
    handleLogin(setOpenLogin, setOpenSignup, setCheckPopup);
  };

  const handleDelete = async (e) => {
    // e.preventDefault();
    const success = await deletePost(_id, token);
    if (success) {
      navigate("/");
    } else if (!success) {
      setDeleteErrors("Delete Fail");
    }
  };
  const handleUpVote = async (e) => {
    // e.preventDefault();
    const success = await upVote(_id, token);
    if (success) {
      setUsersPost((prevValue) =>
        prevValue.map((item) =>
          item._id === _id ? { ...item, ...success } : item
        )
      );

      navigate("/");
    } else if (!success) {
      setUpVoteErrors("UPVOTEFAIL");
    }
  };
  const handleDownVote = async (e) => {
    // e.preventDefault();
    const success = await downVote(_id, token);
    if (success) {
      setUsersPost((prev) =>
        prev.map((item) => (item._id === _id ? { ...item, ...success } : item))
      );
      navigate("/");
    } else if (!success) {
      setDownVoteErrors("DOWNVOTEFAIL");
    }
  };
  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/edit/${_id}`);
  };
  const handleComment = (e) => {
    e.preventDefault();
    setIsCommentWrite(true);
    const queryCommentWrite = isCommentWrite && "?isCommentWrite=true";

    navigate(`/post/${_id}${queryCommentWrite}`);
  };
  useEffect(() => {
    setIsUserVote(checkvote(usersVote, usersData._id, _id));
    // navigate(`/`);
  }, [usersVote]);

  const handleyesvote = () => {
    alert("You have already Voted");
  };
  return (
    <Link to={`/post/${_id}`}>
      <div className="post">
        <div className="post-header">
          <h5
            className="post-author"
            onClick={() => handleAuthorCLick(createdBy)}
          >
            <Link to={`/userpost/${createdBy}`}>
              u/{changeIdToName(idToUsersName, createdBy)}
            </Link>
          </h5>
          <div>
            {!isAuthenticate && (
              <span className="post-join" onClick={handleLoginCLick}>
                Join
              </span>
            )}
            {usersData._id === createdBy ? (
              <div className="post_delete" onClick={handleDelete}>
                <MdOutlineDelete /> Delete
              </div>
            ) : null}
          </div>
        </div>

        <div
          className="post-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className="post-footer">
          <div>
            {usersData._id === createdBy ? (
              <>
                <FaEdit />
                <span onClick={handleEdit}>Edit</span>
              </>
            ) : null}
          </div>
          <div>
            <FaCommentAlt />
            {!isAuthenticate ? (
              <span onClick={handleLoginCLick}>
                <CountComment _id={_id} />
              </span>
            ) : (
              <span onClick={handleComment}>
                <CountComment _id={_id} />

                {/* <Link> Comment</Link> */}
              </span>
            )}
          </div>
          <div>
            {!isAuthenticate ? (
              <span onClick={handleLoginCLick}>
                <BiUpvote />
                {!numberOfUpVote ? 0 : numberOfUpVote}
              </span>
            ) : (
              <>
                {isUserVote ? (
                  <span className="yesvote" onClick={handleyesvote}>
                    {/* <Link>⬆️ </Link> */}
                    <BiUpvote />
                    {!numberOfUpVote ? 0 : numberOfUpVote}
                  </span>
                ) : (
                  <span className="novote" onClick={handleUpVote}>
                    {/* <Link>⬆️ </Link> */}
                    <BiUpvote />
                    {!numberOfUpVote ? 0 : numberOfUpVote}
                  </span>
                )}
              </>
            )}
          </div>

          <UpDownVoteMessage
            getPostData={getPost}
            usersVote={usersVote}
            userId={usersData._id}
            postId={_id}
            handleLoginCLick={handleLoginCLick}
            isAuthenticate={isAuthenticate}
          />

          <div>
            {!isAuthenticate ? (
              <span onClick={handleLoginCLick}>
                {/* ⬇️ */}
                <BiDownvote />
                {!numberOfDownVote ? 0 : numberOfDownVote}
              </span>
            ) : (
              <>
                {isUserVote ? (
                  <span className="yesvote" onClick={handleyesvote}>
                    {/* <Link>⬇️</Link> */}
                    <BiDownvote />
                    {!numberOfDownVote ? 0 : numberOfDownVote}
                  </span>
                ) : (
                  <span className="novote" onClick={handleDownVote}>
                    {/* <Link>⬇️</Link> */}
                    <BiDownvote />
                    {!numberOfDownVote ? 0 : numberOfDownVote}
                  </span>
                )}
              </>
            )}
          </div>
          <div className="post-createdtime">{changeUKTime(createdAt)}</div>
        </div>
        {upVoteErrors && <p className="errors">{upVoteErrors}</p>}
        {deleteErrors && <p className="errors">{deleteErrors}</p>}
        {downVoteErrors && <p className="errors">{downVoteErrors}</p>}
        <hr />
      </div>
    </Link>
  );
}

export default Post;
