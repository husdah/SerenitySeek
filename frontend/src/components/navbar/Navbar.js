import {useRef} from 'react';
import {FaTimes,FaBars} from 'react-icons/fa';
import './navbar.css';
const Navbar = () => {
    const navRef =useRef();
    const showNavbar=()=>{
        navRef.current.classList.toggle("responsive_nav");
    }
    return ( 
        <div className="navbar">
            <header>
                <h3>Logo</h3>
                <nav ref={navRef}>
                    <a href="#">Home</a>
                    <a href="#">Packages</a>
                    <a href="#">About us</a>
                    <a href="#">Contact us</a>
                    <button className='nav-btn nav-close-btn' onClick={showNavbar} ><FaTimes/></button>
                    <button className='nav-btn'  onClick={showNavbar}><FaBars/></button>
                </nav>
                <button>Login</button>
            </header>
        </div>
     );
}
 
export default Navbar;