const downVote = async (postid, token) => {
  // http://localhost:8080/api/v1/posts/65f6066413488d28ee3b12e5/downvote
  // this time i am trying to use .then
  // const url = `/api/v1/posts/${postid}/downvote`;
  // fetch(`${url}`, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json;
  //     } else {
  //       console.error("Failed to downvote post".response.code);
  //       return false;
  //     }
  //   })
  //   .then((responseData) => {
  //     const responseJSON = JSON.parse(responseData.payload);
  //     alert("You DownVote");
  //     return responseJSON;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  try {
    const url = `/api/v1/posts/${postid}/downvote`;
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      const responseJSON = JSON.parse(responseData.payload);
      alert("You DownVote");
      return responseJSON;
    } else {
      console.error("Failed to downvote post".response.code);
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
export default downVote;
