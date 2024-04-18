import React, { useEffect, useState } from "react";
import {
  useParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./postpage.css";
import { useAuth } from "../contexts/AuthContext";
import { FaEdit, FaCommentAlt } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import changeUKTime from "../utils/changeUKTimeFormat";
import { handleLogin } from "../component/PopUpManager";
import deletePost from "../api/deletePost";
import upVote from "../api/upVote";
import downVote from "../api/downVote";
import ReactQuill from "react-quill";
import CountComment from "../component/CountComment";
import IndiGetComment from "../component/IndiGetComment";
import { fullCommentPost } from "../api/commentPosts";
import checkvote, { upordowncheck } from "../utils/checkvote";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import UpDownVoteMessage from "../component/UpDownVoteMessage";
import changeIdToName from "../utils/changeIdToName";
function PostPage() {
  const [deleteErrors, setDeleteErrors] = useState("");
  const [upVoteErrors, setUpVoteErrors] = useState("");
  const [downVoteErrors, setDownVoteErrors] = useState("");
  const [isclickComment, setIsCLickComment] = useState(false);
  const [createPostCommentError, setCreatePostCommentError] = useState("");
  const [quillcontent, setQuillContent] = useState("");
  const [clickEdit, setClickEdit] = useState(false);
  const [isUserVote, setIsUserVote] = useState(true);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isCommentWrite, setIsCommentWrite] = useState(
    searchParams.get("isCommentWrite") === "true"
  );

  const { id } = useParams();

  const {
    setOpenLogin,
    setOpenSignup,
    setCheckPopup,
    isAuthenticate,
    token,
    usersData,
    usersPost,
    setUsersPost,
    setUsersComments,
    usersVote,
    idToUsersName,
  } = useAuth();
  const handleAuthorCLick = (author) => {
    // alert("You are the author" + author);
    navigate(`/userpost/${author}`);
  };
  const getPostData = usersPost && usersPost.find((item) => item._id === id);

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

  const handleUpVote = async (e) => {
    e.preventDefault();
    const success = await upVote(getPostData._id, token);
    if (success) {
      setUsersPost((prevValue) =>
        prevValue.map((item) =>
          item._id === getPostData._id ? { ...item, ...success } : item
        )
      );
      navigate(`/`);
    } else if (!success) {
      setUpVoteErrors("UPVOTEFAIL");
    }
  };
  const handleDownVote = async (e) => {
    e.preventDefault();
    const success = await downVote(getPostData._id, token);
    if (success) {
      setUsersPost((prevValue) =>
        prevValue.map((item) =>
          item._id === getPostData._id ? { ...item, ...success } : item
        )
      );
      navigate(`/`);
    } else if (!success) {
      setDownVoteErrors("DOWNVOTEFAIL");
    }
  };

  const handleComment = () => {
    // setIsCLickComment(true);
    setIsCLickComment((prevValue) => !prevValue);
    setIsCommentWrite("");
    setClickEdit(false);
  };

  const handlesubmitcomment = async (id, token, postdata, userData, e) => {
    const bodyPostData = { content: postdata, userId: userData };

    const success = await fullCommentPost(id, token, bodyPostData);
    // console.log(success);
    if (success) {
      setUsersComments((prevValue) => [...prevValue, success]);
      navigate(`/post/${id}`);
      setQuillContent("");
    } else if (!success) {
      setCreatePostCommentError("CREATE POST ERROR");
    }
  };
  useEffect(() => {
    setIsUserVote(checkvote(usersVote, usersData._id, id));
    navigate(`/post/${id}`);
  }, [usersVote]);

  const handleyesvote = () => {
    alert("You Vote it Already");
  };
  return (
    <>
      {getPostData && (
        <>
          <div className="postpage-container">
            <div className="post-header">
              <Link to={`/userpost/${getPostData.createdBy}`}>
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
            <div dangerouslySetInnerHTML={{ __html: getPostData.content }} />
            <div className="post-footer">
              <div>
                {usersData._id === getPostData.createdBy ? (
                  <>
                    <FaEdit />
                    <span onClick={() => console.log("You click edit")}>
                      <Link to={`/edit/${getPostData._id}`}>Edit</Link>
                    </span>
                  </>
                ) : null}
              </div>
              <div>
                <FaCommentAlt />
                {!isAuthenticate ? (
                  <span onClick={handleLoginCLick}>
                    <CountComment _id={getPostData._id} />
                  </span>
                ) : (
                  <span onClick={handleComment}>
                    <CountComment _id={getPostData._id} />
                  </span>
                )}
              </div>
              <div>
                {!isAuthenticate ? (
                  <span onClick={handleLoginCLick}>
                    <BiUpvote />
                    {!getPostData.numberOfUpVote ? (
                      <span>0</span>
                    ) : (
                      getPostData.numberOfUpVote
                    )}
                  </span>
                ) : (
                  <>
                    {isUserVote ? (
                      <span className="yesvote" onClick={handleyesvote}>
                        <Link>
                          <BiUpvote />
                        </Link>
                        {!getPostData.numberOfUpVote ? (
                          <span>0</span>
                        ) : (
                          getPostData.numberOfUpVote
                        )}
                      </span>
                    ) : (
                      <>
                        <span onClick={handleUpVote}>
                          <Link>
                            <BiUpvote />
                          </Link>
                          {!getPostData.numberOfUpVote ? (
                            <span
                              className={`${upordowncheck(
                                usersVote,
                                usersData._id,
                                id
                              )}`}
                            >
                              0
                            </span>
                          ) : (
                            getPostData.numberOfUpVote
                          )}
                        </span>
                      </>
                    )}
                  </>
                )}
              </div>

              <UpDownVoteMessage
                getPostData={getPostData}
                usersVote={usersVote}
                userId={usersData._id}
                postId={id}
              />
              <div>
                {!isAuthenticate ? (
                  <span onClick={handleLoginCLick}>
                    <BiDownvote />
                    {!getPostData.numberOfDownVote ? (
                      <span>0</span>
                    ) : (
                      getPostData.numberOfDownVote
                    )}
                  </span>
                ) : (
                  <>
                    {isUserVote ? (
                      <span className="yesvote" onClick={handleyesvote}>
                        <BiDownvote />
                        {!getPostData.numberOfDownVote ? (
                          <span className="errors">0</span>
                        ) : (
                          getPostData.numberOfDownVote
                        )}
                      </span>
                    ) : (
                      <span onClick={handleDownVote}>
                        <BiDownvote />
                        {!getPostData.numberOfDownVote ? (
                          <span className="errors">0</span>
                        ) : (
                          getPostData.numberOfDownVote
                        )}
                      </span>
                    )}
                  </>
                )}
              </div>
              <div className="post-createdtime">
                {changeUKTime(getPostData.createdAt)}
              </div>
            </div>
            {deleteErrors && <p className="errors">{deleteErrors}</p>}
            {upVoteErrors && <p className="errors">{upVoteErrors}</p>}
            {downVoteErrors && <p className="errors">{downVoteErrors}</p>}
            {createPostCommentError && (
              <p className="errors">{createPostCommentError}</p>
            )}
          </div>
          {(isCommentWrite || isclickComment) && (
            <div className="postcomment-container">
              <h1>New Post Comment</h1>by {usersData && usersData.username}
              <ReactQuill
                theme="snow"
                value={quillcontent}
                onChange={setQuillContent}
              />
              <button
                onClick={() =>
                  handlesubmitcomment(
                    getPostData._id,
                    token,
                    quillcontent,
                    usersData._id
                  )
                }
              >
                Submit Comment
              </button>
            </div>
          )}
          <IndiGetComment
            _id={getPostData._id}
            token={token}
            setIsCommentWrite={setIsCommentWrite}
            clickEdit={clickEdit}
            setClickEdit={setClickEdit}
          />

          <hr />
        </>
      )}
    </>
  );
}

export default PostPage;
