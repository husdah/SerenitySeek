// EmailVerificationSuccess.js

import React from 'react';
import styles from '../assets/css/success.module.css'
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa"

const EmailVerificationSuccess = () => {
  return (
    <div className={styles.SuccessPage_content}>
        <div className={styles.SuccessPage_symbol}><FaCheckCircle></FaCheckCircle></div>
        <div className={styles.SuccessPage_title}>Email Verified Successfully!</div>
        <div className={styles.SuccessPage_text}>Click Here to <Link className={styles.SuccessPage_linkPath} to="/Login">Login</Link></div>
        
    </div>
  );
};

export default EmailVerificationSuccess;