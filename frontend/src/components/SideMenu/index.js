import { IoMdLogOut } from "react-icons/io";
import { FiPackage } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { FaHotel } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import Styles from './SideMenu.module.css';
import React from 'react';

export default function SideMenu() {
  const navigate = useNavigate();

  return (
    <div className={Styles.SideMenu}>
      <div className={Styles.sideMenuImage}>
        <img src="https://yt3.ggpht.com/ytc/AMLnZu83ghQ28n1SqADR-RbI2BGYTrqqThAtJbfv9jcq=s176-c-k-c0x00ffffff-no-rj" alt="company logo" />
        <h6>Company name</h6>
      </div>
      <Menu
        className={Styles.SideMenuVertical}
        onClick={(item) => {
          navigate(item.key);
        }}
        items={[
          {
            label: "Dashboard",
            icon: <RxDashboard />,
            key: "/dashboard",
          },
          {
            label: "Package",
            key: "managePackage",
            icon: <FiPackage />,
          },
          {
            label: "Hotel",
            key: "manageHotel",
            icon: <FaHotel />,
          },
          {
            label: "Setting",
            key: "setting",
            icon: <IoSettings />,
          },
          {
            label: "Logout",
            key: "logout",
            icon: <IoMdLogOut />,
          },
        ]}
      ></Menu>
    </div>
  );
}