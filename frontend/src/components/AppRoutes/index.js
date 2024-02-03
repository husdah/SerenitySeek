import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../../pages/DashboardPage";
import PackagePage from "../../pages/PackagePage";
import HotelPage from "../../pages/HotelPage";
import SettingPage from '../../pages/SettingPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<DashboardPage />} />
      <Route path="managePackage" element={<PackagePage />} />
      <Route path="manageHotel" element={<HotelPage />} />
      <Route path="setting" element={<SettingPage />} />
    </Routes>
  );
}

export default AppRoutes;