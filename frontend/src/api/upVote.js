const upVote = async (postid, token) => {
  try {
    const url = `/api/v1/posts/${postid}/upvote`;
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      const responseJSON = JSON.parse(responseData.payload);
      alert("You upvote");
      return responseJSON;
    } else {
      console.error("Failed to upvote post", response.code);
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
export default upVote;
