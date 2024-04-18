import React, { useState } from "react";
import "./authenticate.css";
import { useFormik } from "formik";
import * as Yup from "yup";

import { jwtDecode } from "jwt-decode";

import AuthenticatePopUpHeader from "./AuthenticatePopUpHeader";
import { useAuth } from "../contexts/AuthContext";
function Login({ setOpenLogin, setOpenSignup, setcheckPopup }) {
  const { login, setCheckPopup, setDecodedPayLoad, setUsersData } = useAuth();
  const [loginError, setLoginError] = useState(false);
  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Invalid Email address")
      .required("Please fill out this field"),
    password: Yup.string().required("Please fill out this field"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.payload;
        if (token) {
          login(token);
          const decoded = jwtDecode(token);
          setDecodedPayLoad(decoded);
          setCheckPopup(false);
          handleUserData(token, decoded, setUsersData);
        } else if (!token) {
          setLoginError(true);
        }
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const handleUserData = async (token, decodePayLoad, setUserData) => {
    if (decodePayLoad && decodePayLoad.user_id) {
      try {
        const response = await fetch(
          `/api/v1/users/${decodePayLoad.user_id}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          const payload = JSON.parse(userData.payload);
          setUserData(payload);
        } else {
          console.error("Failed to fetch userData", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleregister = () => {
    setOpenLogin(false);
    setOpenSignup(true);
  };
  return (
    <div className="authenticate-pop-up">
      <AuthenticatePopUpHeader
        setOpenLogin={setOpenLogin}
        setOpenSignup={setOpenSignup}
        setcheckPopup={setcheckPopup}
      />
      <form className="loginform" onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <div
          className={`input-container ${
            formik.touched.username && formik.errors.username ? "error" : ""
          }`}
        >
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="Username *"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="errors">{formik.errors.username}</div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            formik.touched.password && formik.errors.password ? "error" : ""
          }`}
        >
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="password *"
          />
          {loginError && (
            <div className="errors">Please Check your username password</div>
          )}
          {formik.touched.password && formik.errors.password ? (
            <div className="errors">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">Login</button>
        <button onClick={handleregister}>Register</button>
        {/* <button>Forgot Password</button> */}
      </form>
    </div>
  );
}

export default Login;
