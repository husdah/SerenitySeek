import React from 'react';
import styles from './companies.module.css';
import { MdDashboard , MdAnalytics, MdOutlineSettings, MdLogout} from "react-icons/md";
import Logo from '../../assets/images/LogoNoBg.png'
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLogout } from '../../hooks/useLogout'
import {jwtDecode} from 'jwt-decode';

const ManageCompanies = () => {

    const [companies, setCompanies] = useState(null);
    const { user, dispatch } = useAuthContext();
    const { logout } = useLogout()
    const [analytics, setAnalytics] = useState({
        companiesNb: 0,
        travelersNb: 0,
        packagesNb: 0
    })

    useEffect(() => { 
        const fetchCompanies = async () => {
            try {
              const response = await axios.get('http://localhost:4000/api/companiesRequest',
              { headers: {
                  Authorization: `Bearer ${user.accessToken}`,
                  },
                  withCredentials: true,
                });
    
                const newAccessToken = response.headers['new-access-token'];
            if (newAccessToken) {
    
              // Update the access token in LocalStorage
              user.accessToken = newAccessToken;
              localStorage.setItem('user', JSON.stringify(user));
              dispatch({type: 'LOGIN', payload: user});
              console.log('New access token saved:', newAccessToken);
    
            }
    
              setCompanies(response.data);
            } catch (error) {
              console.error('Error fetching all blogs:', error);
            }
          };

        fetchCompanies();


        const getAnalytics = async () =>{
            try{
                const response = await fetch(`http://localhost:4000/api/analytics`, {
                    method: "GET",
                    headers: { 
                        'Authorization': `Bearer ${user.accessToken}`
                    },
                    credentials: 'include'
                })
    
                const newAccessToken = response.headers.get('New-Access-Token');
                // Check if a new access token is present
                if (newAccessToken) {
                    // Update the access token in LocalStorage
                    user.accessToken = newAccessToken;
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch({type: 'LOGIN', payload: user})
                    console.log('New access token saved:', newAccessToken);
                }
    
                const json = await response.json();
                if (json.expired) {
                    // Handle expiration of refreshToken on the client side
                    window.location.href = 'http://localhost:3000/LogoutAndRedirect';
                }
        
                console.log(json.analytics)
                if(response.ok){
                    setAnalytics({
                        companiesNb: json.analytics.companies,
                        travelersNb: json.analytics.travelers,
                        packagesNb: json.analytics.packages
                    })
                }
        
            }catch(error){
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
          }

          getAnalytics();
      }, []);

      const handleAccept = async (companyId) =>{
        try{
            const response = await fetch(`http://localhost:4000/api/companyAccept/${companyId}`, {
                method: "PUT",
                headers: { 
                    'Authorization': `Bearer ${user.accessToken}`
                },
                credentials: 'include'
            })

            const newAccessToken = response.headers.get('New-Access-Token');
            // Check if a new access token is present
            if (newAccessToken) {
                // Update the access token in LocalStorage
                user.accessToken = newAccessToken;
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({type: 'LOGIN', payload: user})
                console.log('New access token saved:', newAccessToken);
            }

            const json = await response.json();
            if (json.expired) {
                // Handle expiration of refreshToken on the client side
                window.location.href = 'http://localhost:3000/LogoutAndRedirect';
            }
    
            if(response.ok){
                const confirmResult = await Swal.fire({
                    title: 'Success!',
                    text: 'Company Accepted Successfully',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'ok',
                });
            
                // Check if the user clicked the confirmation button
                if (confirmResult.isConfirmed) {
                    window.location.reload();
                }
            }
    
        }catch(error){
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
      }

      const handleDelete = async (companyId) =>{
        const confirmResult = await Swal.fire({
            title: 'Confirmation',
            text: 'Are you sure you want to delete this company?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });
    
        // Check if the user clicked the confirmation button
        if (confirmResult.isConfirmed) {
            try{
                const response = await fetch(`http://localhost:4000/api/company/${companyId}`, {
                    method: "Delete",
                    headers: { 
                        'Authorization': `Bearer ${user.accessToken}`
                    },
                    credentials: 'include'
                })
    
                const newAccessToken = response.headers.get('New-Access-Token');
                // Check if a new access token is present
                if (newAccessToken) {
                    // Update the access token in LocalStorage
                    user.accessToken = newAccessToken;
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch({type: 'LOGIN', payload: user})
                    console.log('New access token saved:', newAccessToken);
                }
    
                const json = await response.json();
                if (json.expired) {
                    // Handle expiration of refreshToken on the client side
                    window.location.href = 'http://localhost:3000/LogoutAndRedirect';
                }
        
                if(response.ok){
                    Swal.fire({
                        title: 'Success!',
                        text: 'Company Deleted Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });

                    window.location.reload();
                }
        
            }catch(error){
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
      }

    const handleLogout= () => {
        logout()
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
                <h1 className={styles.h1}>Analytics</h1>
                <div className={styles.analyse}> 
                    <div className={styles.sales}>
                        <div className={styles.status}> 
                            <div className={styles.info}> 
                                <h3 className={styles.h3}>Companies</h3>
                                <h1 className={styles.h1}>{analytics.companiesNb}</h1>
                            </div>
                            <div className={styles.progresss}> 
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div className={styles.percentage}> 
                                    <p className={styles.p}>+81%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.visits}>
                        <div className={styles.status}>
                            <div className={styles.info}>
                                <h3 className={styles.h3}>Travelers</h3>
                                <h1 className={styles.h1}>{analytics.travelersNb}</h1>
                            </div>
                            <div className={styles.progresss}>
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div className={styles.percentage}>
                                    <p className={styles.p}>-48%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.searches}>
                        <div className={styles.status}>
                            <div className={styles.info}>
                                <h3 className={styles.h3}>Packages</h3>
                                <h1 className={styles.h1}>{analytics.packagesNb}</h1>
                            </div>
                            <div className={styles.progresss}>
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div className={styles.percentage}>
                                    <p className={styles.p}>+21%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={styles['recent_orders']}>
                    <h2 className={styles.h2}>Companies' Requests</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Company Name</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>License</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies && companies.map(company => (
                                <tr key={company.name}>
                                <td>{company.name}</td>
                                <td>{company.description}</td>
                                <td>{company.location}</td>
                                <td><a crossOrigin="anonymous" href={`http://localhost:4000/uploads/${company.license}`} download="license">Download</a></td>
                                <td className={styles.primary}>
                                    <button className={styles.accbtn} onClick={() => handleAccept(company._id)}>accept</button>
                                    <button className={styles.delbtn} onClick={() => handleDelete(company._id)}>delete</button>
                                </td>
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

export default ManageCompanies;
