import { FaBell } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Badge, Space } from "antd";
import Styles from './AppHeader.module.css';
import React from 'react';

export default function AppHeader() {
  return (
    <div className={Styles.AppHeader}>
      <h1>Welcome Zeinab</h1>
      <Space>
        <Badge count={10} dot>
          <IoMdMail />
        </Badge>
        <Badge count={20}>
          <FaBell />
        </Badge>
      </Space>
    </div>
  );
}