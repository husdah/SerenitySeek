import {useRef} from 'react';
import {FaTimes,FaBars} from 'react-icons/fa';
import styles from './navbar.module.css';
import Logo from '../../assets/images/LogoNoBg.png'
const Navbar = () => {
    const navRef =useRef();
    const showNavbar=()=>{
        navRef.current.classList.toggle("responsive_nav");
    }
    return ( 
        <div className={styles.navbar}>
            <header className={styles.header}>
                {/* <h3>Logo</h3> */}
                <img src={Logo}></img>
                <nav className={styles.nav} ref={navRef}>
                    <a href="#">Home</a>
                    <a href="#">Packages</a>
                    <a href="#">About us</a>
                    <a href="#">Contact us</a>
                    <button className={styles.nav_btn} onClick={showNavbar} ><FaTimes/></button>
                    <button className={styles.nav_btn}  onClick={showNavbar}><FaBars/></button>
                </nav>
                <button>Login</button>
            </header>
        </div>
     );
}
 
export default Navbar;