import React from 'react';
import styles from '../../assets/css/companyInfo.module.css'
import cardStyles from '../../assets/css/contactInfoCard.module.css'
import {FaEnvelope, FaPhone, FaMapMarked } from "react-icons/fa";

function ContactSection(props) {
    
  return (
    <section className={styles.page_content} id="contact_form">
        <header className={styles.header_section}>
            <h2>Contact</h2>
            <p className={styles.lite_text}>Drop us a line!</p>
        </header>
        <div className={styles.form_wrap}>    

            <div className={cardStyles.contact_info}>
                <div className={cardStyles.card}>
                    <FaEnvelope className={cardStyles.icon}></FaEnvelope>
                    <div className={cardStyles.card_content}>
                    <h3>Email</h3>
                    <span>{props.email}</span>
                    </div>
                </div>

                <div className={cardStyles.card}>
                    <FaPhone className={cardStyles.icon}></FaPhone>
                    <div className={cardStyles.card_content}>
                    <h3>Phone Number</h3>
                    <span>{props.phoneNumber}</span>
                    </div>
                </div>

                <div className={cardStyles.card}>
                    <FaMapMarked className={cardStyles.icon}></FaMapMarked>
                    <div className={cardStyles.card_content}>
                    <h3>Location</h3>
                    <span>{props.location}</span>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
  )
}

export default ContactSection