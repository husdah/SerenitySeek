import React from 'react';

function DropdownList(props) {
  const { options } = props;

  return (
    <div>
      <select onChange={props.onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default DropdownList;