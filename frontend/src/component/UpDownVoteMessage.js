import React from "react";
import { upordowncheck } from "../utils/checkvote";
function UpDownVoteMessage({
  getPostData,
  usersVote,
  userId,
  postId,
  isAuthenticate,
  handleLoginCLick,
}) {
  return (
    <>
      {upordowncheck(usersVote, userId, postId) ? (
        <div className={`${upordowncheck(usersVote, userId, postId)}`}>
          {`You have voted "${upordowncheck(
            usersVote,
            userId,
            postId
          )}" and Vote Count `}
          {!getPostData ? (
            <span className="errors">0</span>
          ) : (
            Number(
              getPostData.numberOfUpVote ? getPostData.numberOfUpVote : 0
            ) -
            Number(
              getPostData.numberOfDownVote ? getPostData.numberOfDownVote : 0
            )
          )}
          {` got it`}
        </div>
      ) : (
        <>
          {!isAuthenticate ? (
            <div onClick={handleLoginCLick} className="errors">
              Don't Vote Yet!
            </div>
          ) : (
            <div>Don't Vote Yet!</div>
          )}
        </>
      )}
    </>
  );
}

export default UpDownVoteMessage;
