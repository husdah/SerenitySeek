import React from 'react';
import MiddlewarePage from '../components/MiddlewarePage';

const NotFoundPage = () => {
  return (
    <MiddlewarePage
      fa="FaExclamationCircle"
      title="Error 404! Page Not Found!"
      pathLink="/"
      pathTitle="go Back Home"
    />
  );
};

export default NotFoundPage;