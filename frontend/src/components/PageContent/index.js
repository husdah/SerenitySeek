import React from 'react';
import AppRoutes from '../AppRoutes';
import Styles from './PageContent.module.css';

// Rendering the AppRoutes, which will render the appropriate component based on the URL path.
export default function index() {
  return (
    <div className={Styles.PageContent}>
      <AppRoutes />
    </div>
  )
}

