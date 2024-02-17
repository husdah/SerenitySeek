import axios from "axios";
import styles from '../../assets/css/chatApp.module.css';

import {jwtDecode} from 'jwt-decode';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useEffect, useState } from "react";

const ChatAuthPage = (props) => {
/*   const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];
    axios
      .post("http://localhost:4000/api/chat/authenticate", { username: value })
      .then((r) => props.onAuth({ ...r.data, secret: value }))
      .catch((e) => console.log("Auth Error", e));
  }; */

  const { user, dispatch } = useAuthContext();
  const [username, setUsername] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];
  
    // Set the headers and credentials for the request
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.accessToken}`
      },
      withCredentials: true  // Include credentials
    };
  
    axios
      .post("http://localhost:4000/api/chat/authenticate", { username: value }, config)
      .then(async (response) => {
        // Check and handle new access token
        const newAccessToken = response.headers['new-access-token'];
        if (newAccessToken) {
          // Update the access token in LocalStorage
          user.accessToken = newAccessToken;
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({type: 'LOGIN', payload: user});
          console.log('New access token saved:', newAccessToken);
        }
  
        // Check and handle expired refresh token
        const json = response.data;
        if (json.expired) {
          // Handle expiration of refreshToken on the client side
          window.location.href = 'http://localhost:3000/LogoutAndRedirect';
        }
        
        // Continue handling the rest of the response data if needed
        props.onAuth({ ...json, secret: value });
      })
      .catch((error) => {
        console.log("Auth Error", error);
      });
  };

  useEffect(() =>{
    const userFullname = jwtDecode(user.accessToken).user.username;
    const id = jwtDecode(user.accessToken).user.id;
    const specialid = userFullname +"_" +id;
    setUsername(specialid);
  },[user])

  return (
    <div className={styles.body}>
        <div className={styles.background}>
        <form onSubmit={onSubmit} className={styles.form_card}>
            <div className={styles.form_title}>Welcome 👋</div>

            <div className={styles.form_subtitle}>This is how your username will be</div>

            <div className={styles.auth}>
            <div className={styles.auth_label}>Username</div>
            <input className={styles.auth_input} value={username} readOnly name="username" />
            <button className={styles.auth_button} type="submit">
                Enter
            </button>
            </div>
        </form>
        </div>
    </div>
  );
};

export default ChatAuthPage;