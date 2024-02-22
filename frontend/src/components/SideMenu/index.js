import React, { useState, useEffect } from 'react';
import { useLogout } from '../../hooks/useLogout';
import { IoMdLogOut, IoIosAddCircle } from 'react-icons/io';
import { FiPackage } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { FaHotel } from 'react-icons/fa6';
import { IoSettings, IoChatbox } from 'react-icons/io5';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '../../hooks/useAuthContext';
import Styles from './SideMenu.module.css';
import comapnyIMG from '../../assets/images/cLogoColored.png';

// Here  when a link is clicked, it calls the navigate function to change the URL, which in turn renders the corresponding component specified in your AppRoutes
export default function SideMenu() {
  const { user }    = useAuthContext();
  const navigate    = useNavigate();
  const { logout }  = useLogout();
  const companyName = jwtDecode(user.accessToken).user.username;
  const companyId   = jwtDecode(user.accessToken).user.id;
  const [ companyLogo, setCompanyLogo ] = useState(null);
  
  /* Display Company Logo */
  useEffect(() => {
    const fetchCompanyLogo = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/company/${companyId}`);
        const companyData     = await response.json();
        if (response.ok) {
          setCompanyLogo(companyData.logo);
        } 
        else {
          console.error('Error fetching company logo:', companyData.error);
        }
      } 
      catch (error) {
        console.error('Error fetching company logo:', error);
      }
    };

    fetchCompanyLogo();
  }, [companyId]);

  /* Logout */
  const handleLogout = () => {
    logout(); 
  };

  /* Define the getItem function */
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  /* Convert values array to items array */
  const items = [
    //getItem("label", "key", icon)
    getItem("Dashboard", "/Dashboard", <RxDashboard />),
    getItem("Package", "packages", <FiPackage />, [
      getItem("Manage", "managePackage", <FiPackage />),
      getItem("Add", "addPackage", <IoIosAddCircle />),
    ]),
    getItem("Hotel", "hotel", <FaHotel />),
    getItem("Setting", "setting", <IoSettings />),
    getItem("Customer Support", "/ChatApp", <IoChatbox />),
    getItem("Logout", "logout", <IoMdLogOut />),
  ];

  return (
    <div className={Styles.SideMenu}>
      <div className={Styles.sideMenuImage}>
        {companyLogo ? (
          <img
            src={`http://localhost:4000/uploads/${companyLogo}`}
            className='company_logo'
            alt='company_logo'
            crossOrigin="anonymous"
          />
        ) : <img src={comapnyIMG} alt="company logo" /> }
        <h3>{ companyName }</h3>
      </div>
      <Menu
        className={Styles.SideMenuVertical}
        mode="inline"
        onClick={(item) => {
          if (item.key === 'logout') {
            handleLogout();
          } 
          else {
            navigate(item.key);
          }
        }}
        items={items}
      />
    </div>
  );
}