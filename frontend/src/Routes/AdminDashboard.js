import React from 'react';

import ManageCompanies from '../components/adminDashboard/companies';
import CompanyPayments from '../components/adminDashboard/payments';
import Settings from '../components/adminDashboard/settings';
import { Route, Routes } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ManageCompanies />} />
        <Route path='/companyPayments' element={<CompanyPayments/>} />
        <Route path='/settings' element={<Settings/>} />
      </Routes>
    </>
  );
};

export default AdminDashboard