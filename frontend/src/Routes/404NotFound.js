import React from 'react';
import styles from '../assets/css/success.module.css'
import { Link } from 'react-router-dom';
import { FaExclamationCircle } from "react-icons/fa"

const NotFoundPage = () => {
  return (
    <div className={styles.SuccessPage_content}>
        <div className={styles.SuccessPage_symbol}><FaExclamationCircle></FaExclamationCircle></div>
        <div className={styles.SuccessPage_title}>Error 404! Page Not Found!</div>
        <div className={styles.SuccessPage_text}>Click Here to go Back <Link className={styles.SuccessPage_linkPath} to="/">Home</Link></div>
        
    </div>
  );
};

export default NotFoundPage;