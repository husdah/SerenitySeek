
import React, { useState } from 'react';

function DropdownList(props) {
  const { options } = props; // Assuming options is an array of objects with a value and label

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {/*<p>Selected Option: {selectedOption}</p>*/}
    </div>
  );
}

export default DropdownList;