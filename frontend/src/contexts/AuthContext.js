import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [idToUsersName, setIdToUsersName] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [usersComments, setUsersComments] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [checkPopup, setCheckPopup] = useState(false);
  const [token, setToken] = useState(null);
  const [decodePayLoad, setDecodedPayLoad] = useState(null);
  const [usersPost, setUsersPost] = useState([]);
  const [usersVote, setUsersVote] = useState([]);

  const isAuthenticate =
    token !== null && decodePayLoad !== null && decodePayLoad.user_id !== null;
  const login = (token) => {
    setToken(token);
  };
  const logout = () => {
    // localStorage.removeItem("token");
    setToken(null);
    setUsersData("");
  };

  return (
    <AuthContext.Provider
      value={{
        //when I fetch with backend i have to make sure cookieData to setup
        usersVote,
        setUsersVote,
        idToUsersName,
        setIdToUsersName,
        usersData,
        setUsersData,
        usersPost,
        setUsersPost,
        usersComments,
        setUsersComments,
        token,
        login,
        logout,
        decodePayLoad,
        setDecodedPayLoad,
        isAuthenticate,
        openLogin,
        setOpenLogin,
        openSignup,
        setOpenSignup,
        checkPopup,
        setCheckPopup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
