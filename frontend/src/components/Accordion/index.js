import React, { useState } from 'react';
import Styles from '../Contact/Contact.module.css'
const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const renderItems = items.map((item, index) => {
    const isActive = index === activeIndex;
    const contentClass = `accordion-content ${isActive ? 'active' : ''}`;
    const icon = isActive ? '-' : '+';

    return (
        
      <div key={index} className={Styles.accordion-item}>
        <div className={Styles.accordion_title} onClick={() => onTitleClick(index)}>
          <span className={Styles.accordion_icon}>{icon}</span>
          {item.title}
        </div>
        <div className={contentClass}>
          {isActive && <p>{item.content}</p>}
        </div>
      </div>
    );
  });

  return <div className={Styles.accordion}>{renderItems}</div>;
};

export default Accordion;