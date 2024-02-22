import React from 'react';
import styles from './companies.module.css';
import { MdDashboard , MdAnalytics, MdOutlineSettings, MdLogout} from "react-icons/md";
import Logo from '../../assets/images/LogoNoBg.png'
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout'
import {jwtDecode} from 'jwt-decode';
import validator from 'validator';
import { useUpdateAdminPassword } from '../../hooks/useUpdateAdminPassword';
import { FaLock } from "react-icons/fa"

const Settings = () => {

    const { user, dispatch } = useAuthContext();
    const { logout } = useLogout()
    const { updatePassword} = useUpdateAdminPassword();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

    const handleLogout= () => {
        logout()
    };

    const handleReset = async (e) => {
        e.preventDefault();
      
        // Reset validation states
        setIsValidPassword(true);
        setIsValidConfirmPassword(true);
      
        let emptyValues = [];
        if (!password || validator.isEmpty(password) || !validator.isStrongPassword(password)) {
          emptyValues.push('password');
          setIsValidPassword(false);
        }
        if (!confirmPassword || validator.isEmpty(confirmPassword) || !validator.equals(confirmPassword, password)) {
          emptyValues.push('confirmPassword');
          setIsValidConfirmPassword(false);
        }
      
        // Check if there are no validation errors before calling signup
        if (emptyValues.length === 0 && isValidPassword && isValidConfirmPassword) {
          await updatePassword(password, confirmPassword);
      
          setPassword('');
          setIsValidPassword(true);
          setConfirmPassword('');
          setIsValidConfirmPassword(true);
        }
      }; 
    
      
    return (
        <div className={styles.body}>
        <div className={styles.container}>
            <aside className={styles.aside}>
                <div className={styles.toggle}> 
                    <div className={styles.logo}> 
                        <img className={styles.img} src={Logo} alt="Logo" />
                        <h2 className={styles.h2}>Serenity<span className={styles.danger}>Seek</span></h2>
                    </div>
                    <div className={styles.close} id="close-btn"> 
                        <span className="material-icons-sharp">
                            close
                        </span>
                    </div>
                </div>

                <div className={styles.sidebar}> 
                    <a className={styles.a} href="/AdminDashboard">
                        <MdDashboard/>
                        <h3 className={styles.h3}>Dashboard</h3>
                    </a>
                    <a href="/AdminDashboard/companyPayments" className={styles.a}> 
                        <MdAnalytics/>
                        <h3 className={styles.h3}>Payments</h3>
                    </a>
                    <a className={styles.a} href="/AdminDashboard/settings">
                        <MdOutlineSettings/>
                        <h3 className={styles.h3}>Settings</h3>
                    </a>
                    <a className={styles.a} href="#">
                        <MdLogout/>
                        <h3 className={styles.h3} onClick={handleLogout}>Logout</h3>
                    </a>
                </div>
            </aside>

            <main className={styles.main}>
                <h1 className={styles.h1}>Change Password</h1>

                <div>
                    <form  onSubmit={handleReset}>
                        <h2 className={styles.h2}>Reset Password</h2>
                        <div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); }}
                                className={!isValidPassword ? styles.formInputError +" " +styles.formInput : styles.formInput}
                                onFocus={() => setIsValidPassword(true)}
                            />
                            <i className={styles.up_i}><FaLock /></i>
                            <label className={!isValidPassword ? styles.labelError : styles.label}>
                                {isValidPassword ? 'password' : 'enter strong password'}
                            </label>
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); }}
                                className={!isValidConfirmPassword ? styles.formInputError +" " +styles.formInput : styles.formInput}
                                onFocus={() => setIsValidConfirmPassword(true)}
                            />
                            <i className={styles.up_i}><FaLock /></i>
                            <label className={!isValidConfirmPassword ? styles.labelError : styles.label}>
                                confirm password
                            </label>
                        </div>
                        <button type="submit" className={styles.bn632_hover +" " +styles.bn27}>
                            Reset
                        </button>
                    </form>
                </div>
            </main>

            <div className={styles['right_section']}>
                <div className={styles.nav}>
                    <button id="menu_btn">
                        <span className="material_icons_sharp">
                            menu
                        </span>
                    </button>


                    <div className={styles.profile}>
                        <div className={styles.info}>
                            <p className={styles.p}>Hey, <b>{jwtDecode(user.accessToken).user.username}</b></p>
                            <small className="text_muted">Admin</small>
                        </div>
                    </div>
                </div>

                <div className={styles['user_profile']}>
                    <div className={styles.logo}>
                        <img className={styles.img} src={Logo} alt="Logo" />
                        <h2 className={styles.h2}>Serenity Seek</h2>
                        <p className={styles.p}>Travel Agency</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Settings;
