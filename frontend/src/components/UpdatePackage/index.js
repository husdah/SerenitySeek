import React, { useState, useEffect } from 'react';
import Styles                         from './UpdatePackage.module.css';
import { FaTimes }                    from 'react-icons/fa';
import { useAuthContext }             from '../../hooks/useAuthContext';
import validator from 'validator';
import Swal                           from 'sweetalert2';
import withReactContent               from 'sweetalert2-react-content';

export default function UpdatePackage({ closeModal, packageId  }) {
  const { user, dispatch }      = useAuthContext();
  const [pricePerOne, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [startDate, setDate]    = useState('');
  const [duration, setDuration] = useState('');

  const [isValidPrice, setIsValidPrice]       = useState(true);
  const [isValidDiscount, setIsValidDiscount] = useState(true);
  const [isValidDuration, setIsValidDuration] = useState(true);
  const [emptyFields, setEmptyFields]         = useState([]);

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  
  const handleDiscountChange = (e) => {
    const value = e.target.value;
    if (value.trim() === '') {
      setDiscount('');
    } 
    else {
      setDiscount(value);
      const numericValue = parseFloat(value);
      if (numericValue >= 1 && numericValue >= 100) {
        setIsValidDiscount(false);
      }
      else {
        setIsValidDiscount(true);
      }
    }
  };
  
  const handleStartDateChange = (e) => {
    setDate(e.target.value);
  };
  
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };  

  /* Handling error on onfocus for input */
  const handleInputPriceOnFocus = (e) => {
    setIsValidPrice(true);
    setEmptyFields(emptyFields.filter(field => field !== 'Price'));
  }; 
  
  const handleInputDiscountOnFocus = (e) => {
    setIsValidDiscount(true);
    setEmptyFields(emptyFields.filter(field => field !== 'Discount'));
  }; 
  
  const handleInputDateOnFocus = (e) => {
    setEmptyFields(emptyFields.filter(field => field !== 'Date'));
  }; 
  
  const handleInputDurationOnFocus = (e) => {
    setIsValidDuration(true);
    setEmptyFields(emptyFields.filter(field => field !== 'Duration'));
  }; 
  

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/package/${packageId}`
          ,{
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
          },
            credentials: 'include'
        });
  
        const newAccessToken = response.headers.get('New-Access-Token');
        if (newAccessToken) {
          user.accessToken = newAccessToken;
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({type: 'LOGIN', payload: user})
        }
  
        const json = await response.json();
        if (json.expired) {
          window.location.href = 'http://localhost:3000/LogoutAndRedirect';
        }

        if (json) {
          const { pricePerOne, discount, startDate, duration  } = json;
          setPrice(pricePerOne);
          setDiscount(discount);
          const formattedDate = new Date(startDate).toISOString().split('T')[0];
          setDate(formattedDate);
          setDuration(duration);
        } 
        else {
            console.error('User attribute is missing in the returned data:', json);
        }
      } catch (error) {
        console.error('An error occurred while fetching data', error);
      }
    };
    fetchPackageData();
  }, [packageId, user, dispatch]);

  


  /* Function to update */
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Reset validation states
    setIsValidPrice(true);
    setIsValidDiscount(true);
    setIsValidDuration(true);

    let emptyValues = [];

    if (!String(pricePerOne) || validator.isEmpty(String(pricePerOne)) ){
      emptyValues.push('Price');
    }
    else if (!validator.isNumeric(String(pricePerOne))) {
      setIsValidPrice(false);
    }

    if(String(discount) || !validator.isEmpty(String(discount))){
      if (!validator.isNumeric(String(discount))) {
        setIsValidDiscount(false);
      }
    }
    
    if (!startDate || validator.isEmpty(String(startDate))) {
      emptyValues.push('Date');
    }

    if (!String(duration) || validator.isEmpty(String(duration)) ) {
      emptyValues.push('Duration');
    }

    if (emptyValues.length > 0 ) {
      setEmptyFields(emptyValues);
      return;
    }

    if (validator.isNumeric(String(pricePerOne)) && emptyValues.length === 0) {
      try {
        const requestBody = {
          pricePerOne: String(pricePerOne),
          startDate: String(startDate),
          duration: String(duration),
          discount: discount.trim() === '' ? '' : discount,
        };

        //console.log('Request Body:', requestBody);

        const MySwal = withReactContent(Swal);

        const handleSuccess = (responseData) => {
          MySwal.fire({
            icon: 'success',
            title: responseData.message,
            time: 4000,
          });
        };
    
        const response = await fetch(`http://localhost:4000/api/package/${packageId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(requestBody),
          credentials: 'include',
        });
    
        const newAccessToken = response.headers.get('New-Access-Token');
        if (newAccessToken) {
          user.accessToken = newAccessToken;
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({ type: 'LOGIN', payload: user });
        }
    
        const json = await response.json();
        if (json.expired) {
          window.location.href = 'http://localhost:3000/LogoutAndRedirect';
        }

        if (response.ok) {
          //console.log('Package updated successfully:', json);
          handleSuccess(json);
          closeModal();
        } 
        else {
          console.error('Error updating package:', json);
        }
      } 
      catch (error) {
        console.error('An error occurred while updating the package', error);
      }
    }
  }
  return (
    <div className={Styles.modal_container} >
      <div className={Styles.modal}>
      <FaTimes className={Styles.closeBtn} onClick={closeModal} />

        <form onSubmit={handleUpdate}>
          <div className={Styles.form_group}>
            <label htmlFor='price'>Price</label>
            <input
              type='text'
              name='price'
              value={pricePerOne}
              onChange={handlePriceChange}
              onFocus={handleInputPriceOnFocus}
            />
            {emptyFields.includes('Price') && <span className={Styles.error}>This field is required.</span>}
            {!isValidPrice && <p className={Styles.error}>Please enter a valid price.</p>}
          </div>
          <div className={Styles.form_group}>
            <label htmlFor='discount'>Discount</label>
            <input
              type='text'
              name='discount'
              value={discount}
              onChange={handleDiscountChange}
              onFocus={handleInputDiscountOnFocus}
            />
            {!isValidDiscount && <p className={Styles.error}> Please enter a valid discount.</p> } 
          </div>
          <div className={Styles.form_group}>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              value={startDate}
              onChange={handleStartDateChange}
              onFocus={handleInputDateOnFocus}
            />
            {emptyFields.includes('Date') && <span className={Styles.error}>This field is required.</span>}
            
          </div>
          <div className={Styles.form_group}>
            <label htmlFor='duration'>Duration</label>
            <input
              type='text'
              name='duration'
              value={duration}
              onChange={handleDurationChange}
              onFocus={handleInputDurationOnFocus}
            />
            {emptyFields.includes('Duration') && <span className={Styles.error}>This field is required.</span>}
          </div>
          <button className={Styles.btn_update}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}