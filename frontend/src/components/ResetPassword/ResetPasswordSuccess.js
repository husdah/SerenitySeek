import React from 'react';
import MiddlewarePage from '../MiddlewarePage';

const ResetPasswordSuccess = () => {
  return (
    <MiddlewarePage
      fa="FaCheckCircle"
      title="Password Updated Successfully!"
      pathLink="/Login"
      pathTitle="Login"
    />
  );
};

export default ResetPasswordSuccess;