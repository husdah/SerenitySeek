import React  from 'react'
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../../assets/images/LogoNoBg.png'
import { FaFacebook, FaPhone } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { FaSquareXTwitter, FaLocationDot } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.footer_content}>
            <img src={logo} alt="" />
            <p>Serenity Seek: Your ultimate destination for revolutionizing corporate travel with seamless solutions.</p>
            <div className={styles.icons}>
               <Link to="#" className={styles.link_icon}><FaFacebook className={styles.icon} /></Link>
               <Link to="#" className={styles.link_icon}><BiLogoInstagramAlt className={styles.icon} /></Link>
               <Link to="#" className={styles.link_icon}><FaSquareXTwitter className={styles.icon} /></Link>   
            </div>
        </div>
        <div className={styles.footer_content}>
            <h4>Quick Links</h4>
            <li><Link to="/" className={styles.link}>Home</Link></li>
            <li><Link to="/Package" className={styles.link}>Packages</Link></li>
            <li><Link to="/allBlogs" className={styles.link}>Blogs</Link></li>
            <li><Link to="/TermsOfServices" className={styles.link}>Terms of Services</Link></li> 
        </div>
        <div className={styles.footer_content}>
            <h4>Join Us</h4>
            <li><Link to="/Login" className={styles.link}>Login</Link></li>
            <li><Link to="/Register" className={styles.link}>Register</Link></li>
            <li><Link to="/chatApp" className={styles.link}>Chat Community</Link></li>
            <li><Link to="/LogoutAndRedirect" className={styles.link}>Logout</Link></li> 
        </div>
        <div className={styles.footer_content}>
            <h4>Keep In Touch</h4>
            <li><Link to="/contact" className={styles.link}>Contact Us</Link></li>
            <li className={styles.link}><FaLocationDot className={styles.icon} /> Nabatieh</li>
            <li className={styles.link}><FaPhone className={styles.icon} /> +961/ 123456</li>
            <li className={styles.link}><IoMdMail className={styles.icon} /> serenityseek2024@gmail.com</li> 
        </div>
    </div>
  )
}
