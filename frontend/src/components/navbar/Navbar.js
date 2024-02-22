import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {FaTimes,FaBars, FaUser} from 'react-icons/fa';
import styles from './navbar.module.css';
import styles2 from './dropdown.module.css';
import Logo from '../../assets/images/LogoNoBg.png';
import { useAuthContext } from '../../hooks/useAuthContext'
import {jwtDecode} from 'jwt-decode';

function Navbar(props) {
	const navRef = useRef();
  const { user } = useAuthContext()
  const [FLaccount, setFLaccount] = useState('')

	const showNavbar = () => {
		navRef.current.classList.toggle(
			styles.responsive_nav
		);
	};

  function getInitials(firstName, lastName) {
    // Get the first letter of each name
    const firstInitial = firstName.charAt(0);
    const lastInitial = lastName.charAt(0);
  
    // Concatenate the initials with a space in between
    const initials = `${firstInitial} ${lastInitial}`;
  
    return initials;
  }

  useEffect(() =>{
    if(user && jwtDecode(user.accessToken).user.role === 1){
      const [firstName, lastName] =jwtDecode(user.accessToken).user.username.split(" ");  
      setFLaccount(getInitials(firstName, lastName));
    }
  },[user])

	return (
        <div className={props.nothome ? styles.navbarNotHome : styles.navbar}>
          <header className={styles.header}>
              <img src={Logo} alt="Logo"></img>
              <nav className={styles.nav} ref={navRef}>
                <div className={styles.links}>
                  <Link to="/" className={styles.a}>Home</Link>
                  <Link to="/Package" className={styles.a}>Packages</Link>
                  <Link to="/allBlogs" className={styles.a}>Blogs</Link>
                  <Link to="/contact" className={styles.a}>Contact us</Link>

              <button
                className={`${styles.nav_btn} ${styles.nav_close_btn}`}
                onClick={showNavbar}>
                <FaTimes />
              </button>
              </div>


              <div className={styles.account}>
              {user && (
                  <li className={styles2.dropdown +" " +styles2.dropdown_6}>
                    <div className={styles2.accountCont}>
                      <FaUser className={styles2.fa}/>
                      <label className={styles2.initials}>{FLaccount}</label>
                    </div>
                    <ul className={styles2.dropdown_menu +" " +styles2.dropdown_menu__animated +" " +styles2.dropdown_menu_6}>
                      <li className={styles2.dropdown_item_1}><Link className={styles2.link} to="/userProfile">Profile</Link></li>
                      <li className={styles2.dropdown_item_2}><Link className={styles2.link} to="/blogs">My Blogs</Link></li>
                    </ul>
                  </li>
                )}
                {!user && (
                  <li className={styles2.dropdown +" " +styles2.dropdown_6}>
                    <div className={user ? styles2.accountCont : styles2.accountCont2}>
                      <FaUser className={styles2.fa}/>
                    </div>
                  <ul className={styles2.dropdown_menu +" " +styles2.dropdown_menu__animated +" " +styles2.dropdown_menu_6}>
                  <li className={styles2.dropdown_item_1}><Link className={styles2.link} to="/login">Login</Link></li>
                  <li className={styles2.dropdown_item_2}><Link className={styles2.link} to="/Register">Signup</Link></li>
                  </ul>
                </li>
                )}
              </div>
            </nav>

            <button
              className={styles.nav_btn}
              onClick={showNavbar}>
              <FaBars />
            </button>
          </header>
        </div>
	);
}

export default Navbar;