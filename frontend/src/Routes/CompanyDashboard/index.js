import React from 'react';
import PageContent from '../../components/PageContent';
import SideMenu from '../../components/SideMenu';
import Styles from './CompanyDashboard.module.css';

// Here I set the layout
export default function CompanyDashboard() {
  return (
    <div className={Styles.dashboard_container}>
      <div className={Styles.SideMenuAndPageContent}>
        <SideMenu />
        <PageContent />
      </div>
    </div>
  );
}
