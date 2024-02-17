// TravelerSignUpForm.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';
import validator from 'validator';
import styles from '../../assets/css/Register.module.css'; // Import the Register.module.css

const TravelerSignUpForm = () => {
  const { signup, error, isLoading } = useSignup();
  const [isValidFname, setIsValidFname] = useState(true);
  const [isValidLname, setIsValidLname] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  const phoneNumberRegex = /^(03|71|70|76|78|79|81)\d{6}$/;

  const [state, setState] = useState({
    Fname: '',
    Lname: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSuccess = () => {
    // Clear the form fields
    setState({
      Fname: '',
      Lname: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset validation states
    setIsValidFname(true);
    setIsValidLname(true);
    setIsValidPhoneNumber(true);
    setIsValidEmail(true);
    setIsValidPassword(true);
    setIsValidConfirmPassword(true);

    // Destructure the state to get individual values
    const { Fname, Lname, phoneNumber, email, password, confirmPassword } = state;

    let emptyValues = [];
    if (!Fname || validator.isEmpty(Fname) || !validator.isAlpha(Fname)) {
      emptyValues.push('Fname');
      setIsValidFname(false);
    }
    if (!Lname || validator.isEmpty(Lname) || !validator.isAlpha(Lname)) {
      emptyValues.push('Lname');
      setIsValidLname(false);
    }
    if (!phoneNumber || validator.isEmpty(phoneNumber) || !validator.isMobilePhone(phoneNumber) || !phoneNumberRegex.test(phoneNumber)) {
      emptyValues.push('phoneNumber');
      setIsValidPhoneNumber(false);
    }
    if (!email || validator.isEmpty(email) || !validator.isEmail(email)) {
      emptyValues.push('email');
      setIsValidEmail(false);
    }
    if (!password || validator.isEmpty(password) || !validator.isStrongPassword(password)) {
      emptyValues.push('password');
      setIsValidPassword(false);
    }
    if (!confirmPassword || validator.isEmpty(confirmPassword) || !validator.equals(confirmPassword, password)) {
      emptyValues.push('confirmPassword');
      setIsValidConfirmPassword(false);
    }

    // Check if there are no validation errors before calling signup
    if (emptyValues.length === 0 && isValidEmail && isValidFname && isValidLname && isValidPhoneNumber && isValidPassword && isValidConfirmPassword) {
      await signup(Fname, Lname, phoneNumber, email, password, confirmPassword, handleSuccess);
    }
  };

  return (
    <div className={styles.Rg_formCenter}>
      <form className={styles.Rg_formFields} onSubmit={handleSubmit}>
        <div className={styles.Rg_formField}>
          <label className={styles.Rg_formFieldLabel} htmlFor="Fname">
            First Name
          </label>
          <input
            type="text"
            id="Fname"
            className={!isValidFname ? styles.Rg_formFieldInput_error : styles.Rg_formFieldInput}
            placeholder="Enter your First name"
            name="Fname"
            value={state.Fname}
            onChange={handleChange}
            onFocus={() => setIsValidFname(true)}
          />
          {!isValidFname && <p className={styles.Rg_error}>Please enter a valid First Name.</p>}
        </div>

        <div className={styles.Rg_formField}>
          <label className={styles.Rg_formFieldLabel} htmlFor="Lname">
            Last Name
          </label>
          <input
            type="text"
            id="Lname"
            className={!isValidLname ? styles.Rg_formFieldInput_error : styles.Rg_formFieldInput}
            placeholder="Enter your Last name"
            name="Lname"
            value={state.Lname}
            onChange={handleChange}
            onFocus={() => setIsValidLname(true)}
          />
          {!isValidLname && <p className={styles.Rg_error}>Please enter a valid Last Name.</p>}
        </div>

        <div className={styles.Rg_formField}>
          <label className={styles.Rg_formFieldLabel} htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            className={!isValidPhoneNumber ? styles.Rg_formFieldInput_error : styles.Rg_formFieldInput}
            placeholder="Enter your Phone Number"
            name="phoneNumber"
            value={state.phoneNumber}
            onChange={handleChange}
            onFocus={() => setIsValidPhoneNumber(true)}
          />
          {!isValidPhoneNumber && <p className={styles.Rg_error}>Please enter a valid phone Number.</p>}
        </div>

        <div className={styles.Rg_formField}>
          <label className={styles.Rg_formFieldLabel} htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="email"
            id="email"
            className={!isValidEmail ? styles.Rg_formFieldInput_error : styles.Rg_formFieldInput}
            placeholder="Enter your email"
            name="email"
            value={state.email}
            onChange={handleChange}
            onFocus={() => setIsValidEmail(true)}
          />
          {!isValidEmail && <p className={styles.Rg_error}>Please enter a valid email address.</p>}
        </div>

        <div className={styles.Rg_formField}>
          <label className={styles.Rg_formFieldLabel} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={!isValidPassword ? styles.Rg_formFieldInput_error : styles.Rg_formFieldInput}
            placeholder="Enter your password"
            name="password"
            value={state.password}
            onChange={handleChange}
            onFocus={() => setIsValidPassword(true)}
          />
          {!isValidPassword && <p className={styles.Rg_error}>Please enter a Strong Password.</p>}
        </div>

        <div className={styles.Rg_formField}>
          <label className={styles.Rg_formFieldLabel} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={!isValidConfirmPassword ? styles.Rg_formFieldInput_error : styles.Rg_formFieldInput}
            placeholder="Confirm Your Password"
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
            onFocus={() => setIsValidConfirmPassword(true)}
          />
          {!isValidConfirmPassword && <p className={styles.Rg_error}>Please Confirm Your Password.</p>}
        </div>

        <div className={styles.Rg_formField}>
          <button className={styles.Rg_formFieldButton} disabled={isLoading}>
            Sign Up
          </button>{' '}
          <Link to="/Login" className={styles.Rg_formFieldLink}>
            I'm already a member
          </Link>
        </div>
      </form>
      {error && <div className={styles.Rg_error}>{error}</div>}
    </div>
  );
};

export default TravelerSignUpForm;