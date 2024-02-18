import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import SignUpForm from "../components/Register/addCompanyForm";
import SignInForm from "../components/Register/addTravelerForm";
import styles from "../assets/css/Register.module.css";  // Import the CSS module

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
    <div className={`${styles.Rg_App}`}>
      <div className={`${styles.Rg_appAside}`} />
      <div className={`${styles.Rg_appForm}`}>
        <div className={`${styles.Rg_pageSwitcher}`}>
          <NavLink
            to="sign-in"
            className={`${styles.Rg_pageSwitcherItem} ${
              isNavLinkActive("sign-in") && styles.Rg_pageSwitcherItemActive
            }`}
            onClick={switchToSignIn}
          >
            Traveler
          </NavLink>
          <NavLink
            exact="true"
            to=""
            className={`${styles.Rg_pageSwitcherItem} ${
              !isNavLinkActive("sign-in") && styles.Rg_pageSwitcherItemActive
            }`}
            onClick={switchToSignUp}
          >
            Company
          </NavLink>
        </div>

        <div className={`${styles.Rg_formTitle}`}>
          <NavLink
            to="sign-in"
            className={`${styles.Rg_formTitleLink} ${
              activeForm === "sign-in" && styles.Rg_formTitleLinkActive
            }`}
            onClick={switchToSignIn}
          >
            Traveler
          </NavLink>{" "}
          or{" "}
          <NavLink
            exact="true"
            to=""
            className={`${styles.Rg_formTitleLink} ${
              activeForm === "sign-up" && styles.Rg_formTitleLinkActive
            }`}
            onClick={switchToSignUp}
          >
            Company
          </NavLink>
        </div>

        {activeForm === "sign-up" ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
};

export default Register;