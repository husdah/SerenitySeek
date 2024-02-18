import React from 'react';

import ResetPasswordForm from '../components/ResetPassword/ResetPasswordForm';
import ResetPasswordSuccess from '../components/ResetPassword/ResetPasswordSuccess';
import { Route, Routes } from 'react-router-dom';

const ResetPassword = () => {
  return (
    <>
      <Routes>
        <Route path="/:userId/:token" element={<ResetPasswordForm />} />
        <Route path="/success" element={<ResetPasswordSuccess />} />
      </Routes>
    </>
  );
};

export default ResetPassword