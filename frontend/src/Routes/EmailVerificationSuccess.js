// EmailVerificationSuccess.js

import React from 'react';
import MiddlewarePage from '../components/MiddlewarePage';

const EmailVerificationSuccess = () => {
  return (
    <MiddlewarePage
      fa="FaCheckCircle"
      title="Email Verified Successfully!"
      pathLink="/Login"
      pathTitle="Login"
    />
  );
};

export default EmailVerificationSuccess;