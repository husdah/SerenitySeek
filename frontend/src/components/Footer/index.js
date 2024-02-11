import React from 'react';
import { MdEmail, MdOutlinePlace } from 'react-icons/md';
import { FaFacebookF } from 'react-icons/fa6';
import { FaPhone, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Styles from './Footer.module.css'

export default function Footer() {
  return (
    <div className={Styles.footer}>
        <div className={Styles.footer_section}>
            <div className={Styles.column}>
                <img src="" alt="SS-logo" className={Styles.travel_logo} />
                <p className={Styles.footerParag}>
                    Explore the world with confidence, guided by our passion for creating memories that last a lifetime.
                </p>
                <div className={Styles.column_social_media}>
                    <a href="/#" ><FaFacebookF className={Styles.facebook} /></a>
                    <a href="/#" ><FaInstagram className={Styles.instagram} /></a>
                    <a href="/#" ><FaLinkedinIn className={Styles.linkedin}/></a>
                </div>
            </div>
            <div className={Styles.column_navigation}>
                <h4> Quick Link </h4>
                <a href="/#"> Home </a>
                <a href="/#"> About Us </a>
                <a href="/#"> Services </a>

            </div>
            <div className={Styles.column_link}>
                <h4> Quick Link </h4>
                <a href="/#"> Contact Us </a>
                <a href="/#"> Packages </a>
                <a href="/#"> Companies </a>
            </div>
            <div className={Styles.column_support}>
                <h4> Get Support </h4>
                <a href="https://www.google.com/maps/place/Beyrouth/@33.8892114,35.4630826,13z/data=!3m1!4b1!4m6!3m5!1s0x151f17215880a78f:0x729182bae99836b4!8m2!3d33.8937913!4d35.5017767!16zL20vMDlianY?entry=ttu" rel="noreferrer" target="_blank"><MdOutlinePlace className={Styles.address}/><span> Beirut, Lebanon </span></a>
                <a href="mailto:serenityseek2024@gmail.com"><MdEmail className={Styles.email} /><span> serenityseek2024@gmail.com </span></a>
                <a href="tel:0096170980354"><FaPhone className={Styles.phone} /><span> +961 70 980354 </span></a>
                
            </div>
        </div>
        <div className={Styles.footer_copyright}>
            <p>
                @{new Date().getFullYear()} SerenitySeek Developers. All right reserved.
            </p>
        </div>
    </div>
  )
}
