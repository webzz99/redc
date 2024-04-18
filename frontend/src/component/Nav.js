import React from "react";
import "./Nav.css";
import PopUpManager, { handleLogin } from "./PopUpManager";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

export default function Nav() {
  const {
    // token,
    // decodePayLoad,
    isAuthenticate,
    openLogin,
    setOpenLogin,
    openSignup,
    setOpenSignup,
    checkPopup,
    setCheckPopup,
    logout,
    usersData,
  } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <nav>
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
        <ul>
          {isAuthenticate ? (
            <>
              <li>Hello {usersData.username}</li>
              <li className="create-post">
                <Link to="/createpost">Create Post</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() =>
                  handleLogin(setOpenLogin, setOpenSignup, setCheckPopup)
                }
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>
      <PopUpManager
        checkpopup={checkPopup}
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        setOpenSignup={setOpenSignup}
        setcheckPopup={setCheckPopup}
        openSignup={openSignup}
      />
    </>
  );
}
