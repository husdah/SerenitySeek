import React, { useState } from 'react';

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
        
      <div key={index} className="accordion-item">
        <div className="accordion-title" onClick={() => onTitleClick(index)}>
          <span className="accordion-icon">{icon}</span>
          {item.title}
        </div>
        <div className={contentClass}>
          {isActive && <p>{item.content}</p>}
        </div>
      </div>
    );
  });

  return <div className="accordion">{renderItems}</div>;
};

export default Accordion;