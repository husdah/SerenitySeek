import React from 'react';
import styles from '../assets/css/success.module.css'
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa"

const ResetPasswordSuccess = () => {
  return (
    <div className={styles.SuccessPage_content}>
        <div className={styles.SuccessPage_symbol}><FaCheckCircle></FaCheckCircle></div>
        <div className={styles.SuccessPage_title}>Password Updated Successfully!</div>
        <div className={styles.SuccessPage_text}>Click Here to <Link className={styles.SuccessPage_linkPath} to="/Login">Login</Link></div>
        
    </div>
  );
};

export default ResetPasswordSuccess;