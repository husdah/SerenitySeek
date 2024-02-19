import { Typography } from "antd";
import React, { useState, useEffect } from "react";
import styles from "../assets/css/companyProfile.module.css";
import CompanyInfoForm from "../components/CompanySettings/companyInfoForm";
import CompanyAccountForm from "../components/CompanySettings/companyAccountForm";
import {FaCamera, FaTrash } from "react-icons/fa";
import Profile  from '../assets/images/ProfilePlaceholder.jpg';
import { useUpdateLogo } from '../hooks/useUpdateCompanyLogo';
import { useRemoveLogo } from '../hooks/useRemoveCompanyLogo';
import { useAuthContext } from '../hooks/useAuthContext'
import {jwtDecode} from 'jwt-decode';
import Swal from 'sweetalert2';

export default function CompanyProfile() {
  const { updateLogo } = useUpdateLogo();
  const { removeLogo } = useRemoveLogo();
  const { user, dispatch } = useAuthContext()

  const [type, setType] = useState("signIn");
  const [profilePic, setprofilePic] = useState('');
  const [CompanyName, setCompanyName] = useState('');

  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const handlePicChange = async (e) => {
    // handle file input change
    const file = e.target.files[0];
    
    // Call your function with the file value
    if (file) {
        // Add your logic here, for example:
        console.log("File added:", file);
        const newLogo = await updateLogo(file);

        // Update the profilePic state with the new URL
        setprofilePic(newLogo);
    }
  };

  const handlePicRemove = async (e) => {
      if (profilePic) {
          removeLogo();
          setprofilePic(null); 
      }
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
                const { logo, name } = json;
                setprofilePic(logo);
                setCompanyName(name);

            } else {
                // Handle the case when user attribute is not present
                console.error('User attribute is missing in the returned data:', json);
            }
        }
    }
    fetchCompanyInfo();
  },[user, dispatch])

  const containerClass =
        `${styles.container + (type === "signUp" ? " " +styles.right_panel_active : "")}`;
  return (
    <div>
      <div>
        <Typography.Title level={4}>Setting Page</Typography.Title>
      </div>
      <div className={styles.Body}>
          <div className={styles.App_Body}>
         {/*  <h2 className={styles.h2}>Company Profile Settings</h2> */}
          <div className={containerClass} id="container">
              <CompanyAccountForm />
              <CompanyInfoForm />
              
              <div className={styles.overlay_container}>
              <div className={styles.overlay}>
                  <div className={styles.overlay_panel +" " +styles.overlay_left}>
                  <h1 className={styles.h1}>Account Settings!</h1>
                  <p className={styles.p}>
                      To view & change your company info
                  </p>
                  <button
                      className={styles.button +" " +styles.ghost}
                      id="signIn"
                      onClick={() => handleOnClick("signIn")}
                  >
                      Info
                  </button>
                  </div>
                  <div className={styles.overlay_panel +" " +styles.overlay_right}>

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

                    <h1 className={styles.h1}>{CompanyName}</h1>
                    <p className={styles.p}>Forget your Password?</p>
                    <button
                        className={styles.button +" " +styles.ghost}
                        id="signUp"
                        onClick={() => handleOnClick("signUp")}
                    >
                      Password Reset
                    </button>
                  </div>
              </div>
              </div>
          </div>
          </div>
      </div>
    </div>
  );
}

