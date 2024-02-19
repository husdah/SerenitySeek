import React from 'react';
import Styles from'./DashboardWidget.module.css';

function DashboardWidget({ title, number, imageSrc, className  }) {
  return (
    <div className={`${Styles.dashboard_widget} ${className}`}>
      <div className={Styles.subContainer_content}>
        <p>{title}</p>
        <span>{number}</span>
      </div>
      <div className={Styles.subContainer_image}>
        <img src={imageSrc} alt='airplane' />
      </div>
    </div>
  );
}

export default DashboardWidget;