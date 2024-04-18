const changeIdToName = (array, id) => {
  if (Array.isArray(array)) {
    const checker = array.filter((item) => item._id === id);
    return checker && checker[0].username;
  } else return "Not Found";
};
export default changeIdToName;
