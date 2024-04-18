export const getAllComments = async () => {
  try {
    const url = `/api/v1/getallcomments`;
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      const responseJSON = JSON.parse(responseData.payload);
      return responseJSON;
    } else {
      console.error("Failed to get comment", response.message);
    }
  } catch (error) {
    console.error(error);
  }
};
export const fullCommentPost = async (postId, token, updatedData) => {
  try {
    const url = `/api/v1/comments/${postId}`;
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (response.ok) {
      const responseData = await response.json();
      const responseJSON = JSON.parse(responseData.payload);
      alert("Post Comment");
      return responseJSON;
    } else {
      console.error("Faield to comment Comment", response.message);
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export const commentsGet = async (postid) => {
  try {
    const url = `/api/v1/comments?postId=${postid}`;
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      const responseJSON = JSON.parse(responseData.payload);
      return responseJSON;
    } else {
      console.error("Failed to number comment", response.message);
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
export const editCommentPatch = async (postid, token, updatePost) => {
  try {
    const url = `/api/v1/comments/${postid}`;
    const response = await fetch(`${url}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePost),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("This is backendapi" + JSON.stringify(responseData));
      const responseJSON = JSON.parse(responseData.payload);
      alert("Comment Edit");
      return responseJSON;
    } else {
      console.error("Failed to edit Commment", response.message);
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
export const deleteComment = async (postId, token) => {
  try {
    const url = `/api/v1/comments/${postId}`;
    console.log("This is my url from backend" + url);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("This is response" + JSON.stringify(response));
    if (response.ok) {
      alert("You delete Comment");
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("faield to delete comment", response.message);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
