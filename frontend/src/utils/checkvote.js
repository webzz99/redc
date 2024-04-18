const checkvote = (array, userId, postId) => {
  if (Array.isArray(array)) {
    const checkingPost = array.filter((item) => item.postId === postId);
    return checkingPost.some((item) => item.createdBy === userId);
  }
  return false;
};

const upordowncheck = (array, userId, postId) => {
  if (Array.isArray) {
    const checkingPost = array.find(
      (item) => item.postId === postId && item.createdBy === userId
    );
    return checkingPost ? checkingPost.type : null;
  }
};
export default checkvote;
export { upordowncheck };
