import React, { useState, useEffect } from 'react';
import '../assets/css/userProfile.css'; // Import your CSS file
import { FaUser, FaAt, FaLock, FaPhone } from "react-icons/fa"
import Profile  from '../assets/images/ProfilePlaceholder.jpg';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';
import validator from 'validator';
import { useUpdateUserInfo } from '../hooks/useUpdateUserInfo';
import { useUpdatePassword } from '../hooks/useUpdatePassword';

const UserProfile = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const { logout } = useLogout()
    const { updateInfo, error, isLoading} = useUpdateUserInfo();
    const { updatePassword, error_pass, isLoading_pass} =useUpdatePassword();
    const { user, dispatch } = useAuthContext()
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                    const { Fname, Lname, email, phoneNumber } = json;
                    setUserName(Fname +" " +Lname);
                    setEmail(email);
                    setPhoneNumber(phoneNumber);

                } else {
                    // Handle the case when user attribute is not present
                    console.error('User attribute is missing in the returned data:', json);
                }
            }
        }
        fetchUserInfo();
    },[])

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

    return (
        <div className='up_Body'>
            <div className={`up_wrapper ${isSignUp ? 'up_animated_signup' : 'up_animated_signin'}`}>
                <div className="up_form_container up_sign_up">
                    <form action="#" onSubmit={handleUpdate}>
                        <div className='up_Header'>
                            <h2>Profile</h2>
                            <button type='button' onClick={handleLogout}  className="up_btn_log">Logout</button>
                        </div>
                        
                        <div className="up_form_group up_ImgContainer">
                            <img className='up_profile' alt='profile' src={Profile}></img>
                        </div>
                        <div className="up_form_group">
                            <input 
                                type="text" 
                                value={userName} 
                                onChange={(e) => {setUserName(e.target.value);}}
                                required
                                className={!isValidUsername ? 'up_formInputError' : ''}
                                onFocus={() => setIsValidUsername(true)}
                            />
                            <i><FaUser></FaUser></i>
                            <label className={!isValidUsername ? 'up_labelError' : ''}>
                                {isValidUsername ? 'username' : 'enter valid username'}
                            </label>
                        </div>
                        <div className="up_form_group">
                            <input 
                                type="email" 
                                required
                                value={email} 
                                onChange={(e) => {setEmail(e.target.value);}}
                                className={!isValidEmail ? 'up_formInputError' : ''}
                                onFocus={() => setIsValidEmail(true)}
                            />
                            <i><FaAt></FaAt></i>
                            <label className={!isValidEmail ? 'up_labelError' : ''}>
                                {isValidEmail ? 'email' : 'enter valid email'}
                            </label>
                        </div>
                        <div className="up_form_group">
                            <input 
                                type="text" 
                                required
                                value={phoneNumber} 
                                onChange={(e) => {setPhoneNumber(e.target.value);}}
                                className={!isValidPhoneNumber ? 'up_formInputError' : ''}
                                onFocus={() => setIsValidPhoneNumber(true)}
                            />
                            <i><FaPhone></FaPhone></i>
                            <label className={!isValidPhoneNumber ? 'up_labelError' : ''}>
                                {isValidPhoneNumber ? 'phone' : 'enter valid phone'}
                            </label>
                        </div>
                        <button type="submit" disabled={isLoading} className="up_btn">
                            Update
                        </button>
                        <div className="up_link">
                            <p>
                                Forget your Password?
                                <span className="up_signin_link" onClick={toggleForm}>
                                    {' '}
                                    reset
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="up_form_container up_sign_in">
                    <form action="#" onSubmit={handleReset}>
                        <h2>Reset Password</h2>
                        <div className="up_form_group">
                            <input 
                                type="password"
                                required
                                value={password} 
                                onChange={(e) => {setPassword(e.target.value);}}
                                className={!isValidPassword ? 'up_formInputError' : ''}
                                onFocus={() => setIsValidPassword(true)}
                             />
                            <i><FaLock></FaLock></i>
                            <label className={!isValidPassword ? 'up_labelError' : ''}>
                                {isValidPassword ? 'password' : 'enter strong password'}
                            </label>
                        </div>
                        <div className="up_form_group">
                            <input 
                                type="password" 
                                required
                                value={confirmPassword} 
                                onChange={(e) => {setConfirmPassword(e.target.value);}}
                                className={!isValidConfirmPassword ? 'up_formInputError' : ''}
                                onFocus={() => setIsValidConfirmPassword(true)}
                            />
                            <i><FaLock></FaLock></i>
                            <label className={!isValidConfirmPassword ? 'up_labelError' : ''}>
                                confirm password
                            </label>
                        </div>
                        {/* <div className="up_forgot_pass">
                            <a href="#">forgot password?</a>
                        </div> */}
                        <button type="submit" className="up_btn">
                            Reset
                        </button>
                        <div className="up_link">
                            <p>
                                View Profile Info?
                                <span className="up_signup_link" onClick={toggleForm}>
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

export default UserProfile; 