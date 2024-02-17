// CompanySignupForm.js

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../../hooks/useRegisterCompany';
import validator from 'validator';
import Swal from 'sweetalert2';
import styles from '../../assets/css/Register.module.css'; // Import the Register.module.css

const CompanySignupForm = () => {
  const { signup, error, isLoading } = useSignup();
  const [isValidName, setIsValidName] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [isValidLocation, setIsValidLocation] = useState(true);
  const [isValidLicense, setIsValidLicense] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [hasAgreed, setHasAgreed] = useState(false);

  const licenseFileRef = useRef(null);
  const phoneNumberRegex = /^(03|71|70|76|78|79|81)\d{6}$/;

  const [state, setState] = useState({
    Cname: '',
    description: '',
    location: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSuccess = () => {
    // Clear the form fields
    setState({
      Cname: '',
      description: '',
      location: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    // Clear the file input value
    licenseFileRef.current.value = '';
    setHasAgreed(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset validation states
    setIsValidName(true);
    setIsValidDescription(true);
    setIsValidLocation(true);
    setIsValidPhoneNumber(true);
    setIsValidEmail(true);
    setIsValidPassword(true);
    setIsValidConfirmPassword(true);
    setIsValidLicense(true);

    // Destructure the state to get individual values
    const { Cname, description, location, phoneNumber, email, password, confirmPassword } = state;

    let emptyValues = [];
    if (!Cname || validator.isEmpty(Cname)) {
      emptyValues.push('Cname');
      setIsValidName(false);
    }
    if (!description || validator.isEmpty(description)) {
      emptyValues.push('Description');
      setIsValidDescription(false);
    }
    if (!location || validator.isEmpty(location)) {
      emptyValues.push('location');
      setIsValidLocation(false);
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
    if (!licenseFileRef.current.files[0]) {
      emptyValues.push('licenseFile');
      setIsValidLicense(false);
    }

    // Check if there are no validation errors before calling signup
    if (emptyValues.length === 0 && isValidEmail && isValidName && isValidDescription && isValidLocation && isValidPhoneNumber && isValidPassword && isValidConfirmPassword && isValidLicense) {
      if (hasAgreed) {
        await signup(Cname, description, location, phoneNumber, email, password, confirmPassword, licenseFileRef.current.files[0], handleSuccess);
      } else {
        Swal.fire({
          title: 'Note!',
          text: "You need to agree on our terms of service first",
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  return (
    <div className={styles.Rg_formCenter}>
      <form className={styles.Rg_formFields} onSubmit={handleSubmit}>
        <div className={styles.Rg_formField}>
          <label className={styles.Rg_formFieldLabel} htmlFor="Cname">
            Company Name
          </label>
          <input
            type="text"
            id="Cname"
            className={!isValidName ? styles.Rg_formFieldInput_error : styles.Rg_formFieldInput}
            placeholder="Enter company name"
            name="Cname"
            value={state.Cname}
            onChange={handleChange}
            onFocus={() => setIsValidName(true)}
          />
          {!isValidName && <p className={styles.Rg_error}>Please enter Company Name.</p>}
        </div>

        <div className={styles.Rg_formField}>
          <label className={styles.Rg_formFieldLabel} htmlFor="description">
            About Company
          </label>
          <input
            type="text"
            id="description"
            className={!isValidDescription ? styles.Rg_formFieldInput_error : styles.Rg_formFieldInput}
            placeholder="Enter company description"
            name="description"
            value={state.description}
            onChange={handleChange}
            onFocus={() => setIsValidDescription(true)}
          />
          {!isValidDescription && <p className={styles.Rg_error}>Please enter Company Description.</p>}
        </div>

        <div className={styles.Rg_formField}>
          <label className={styles.Rg_formFieldLabel} htmlFor="location">
            Company Location
          </label>
          <input
            type="text"
            id="location"
            className={!isValidLocation ? styles.Rg_formFieldInput_error : styles.Rg_formFieldInput}
            placeholder="Enter company location"
            name="location"
            value={state.location}
            onChange={handleChange}
            onFocus={() => setIsValidLocation(true)}
          />
          {!isValidLocation && <p className={styles.Rg_error}>Please enter Company Location.</p>}
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
          <label className={styles.Rg_formFieldLabel} htmlFor="licenseFile">
            Company License File
          </label>
          <input
            type="file"
            id="licenseFile"
            className={!isValidLicense ? styles.Rg_formFieldInput_error : styles.Rg_formFieldInput}
            name="licenseFile"
            ref={licenseFileRef}
            onFocus={() => setIsValidLicense(true)}
          />
          {!isValidLicense && <p className={styles.Rg_error}>Please enter company license.</p>}
        </div>

        {/* <div className={styles.Rg_formField}>
          <label className={styles.Rg_formFieldCheckboxLabel}>
            <input
              className={styles.Rg_formFieldCheckbox}
              type="checkbox"
              name="hasAgreed"
              checked={hasAgreed}
              onChange={() => setHasAgreed(!hasAgreed)}
            />
            I agree all statements in{' '}
            <a href="/TermsOfServices" className={styles.Rg_formFieldTermsLink}>
              terms of service
            </a>
          </label>
        </div> */}

        <div className={styles.Rg_formField}>
          <label className={styles.Rg_formFieldCheckboxLabel +" " +styles.check_container}>
            <input
              /* className={styles.Rg_formFieldCheckbox} */
              className={styles.inputChex}
              type="checkbox"
              name="hasAgreed"
              checked={hasAgreed}
              onChange={() => setHasAgreed(!hasAgreed)}
            />
            I agree all statements in{' '}
            <a href="/TermsOfServices" className={styles.Rg_formFieldTermsLink}>
              terms of service
            </a>
            <span className={styles.checkmark}></span>
          </label>
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

export default CompanySignupForm;