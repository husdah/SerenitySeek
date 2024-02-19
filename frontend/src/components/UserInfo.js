import React, { useState, useEffect } from 'react';
import styles from '../assets/css/userProfile.module.css'; // Import your CSS file
import { FaUser, FaAt, FaLock, FaPhone, FaCamera, FaTrash } from "react-icons/fa"
import Profile  from '../assets/images/ProfilePlaceholder.jpg';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import validator from 'validator';
import { useUpdateUserInfo } from '../hooks/useUpdateUserInfo';
import { useUpdatePassword } from '../hooks/useUpdatePassword';
import { useUpdateProfileImg } from '../hooks/useUpdateProfileImg';
import { useRemoveProfileImg } from '../hooks/useRemoveUserProfile';

const UserInfo = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const { logout } = useLogout()
    const { updateInfo, isLoading} = useUpdateUserInfo();
    const { updatePassword, isLoading_pass} =useUpdatePassword();
    const { updateProfilePic } = useUpdateProfileImg();
    const { removeProfilePic } = useRemoveProfileImg();
    const { user, dispatch } = useAuthContext()
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePic, setprofilePic] = useState('');


    const [isValidUsername, setIsValidUsername] = useState(true);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  
    const phoneNumberRegex = /^(03|71|70|76|78|79|81)\d{6}$/;

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    const handleLogout= () => {
        logout()
    };

    useEffect(()=>{
        let userId = jwtDecode(user.accessToken).user.id;
        console.log("jwt Decoded:",userId);
        const fetchUserInfo=async()=>{
            const response=await fetch(`http://localhost:4000/api/user/${userId}`
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
                    const { Fname, Lname, email, phoneNumber , profilePic } = json;
                    setUserName(Fname +" " +Lname);
                    setEmail(email);
                    setPhoneNumber(phoneNumber);
                    setprofilePic(profilePic);

                } else {
                    // Handle the case when user attribute is not present
                    console.error('User attribute is missing in the returned data:', json);
                }
            }
        }
        fetchUserInfo();
    },[user, dispatch])

    const handleUpdate = async (e) => {
        e.preventDefault();
      
        // Reset validation states
        setIsValidUsername(true);
        setIsValidPhoneNumber(true);
        setIsValidEmail(true);

        let names = userName.split(' ');
        let Fname = names[0];
        let Lname = names[1];
      
        let emptyValues = [];
        if(names.length !== 2){
            emptyValues.push('username');
            setIsValidUsername(false);
        }
        if (!Fname || validator.isEmpty(Fname) || !validator.isAlpha(Fname)) {
          emptyValues.push('Fname');
          setIsValidUsername(false);
        }
        if (!Lname || validator.isEmpty(Lname) || !validator.isAlpha(Lname)) {
          emptyValues.push('Lname');
          setIsValidUsername(false);
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
        if (emptyValues.length === 0 && isValidEmail && isValidUsername && isValidPhoneNumber) {
          await updateInfo(Fname, Lname, phoneNumber, email);
        }
      };
      
      const handleReset = async (e) => {
        e.preventDefault();
      
        // Reset validation states
        setIsValidPassword(true);
        setIsValidConfirmPassword(true);
      
        let emptyValues = [];
        if (!password || validator.isEmpty(password) || !validator.isStrongPassword(password)) {
          emptyValues.push('password');
          setIsValidPassword(false);
        }
        if (!confirmPassword || validator.isEmpty(confirmPassword) || !validator.equals(confirmPassword, password)) {
          emptyValues.push('confirmPassword');
          setIsValidConfirmPassword(false);
        }
      
        // Check if there are no validation errors before calling signup
        if (emptyValues.length === 0 && isValidPassword && isValidConfirmPassword) {
          await updatePassword(password, confirmPassword);
      
          setPassword('');
          setIsValidPassword(true);
          setConfirmPassword('');
          setIsValidConfirmPassword(true);
        }
      };  

      const handlePicChange = async (e) => {
        // handle file input change
        const file = e.target.files[0];
        
        // Call your function with the file value
        if (file) {
            // Add your logic here, for example:
            console.log("File added:", file);
            const newProfilePicUrl = await updateProfilePic(file);

            // Update the profilePic state with the new URL
            setprofilePic(newProfilePicUrl);
        }
    };

    const handlePicRemove = async (e) => {
        if (profilePic) {
            removeProfilePic();
            setprofilePic(null); 
        }
    };

    return (
        <div className={styles.up_Body}>
            <div className={`${styles.up_wrapper} ${isSignUp ? styles.up_animated_signup : styles.up_animated_signin}`}>
                <div className={`${styles.up_form_container} ${styles.up_sign_up} ${styles.up_form_containerProfile}`}>
                    
                    <form className={styles.up_formHeader +" " +styles.up_form}>
                        <div className={styles.up_Header}>
                            <h2 className={styles.up_h2}>Profile</h2>
                            <button type='button' onClick={handleLogout} className={styles.bn632_hover +" " +styles.bn27 +" " +styles.btn_log}>Logout</button>
                        </div>
                        
                        <div className={styles.profile_pic}>
                            <div className={styles.flex}>
                            <label className={styles._label} htmlFor="file">
                                <span className={styles.profileSpan}><FaCamera></FaCamera></span>
                                <span className={styles.profileSpan}>Change</span>
                            </label>
                            <label className={styles._label2} onClick={handlePicRemove}>
                                <span className={styles.profileSpan}><FaTrash></FaTrash></span>
                                <span className={styles.profileSpan}>Remove</span>
                            </label>
                            </div>
                            <input className={styles.profileInput} id="file" type="file" onChange={handlePicChange}/>
                            <img className={styles.profileImg} alt='profile' src={profilePic ? 'http://localhost:4000/uploads/' +profilePic : Profile} crossOrigin="anonymous" id="output"/>
                        </div>                      
                    </form>


                    <form className={styles.up_form} action="#" onSubmit={handleUpdate}>
                        <div className={styles.up_form_group}>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => { setUserName(e.target.value); }}
                                required
                                className={!isValidUsername ? styles.up_formInputError +" " +styles.up_formInput : styles.up_formInput}
                                onFocus={() => setIsValidUsername(true)}
                            />
                            <i className={styles.up_i}><FaUser /></i>
                            <label className={!isValidUsername ? styles.up_labelError : styles.up_label}>
                                {isValidUsername ? 'username' : 'enter valid username'}
                            </label>
                        </div>
                        <div className={styles.up_form_group}>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); }}
                                className={!isValidEmail ? styles.up_formInputError +" " +styles.up_formInput : styles.up_formInput}
                                onFocus={() => setIsValidEmail(true)}
                            />
                            <i className={styles.up_i}><FaAt /></i>
                            <label className={!isValidEmail ? styles.up_labelError : styles.up_label}>
                                {isValidEmail ? 'email' : 'enter valid email'}
                            </label>
                        </div>
                        <div className={styles.up_form_group}>
                            <input
                                type="text"
                                required
                                value={phoneNumber}
                                onChange={(e) => { setPhoneNumber(e.target.value); }}
                                className={!isValidPhoneNumber ? styles.up_formInputError +" " +styles.up_formInput : styles.up_formInput}
                                onFocus={() => setIsValidPhoneNumber(true)}
                            />
                            <i className={styles.up_i}><FaPhone /></i>
                            <label className={!isValidPhoneNumber ? styles.up_labelError : styles.up_label}>
                                {isValidPhoneNumber ? 'phone' : 'enter valid phone'}
                            </label>
                        </div>
                        <button type="submit" disabled={isLoading} className={styles.bn632_hover +" " +styles.bn27}>
                            Update
                        </button>
                        <div className={styles.up_link}>
                            <p>
                                Forget your Password?
                                <span className={styles.up_signin_link +" " +styles.up_linkClick} onClick={toggleForm}>
                                    {' '}
                                    reset
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
                <div className={`${styles.up_form_container} ${styles.up_sign_in}`}>
                    <form className={styles.up_form} action="#" onSubmit={handleReset}>
                        <h2 className={styles.up_h2}>Reset Password</h2>
                        <div className={styles.up_form_group}>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); }}
                                className={!isValidPassword ? styles.up_formInputError +" " +styles.up_formInput : styles.up_formInput}
                                onFocus={() => setIsValidPassword(true)}
                            />
                            <i className={styles.up_i}><FaLock /></i>
                            <label className={!isValidPassword ? styles.up_labelError : styles.up_label}>
                                {isValidPassword ? 'password' : 'enter strong password'}
                            </label>
                        </div>
                        <div className={styles.up_form_group}>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); }}
                                className={!isValidConfirmPassword ? styles.up_formInputError +" " +styles.up_formInput : styles.up_formInput}
                                onFocus={() => setIsValidConfirmPassword(true)}
                            />
                            <i className={styles.up_i}><FaLock /></i>
                            <label className={!isValidConfirmPassword ? styles.up_labelError : styles.up_label}>
                                confirm password
                            </label>
                        </div>
                        <button type="submit" className={styles.bn632_hover +" " +styles.bn27} disabled={isLoading_pass}>
                            Reset
                        </button>
                        <div className={styles.up_link}>
                            <p>
                                View Profile Info?
                                <span className={styles.up_signup_link +" " +styles.up_linkClick} onClick={toggleForm}>
                                    {' '}
                                    view
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserInfo; 