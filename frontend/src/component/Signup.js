import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthenticatePopUpHeader from "./AuthenticatePopUpHeader";
function Signup({ setOpenLogin, setOpenSignup, setcheckPopup }) {
  const handlelogin = () => {
    setOpenSignup(false);
    setOpenLogin(true);
  };
  const [registerError, setRegisterError] = useState("");
  const validationSchema = Yup.object({
    username: Yup.string()
      .email("username should be email address")
      .required("Please fill out this field"),
    password1: Yup.string()
      .required("Please fill out this field")
      .test(
        "password-length",
        "Password must contain at least 4 characters with at least one letter",
        (value) => {
          return /^(?=.*[a-zA-Z]).{4,}$/.test(value);
        }
      ),
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), null], "Passwords must match")
      .required("Please fill out this field")
      .test(
        "password-length",
        "Password must contain at least 4 characters with at least one letter",
        (value) => {
          return /^(?=.*[a-zA-Z]).{4,}$/.test(value);
        }
      ),
    name: Yup.string()
      .required("Please fill out this field")
      .matches(/^[a-zA-Z]+$/, "Name must contain only characters")
      .min(3, "Name must be at lease 3 characters"),
  });

  const handleSubmit = async (values) => {
    //filter values accepting of backend
    const formData = {
      username: values.username,
      password: values.password2,
      name: values.name,
    };
    try {
      const response = await fetch(`/api/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.code === "FAILED") {
          setRegisterError(responseData.message);
        } else if (responseData.code === "OK") {
          alert("Register Successful plese login with your details");
          setOpenLogin(true);
          setOpenSignup(false);
        }
      } else if (!response.ok) {
        setRegisterError("Register Error");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password1: "",
      password2: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div className="authenticate-pop-up">
      <AuthenticatePopUpHeader
        setOpenLogin={setOpenLogin}
        setOpenSignup={setOpenSignup}
        setcheckPopup={setcheckPopup}
      />
      <form className="signupform" onSubmit={formik.handleSubmit}>
        <h1>Signup</h1>
        <div
          className={`input-container ${
            formik.touched.username && formik.errors.username ? "error" : ""
          }`}
        >
          <input
            type="text"
            name="username"
            placeholder="username *"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="errors">{formik.errors.username}</div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            formik.touched.password1 && formik.errors.password1 ? "error" : ""
          }`}
        >
          <input
            type="password"
            name="password1"
            placeholder="password *"
            value={formik.values.password1}
            onChange={formik.handleChange}
          />
          {formik.touched.password1 && formik.errors.password1 ? (
            <div className="errors">{formik.errors.password1}</div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            formik.touched.password2 && formik.errors.password2 ? "error" : ""
          }`}
        >
          <input
            type="password"
            name="password2"
            placeholder="repeated password *"
            value={formik.values.password2}
            onChange={formik.handleChange}
          />
          {formik.touched.password2 && formik.errors.password2 ? (
            <div className="errors">{formik.errors.password2}</div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            formik.touched.name && formik.errors.name ? "error" : ""
          }`}
        >
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="errors">{formik.errors.name}</div>
          ) : null}
        </div>
        {registerError && <div className="errors">{registerError}</div>}
        <p className="checking-signup">
          Already a Member?
          <button onClick={handlelogin}>Login</button>
        </p>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
