import React, { useState, useEffect } from 'react';
import Styles                         from './UpdatePackage.module.css';
import { FaTimes }                    from 'react-icons/fa';
import { useAuthContext }             from '../../hooks/useAuthContext';
import Swal                           from 'sweetalert2';
import withReactContent               from 'sweetalert2-react-content';
//import validator from 'validator';

export default function UpdatePackage({ closeModal, packageId  }) {
  const { user, dispatch }      = useAuthContext();
  const [pricePerOne, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [startDate, setDate]    = useState('');
  const [duration, setDuration] = useState('');
  
  /* Fetcing data to fill the form */
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

  const MySwal = withReactContent(Swal);

  function handleInput() {
    
  }



  const handleSuccess = (responseData) => {
    MySwal.fire({
      icon: 'success',
      title: responseData.message,
      time: 4000,
    });
    handleClearForm();
  };

  const handleFailure = (errorData) => {
    MySwal.fire({
      icon: 'error',
      title: errorData.message,
      time: 4000,
    });
  };

  // Clear form fields
  const handleClearForm = () => {
    setPrice('');
    setDiscount('');
    setDate('');
    setDuration('') ;
  }

  /* Function to update */
  const handleUpdate = async (e) => {
    e.preventDefault();

    /*
    try {
      const requestBody = {
        // validator read as a strting while the fields are number
        pricePerOne: String(pricePerOne),
        discount: discount,
        startDate: String(startDate),
        duration: String(duration),
      };
  
      console.log('Request Body:', requestBody);
  
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
        console.log('Package updated successfully:', json);
        handleSuccess(json);
        closeModal();
      } 
      else {
        console.error('Error updating package:', json);
        setError(json.error);
        handleFailure(json);
      }
    } 
    catch (error) {
      console.error('An error occurred while updating the package', error);
    }
    */
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
              onChange={handleInput}
            />
          </div>
          <div className={Styles.form_group}>
            <label htmlFor='discount'>Discount</label>
            <input
              type='text'
              name='discount'
              value={discount}
              onChange={handleInput}
            />
          </div>
          <div className={Styles.form_group}>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              value={startDate}
              onChange={handleInput}
            />
            
          </div>
          <div className={Styles.form_group}>
            <label htmlFor='duration'>Duration</label>
            <input
              type='text'
              name='duration'
              value={duration}
              onChange={handleInput}
            />
          </div>
          <button className={Styles.btn_update}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}