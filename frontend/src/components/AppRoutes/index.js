import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../../pages/DashboardPage';
import PackagePage from '../../pages/PackagePage';
import AddPackage from '../../pages/AddPackage';
import ManageHotel from '../../pages/ManageHotel';
import SettingPage from '../../pages/SettingPage';

// Defines the routes for different pages, mapping each URL path to the corresponding component to render
function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<DashboardPage />} />
      <Route path="managePackage" element={<PackagePage />} />
      <Route path="addPackage" element={<AddPackage />} />
      <Route path="hotel" element={<ManageHotel />} />
      <Route path="setting" element={<SettingPage />} />
    </Routes>
  );
}

export default AppRoutes;