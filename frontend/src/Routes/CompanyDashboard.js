import React from 'react';
import AppHeader from '../components/AppHeader';
import PageContent from "../components/PageContent";
import SideMenu from "../components/SideMenu";

export default function CompanyDashboard() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
      </div>
    </div>
  );
}