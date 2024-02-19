import React from 'react';
import styles from '../assets/css/success.module.css'
import { Link } from 'react-router-dom';

import { FaExclamationCircle } from "react-icons/fa"
import { FaCheckCircle } from "react-icons/fa"

const MiddlewarePage = (props) => {
  return (
    <div className={styles.SuccessPage_content}>
        <div className={styles.SuccessPage_symbol}>
            {props.fa === 'FaCheckCircle' ? <FaCheckCircle></FaCheckCircle> : <FaExclamationCircle></FaExclamationCircle>}
        </div>
        <div className={styles.SuccessPage_title}>{props.title}</div>
        <div className={styles.SuccessPage_text}>Click Here to <Link className={styles.SuccessPage_linkPath} to={props.pathLink}>{props.pathTitle}</Link></div>
        
    </div>
  );
};

export default MiddlewarePage;