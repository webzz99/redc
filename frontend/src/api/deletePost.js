const deletePost = async (postid, token) => {
  try {
    const response = await fetch(`/api/v1/posts/${postid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("You deleted post");
      return true;
    } else {
      console.error("Failed to delted post", response.code);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
export default deletePost;
