import React, { useState } from 'react';
import PaymentTest from '../../Routes/PaymentTest';

export default function PopUpPay(props) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  

  return (
    <div>
      {props.isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          }}
          className="popup"
        >
          <div className="popup-content">
            <label htmlFor="">Enter Number of people</label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter something..."
            />
           <PaymentTest nbPeople={inputValue} price={props.price} packageId={props.packageId} companyId={props.companyId}/>
            <button onClick={props.onClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
