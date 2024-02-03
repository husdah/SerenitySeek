import React from 'react'
import AppRoutes from '../AppRoutes';
import Styles from './PageContent.module.css'

export default function index() {
  return (
    <div className={Styles.PageContent}>
      <AppRoutes />
    </div>
  )
}

