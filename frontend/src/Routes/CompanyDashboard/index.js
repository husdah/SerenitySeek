import React from 'react';
import AppHeader from '../../components/AppHeader';
import PageContent from "../../components/PageContent";
import SideMenu from "../../components/SideMenu";
import Styles from './CompanyDashboard.module.css'

export default function CompanyDashboard() {
  return (
    <div className={Styles.dashboard_container}>
      <AppHeader />
      <div className={Styles.SideMenuAndPageContent}>
        <SideMenu />
        <PageContent />
      </div>
    </div>
  );
}