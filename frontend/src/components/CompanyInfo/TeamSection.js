import React from 'react'
import styles from '../../assets/css/companyInfo.module.css'
import PlaceHolder from '../../assets/images/ProfilePlaceholder.jpg'
import {FaEnvelope, FaPhone } from "react-icons/fa";

function TeamSection(props) {
    const customers = props.customers
  return (
    <section className={styles.page_content} id="team">
        <header className={styles.section_header}>
        <h2>Customers</h2>
        <p className={styles.lite_text}>Our Top Customers!</p>
        </header>
        <div className={styles.team_main}>
            <section className={styles.team_wrap}>

                {customers && customers.map((customer) => (
                    <article className={styles.bio} key={customer.email}>
                        <div className={styles.person1_pic} id="person1_pic">
                            <img crossOrigin="anonymous" src={customer.profilePic ? 'http://localhost:4000/uploads/' +customer.profilePic : PlaceHolder} alt="ProfilePic" />
                        </div>
                        <div className={styles.bio_text}>
                            <p className={styles.name}>{customer.name}</p>
                            <p className={styles.blurb +" " +styles.lite_text}>It Was An Amazing Tour</p>
                        </div>
                        <div className={styles.sns_wrap}>
                            
                            <a className={styles.sns_btn +" " +styles.btn_googleplus} href={`https://wa.me/+961${customer.phoneNumber}`} target="_blank" rel="author">
                            <FaPhone></FaPhone>
                            </a>
                            
                            <a className={styles.sns_btn +" " +styles.btn_email} href={`mailto:${customer.email}`} rel="author">
                            <FaEnvelope></FaEnvelope>
                            </a>
                        
                        </div>
                    </article>
                ))}

            </section>
        </div>
    </section>
  )
}

export default TeamSection