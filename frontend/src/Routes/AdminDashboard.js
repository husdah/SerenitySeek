import React from 'react';

import ManageCompanies from '../components/adminDashboard/companies';
import { Route, Routes } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ManageCompanies />} />
      </Routes>
    </>
  );
};

export default AdminDashboard