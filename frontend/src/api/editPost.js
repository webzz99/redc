const editPost = async (postid, token, updatedData) => {
  try {
    const url = `/api/v1/posts/${postid}`;
    const response = await fetch(`${url}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (response.ok) {
      const responseData = await response.json();
      const responseJSON = JSON.parse(responseData.payload);
      alert("Post Edit");
      return responseJSON;
    } else {
      console.error("Failed to edit post", response.message);
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
export default editPost;
