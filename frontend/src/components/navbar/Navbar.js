import {useRef} from 'react';
import {Link} from 'react-router-dom';
import {FaTimes,FaBars} from 'react-icons/fa';
import styles from './navbar.module.css';
import Logo from '../../assets/images/LogoNoBg.png';

function Navbar(props) {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
        <div className={props.nothome ? styles.navbarNotHome : styles.navbar}>
          <header className={styles.header}>
            <img src={Logo} alt="Logo"></img>
                  <nav className={styles.nav} ref={navRef}>
                      <Link to="/" className={styles.a}>Home</Link>
                      <Link to="/Package" className={styles.a}>Packages</Link>
                      <Link to="/allBlogs" className={styles.a}>Blogs</Link>
                      <Link to="/contact" className={styles.a}>Contact us</Link>

              <button
                className={`${styles.nav_btn} ${styles.nav_close_btn}`}
                onClick={showNavbar}>
                <FaTimes />
              </button>
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