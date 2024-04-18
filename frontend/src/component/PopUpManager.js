import React from "react";
import Login from "./Login";
import Signup from "./Signup";
export function handleLogin(setOpenLogin, setOpenSignup, setcheckPopup) {
  setOpenLogin(true);
  setcheckPopup(true);
  setOpenSignup(false);
}
function PopUpManager({
  checkpopup,
  openLogin,
  setOpenLogin,
  setOpenSignup,
  setcheckPopup,
  openSignup,
}) {
  return (
    <>
      {checkpopup && (
        <>
          {openLogin && (
            <Login
              setOpenLogin={setOpenLogin}
              setOpenSignup={setOpenSignup}
              setcheckPopup={setcheckPopup}
            />
          )}
          {openSignup && (
            <Signup
              setOpenLogin={setOpenLogin}
              setOpenSignup={setOpenSignup}
              setcheckPopup={setcheckPopup}
            />
          )}
        </>
      )}
    </>
  );
}
export default PopUpManager;
