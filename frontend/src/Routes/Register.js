import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import "../assets/RegisterCss.css";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeForm, setActiveForm] = useState("sign-up");

  const switchToSignIn = () => {
    setActiveForm("sign-in");
    navigate("sign-in");
  };

  const switchToSignUp = () => {
    setActiveForm("sign-up");
    navigate("");
  };

  // Custom logic to determine if a NavLink should have the active style
  const isNavLinkActive = (path) => {
    return location.pathname.endsWith(path);
  };

  return (
    <div className="App">
      <div className="appAside" />
      <div className="appForm">
        <div className="pageSwitcher">
          <NavLink
            to="sign-in"
            className={`pageSwitcherItem ${
              isNavLinkActive("sign-in") && "pageSwitcherItem-active"
            }`}
            onClick={switchToSignIn}
          >
            Sign In
          </NavLink>
          <NavLink
            exact
            to=""
            className={`pageSwitcherItem ${
              !isNavLinkActive("sign-in") && "pageSwitcherItem-active"
            }`}
            onClick={switchToSignUp}
          >
            Sign Up
          </NavLink>
        </div>

        <div className="formTitle">
          <NavLink
            to="sign-in"
            className={`formTitleLink ${
              activeForm === "sign-in" && "formTitleLink-active"
            }`}
            onClick={switchToSignIn}
          >
            Sign In
          </NavLink>{" "}
          or{" "}
          <NavLink
            exact
            to=""
            className={`formTitleLink ${
              activeForm === "sign-up" && "formTitleLink-active"
            }`}
            onClick={switchToSignUp}
          >
            Sign Up
          </NavLink>
        </div>

        {activeForm === "sign-up" ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
};

export default Register;