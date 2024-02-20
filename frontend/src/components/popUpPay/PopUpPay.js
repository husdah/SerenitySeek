import React, { useState } from 'react';
import PaymentTest from '../../Routes/PaymentTest';
import styles from './popUpPay.module.css'

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
          className={styles.popup}
        >
          <div className={styles.popup_content}>
            <label htmlFor="">Enter Number of people</label>
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter something..."
              className={styles.nbppl}
            />
           <PaymentTest nbPeople={inputValue} price={props.price} packageId={props.packageId} companyId={props.companyId}/>
            <button onClick={props.onClose} className={styles.close}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
