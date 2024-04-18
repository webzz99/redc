import React from "react";

function AuthenticatePopUpHeader({
  setOpenLogin,
  setOpenSignup,
  setcheckPopup,
}) {
  const handleleft = () => {
    setOpenLogin((prevValue) => !prevValue);
    setOpenSignup((prevValue) => !prevValue);
  };
  const handleright = () => {
    setcheckPopup(false);
  };
  return (
    <div className="authenticate-pop-up-header">
      <div className="header-left" onClick={handleleft}>
        ⬅️
      </div>
      <div className="header-right" onClick={handleright}>
        ✖️
      </div>
    </div>
  );
}

export default AuthenticatePopUpHeader;
