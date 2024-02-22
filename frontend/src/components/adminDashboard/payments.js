import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import Logo from '../../assets/images/LogoNoBg.png';
import { MdDashboard, MdAnalytics ,MdOutlineSettings, MdLogout } from 'react-icons/md'; 
import { useLogout } from '../../hooks/useLogout';
import styles from './payment.module.css';
import {jwtDecode} from 'jwt-decode';

const CompanyPayments = () => {
    const [companies, setCompanies] = useState(null);
    const { user, dispatch } = useAuthContext();
    const { logout } = useLogout();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:4000/package/getPayments', {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                    withCredentials: true,
                });
                setCompanies(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);

    const handleLogout = () => {
        logout();
    };

    const handleDelete = async (companyId) => {
        // Your delete company logic goes here
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
                    </div>

                    <div className={styles.sidebar}>
                        <a className={styles.a} href="/AdminDashboard">
                            <MdDashboard />
                            <h3 className={styles.h3}>Dashboard</h3>
                        </a>
                        <a className={styles.a} href="/AdminDashboard/companyPayments">
                            <MdAnalytics />
                            <h3 className={styles.h3}>Payments</h3>
                        </a>
                        <a className={styles.a} href="/AdminDashboard/settings">
                            <MdOutlineSettings />
                            <h3 className={styles.h3}>Settings</h3>
                        </a>
                        <a className={styles.a} href="#">
                            <MdLogout />
                            <h3 className={styles.h3} onClick={handleLogout}>Logout</h3>
                        </a>
                    </div>
                </aside>

                <main className={styles.main}>
                    <h1 className={styles.h1}>Company Payments</h1>
                    <div className={styles.recent_orders}>
                        <h2 className={styles.h2}>Payments Amount</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Amount to Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                            {companies && companies.map(company => (
                            <tr key={company.companyName}>
                                <td>{company.companyName}</td>
                                <td>${company.total}</td>
                            </tr>
                            ))}

                            </tbody>
                        </table>
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

export default CompanyPayments;
