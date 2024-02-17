import React  from 'react'
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../../assets/images/LogoNoBg.png'
import { FaFacebook } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.footer_content}>
            <img src={logo} alt="" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni voluptatem quidem perferendis obcaecati atque</p>
            <div className={styles.icons}>
               <Link to="#" className={styles.link_icon}><FaFacebook className={styles.icon} /></Link>
               <Link to="#" className={styles.link_icon}><BiLogoInstagramAlt className={styles.icon} /></Link>
               <Link to="#" className={styles.link_icon}><FaSquareXTwitter className={styles.icon} /></Link>   
            </div>
        </div>
        <div className={styles.footer_content}>
            <h4>Content</h4>
            <li><Link to="#" className={styles.link}>About</Link></li>
            <li><Link to="#" className={styles.link}>Packages</Link></li>
            <li><Link to="#" className={styles.link}>Companies</Link></li>
            <li><Link to="#" className={styles.link}>Logout</Link></li> 
        </div>
        <div className={styles.footer_content}>
            <h4>Content</h4>
            <li><Link to="#" className={styles.link}>About</Link></li>
            <li><Link to="#" className={styles.link}>Packages</Link></li>
            <li><Link to="#" className={styles.link}>Companies</Link></li>
            <li><Link to="#" className={styles.link}>Logout</Link></li> 
        </div>
        <div className={styles.footer_content}>
            <h4>Content</h4>
            <li><Link to="#" className={styles.link}>About</Link></li>
            <li><Link to="#" className={styles.link}>Packages</Link></li>
            <li><Link to="#" className={styles.link}>Companies</Link></li>
            <li><Link to="#" className={styles.link}>Logout</Link></li> 
        </div>
    </div>
  )
}
