import React, {useState, useEffect} from "react";
import styles from "../../assets/css/companyProfile.module.css";
import validator from 'validator';
import { useUpdateCompanyInfo } from '../../hooks/useUpdateCompanyInfo';
import { useAuthContext } from '../../hooks/useAuthContext'
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';

function CompanyInfoForm() {
  const { updateConpanyInfo, isLoading} = useUpdateCompanyInfo();
  const { user, dispatch } = useAuthContext()

  const [state, setState] = React.useState({
    Cname: "",
    description: "",
    location: "",
    email: "",
    phoneNumber: ""
  });

  const [isValidName, setIsValidName] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);
  const [isValidLocation, setIsValidLocation] = useState(true);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const phoneNumberRegex = /^(03|71|70|76|78|79|81)\d{6}$/;

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  useEffect(()=>{
    let companyId = jwtDecode(user.accessToken).user.id;
    console.log("jwt Decoded:",companyId);
    const fetchCompanyInfo=async()=>{
        const response=await fetch(`http://localhost:4000/api/company/${companyId}`
        ,{
            method: "GET",
             headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
        },
            credentials: 'include'
        });

        const newAccessToken = response.headers.get('New-Access-Token');
        // Check if a new access token is present
        if (newAccessToken) {
            // Update the access token in LocalStorage
            user.accessToken = newAccessToken;
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({type: 'LOGIN', payload: user})
            console.log('New access token saved:', newAccessToken);
        }
        
        const json=await response.json();
        console.log(json)

        if (json.expired) {
            // Handle expiration of refreshToken on the client side
            window.location.href = 'http://localhost:3000/LogoutAndRedirect';
        }

        if(!response.ok){
            Swal.fire({
                title: 'Warning!',
                text: json.error,
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }

        if(response.ok)
        {
            if (json) {
                // Access attributes
                const { name, description, location, phoneNumber , email } = json;
                setState({
                  Cname: name,
                  description: description,
                  location: location,
                  email: email,
                  phoneNumber: phoneNumber
                })

            } else {
                // Handle the case when user attribute is not present
                console.error('User attribute is missing in the returned data:', json);
            }
        }
    }
    fetchCompanyInfo();
  },[user, dispatch])

  const handleInfoUpdate = async(e) => {
    e.preventDefault();

     // Reset validation states
     setIsValidName(true);
     setIsValidDescription(true);
     setIsValidLocation(true);
     setIsValidPhoneNumber(true);
     setIsValidEmail(true);

    const { Cname, description, location, email, phoneNumber } = state;

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

    // Check if there are no validation errors before calling signup
    if (emptyValues.length === 0 && isValidEmail && isValidName && isValidDescription && isValidLocation && isValidPhoneNumber) {
      
      await updateConpanyInfo(Cname, description, location, email, phoneNumber);
     
    }
  };

  return (
    <div className={styles.form_container +" " +styles.sign_in_container}>
      <form className={styles.form} onSubmit={handleInfoUpdate}>
        <h1 className={styles.h1}>Company Info</h1>
        {/* <div className={styles.social_container}>
          <a href="#" className={styles.a +" " +styles.social}>
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className={styles.a +" " +styles.social}>
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className={styles.a +" " +styles.social}>
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
        <span className={styles.span}>View & Update Info</span>

        <label className={styles.input_container}>
          <input
            type="text"
            placeholder="Company Name"
            name="Cname"
            value={state.Cname}
            onChange={handleChange}
            className={!isValidName ? styles.input_error : styles.input}
            onFocus={() => setIsValidName(true)}
          />
          {!isValidName && <p className={styles.Rg_error}>Please enter Company Name.</p>}
        </label>

        <label className={styles.input_container}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
            className={!isValidEmail ? styles.input_error : styles.input}
            onFocus={() => setIsValidEmail(true)}
          />
          {!isValidEmail && <p className={styles.Rg_error}>Please enter a valid email address.</p>}
        </label>

        <label className={styles.input_container}>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={state.phoneNumber}
            onChange={handleChange}
            onFocus={() => setIsValidPhoneNumber(true)}
            className={!isValidPhoneNumber ? styles.input_error : styles.input}
          />
          {!isValidPhoneNumber && <p className={styles.Rg_error}>Please enter a valid phone Number.</p>}
        </label>

        <label className={styles.input_container}>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={state.location}
            onChange={handleChange}
            onFocus={() => setIsValidLocation(true)}
            className={!isValidLocation ? styles.input_error : styles.input}
          />
          {!isValidLocation && <p className={styles.Rg_error}>Please enter Company Location.</p>}
        </label>

        <label className={styles.input_container}>
          <textarea 
            name="description"
            placeholder="Company Description"
            value={state.description}
            onChange={handleChange}
            onFocus={() => setIsValidDescription(true)}
            className={!isValidDescription ? styles.input_error : styles.input}
          >
          {state.description}
          </textarea>
          {!isValidDescription && <p className={styles.Rg_error}>Please enter Company Description.</p>}
        </label>
      {/*   <a className={styles.a} href="#">Forgot your password?</a> */}
        <button className={styles.button} disabled={isLoading}>Update</button>
      </form>
    </div>
  );
}

export default CompanyInfoForm;