import React from 'react';
import styles from './companies.module.css';
import { MdDashboard , MdAnalytics, MdOutlineSettings, MdLogout} from "react-icons/md";
import Logo from '../../assets/images/LogoNoBg.png'
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';


const ManageCompanies = () => {

    const [companies, setCompanies] = useState(null);
    const { user, dispatch } = useAuthContext();

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
      }, []);

     

      const handleAccept = async (companyId,user) => {
        try {
            const response = await axios.put(`http://localhost:4000/api/companyAccept/${companyId}`,
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
          
          } catch (error) {
            console.error('Error fetching all blogs:', error);
          }
      }
    
      
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
                    <a className={styles.a} href="#">
                        <MdDashboard/>
                        <h3 className={styles.h3}>Dashboard</h3>
                    </a>
                    <a href="#" className={styles.a}> 
                        <MdAnalytics/>
                        <h3 className={styles.h3}>Analytics</h3>
                    </a>
                    <a className={styles.a} href="#">
                        <MdOutlineSettings/>
                        <h3 className={styles.h3}>Settings</h3>
                    </a>
                    <a className={styles.a} href="#">
                        <MdLogout/>
                        <h3 className={styles.h3}>Logout</h3>
                    </a>
                </div>
            </aside>

            <main className={styles.main}>
                <h1 className={styles.h1}>Analytics</h1>
                <div className={styles.analyse}> 
                    <div className={styles.sales}>
                        <div className={styles.status}> 
                            <div className={styles.info}> 
                                <h3 className={styles.h3}>Total Sales</h3>
                                <h1 className={styles.h1}>$65,024</h1>
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
                    <div className={styles.visits}> {/* Use CSS module */}
                        <div className={styles.status}> {/* Use CSS module */}
                            <div className={styles.info}> {/* Use CSS module */}
                                <h3 className={styles.h3}>Site Visit</h3>
                                <h1 className={styles.h1}>24,981</h1>
                            </div>
                            <div className={styles.progresss}> {/* Use CSS module */}
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div className={styles.percentage}> {/* Use CSS module */}
                                    <p className={styles.p}>-48%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.searches}> {/* Use CSS module */}
                        <div className={styles.status}> {/* Use CSS module */}
                            <div className={styles.info}> {/* Use CSS module */}
                                <h3 className={styles.h3}>Searches</h3>
                                <h1 className={styles.h1}>14,147</h1>
                            </div>
                            <div className={styles.progresss}> {/* Use CSS module */}
                                <svg>
                                    <circle cx="38" cy="38" r="36"></circle>
                                </svg>
                                <div className={styles.percentage}> {/* Use CSS module */}
                                    <p className={styles.p}>+21%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['recent_orders']}> {/* Use CSS module */}
                    <h2 className={styles.h2}>Recent Orders</h2>
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
                                    <button className={styles.accbtn} onClick={() => handleAccept(company._id,user)}>accept</button>
                                    <button className={styles.delbtn}>delete</button>
                                </td>
                            </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </main>

            <div className={styles['right_section']}> {/* Use CSS module */}
                <div className={styles.nav}> {/* Use CSS module */}
                    <button id="menu_btn">
                        <span className="material_icons_sharp">
                            menu
                        </span>
                    </button>


                    <div className={styles.profile}> {/* Use CSS module */}
                        <div className={styles.info}> {/* Use CSS module */}
                            <p className={styles.p}>Hey, <b>Reza</b></p>
                            <small className="text_muted">Admin</small>
                        </div>
                    </div>
                </div>

                <div className={styles['user_profile']}> {/* Use CSS module */}
                    <div className={styles.logo}> {/* Use CSS module */}
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
