import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { Typography } from "antd";
import { BsFillTrashFill } from 'react-icons/bs';
import { MdOutlineAddHomeWork } from "react-icons/md";
import validator from 'validator';
import Styles from '../assets/css/Hotel.module.css'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function HotelPage() {
  const [ hotelItems, setHotelData ] = useState([]);
  const { user, dispatch } = useAuthContext();
  const [ formData, setFormData ] = useState({
    name: '',
    location: '',
    gallery: null,
    rating: '',
  });

  const [ isValidName, setIsValidName ] = useState(true);
  const [ isValidLocation, setIsValidLocation ] = useState(true);
  const [ isValidGallery, setIsValidGallery ] = useState(true);
  const [ isValidRating, setIsValidRating ] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, gallery: e.target.files });
  };

   /* fetch the hotel data */
   const fetchHotelData = async () => {
    try{
      const response = await fetch(`http://localhost:4000/api/hotel`
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

      const hotels = await response.json();
      if (response.ok) {
        setHotelData(hotels);
        /*console.log('hotels Data:', hotels);*/
      }
      else{
        console.log('No Available Hotels');
      } 
    }
    catch(error){
      console.error('An error occurred while fetching data', error);
    }
  }
  
  useEffect (()=> {
    fetchHotelData();
  }, [user, dispatch])

  const MySwal = withReactContent(Swal);

  const handleDeleteHotel = async (hotelId) => {
    const willDelete = await MySwal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (willDelete.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:4000/api/hotel/${hotelId}`, {
          method: 'DELETE',
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

        const responseData = await response.json();

        if (response.ok) {
          MySwal.fire({
            icon: 'success',
            title: responseData.message,
            time: 4000,
          });
          fetchHotelData();
        } 
        else {
          console.error(responseData.message);
        }
      } 
      catch (error) {
        console.error('An error occurred while deleting the package', error);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsValidName(true);
    setIsValidLocation(true);
    setIsValidGallery(true);
    setIsValidRating(true);

    let isValidForm = true;

    if (!formData.name || validator.isEmpty(formData.name) || !validator.matches(formData.name, /^[a-zA-Z\s]+$/) ) {
      setIsValidName(false);
      isValidForm = false;
    }

    if (!formData.location || validator.isEmpty(formData.location) ) {
      setIsValidLocation(false);
      isValidForm = false;
    }

    if (!formData.gallery || formData.gallery.length === 0) { // Check if gallery is an array and has length
      setIsValidGallery(false);
      isValidForm = false;
    } 

    if (!formData.rating || validator.isEmpty(formData.rating) || !validator.isNumeric(formData.rating)) {
        setIsValidRating(false);
        isValidForm = false;
    }

    if (isValidForm) {
      const handleSuccess = (responseData) => {
        MySwal.fire({
          icon: 'success',
          title: responseData.message,
          time: 4000,
        });
      };

      const handleFailure = (responseData) => {
        MySwal.fire({
          icon: 'error',
          title: responseData.message,
          time: 4000,
        });
      };

      const handleClearForm = () => {
        setFormData({
          name: '',
          location: '',
          gallery: [],
          rating: '',
        });

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = ''; 
        }

      }

      try {
        const formDataObj = new FormData(); 

        formDataObj.append('name', formData.name);
        formDataObj.append('location', formData.location);
        for (let i = 0; i < formData.gallery.length; i++) {
          formDataObj.append(`gallery`, formData.gallery[i]);
        }
        formDataObj.append('rating', formData.rating); 

        const response = await fetch('http://localhost:4000/api/hotel', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: formDataObj,
          credentials: 'include',
        });
    
        const newAccessToken = response.headers.get('New-Access-Token');
        if (newAccessToken) {
          user.accessToken = newAccessToken;
          localStorage.setItem('user', JSON.stringify(user));
          dispatch({ type: 'LOGIN', payload: user });
        }
    
        const responseData = await response.json();
        if (response.ok) {
          handleSuccess(responseData);
          handleClearForm();
          fetchHotelData();
          console.log(responseData.message);
        } 
        else {
          console.error(responseData.message);
          handleFailure(responseData);

        }
      }  
      catch (error) {
        console.error('Error while adding Hotels:', error);
      }
    }

  }

  return (
    <div className={Styles.hotelContainer}>
      <Typography.Title level={4}>Hotel Page</Typography.Title>
      <div className={Styles.hotelSubContainer}>
        <div className={Styles.hotelContent}>
          <table>
            <thead>
              <th className={Styles.nameCell}>Name</th>
              <th className={Styles.locationCell}>Location</th>
              <th className={Styles.ratingCell}>Rating</th>
              <th className={Styles.actionCell}>Action</th>
            </thead>
            <tbody>
              {hotelItems.map(hotelItem => (
                <tr key={hotelItem._id}>
                  <td>{hotelItem.name}</td>
                  <td>{hotelItem.location}</td>
                  <td className={Styles.rateBody}>{hotelItem.rating}</td>
                  <td className={Styles.actionBody}>
                    <BsFillTrashFill
                      className={Styles.delete_btn}
                      onClick={() => handleDeleteHotel(hotelItem._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={Styles.hotelForm}>
          <div className={Styles.hotelFormLogo}><MdOutlineAddHomeWork className={Styles.addIcon}/></div>
          <form onSubmit={handleSubmit}>
            <div className={Styles.form_group}>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setIsValidName(true)}
              />
              {!isValidName && <span className={Styles.error}> Please enter a valid Name.</span> } 
            </div>
            <div className={Styles.form_group}>
              <label htmlFor='location'>Location</label>
              <input
                type='text'
                name='location'
                value={formData.location}
                onChange={handleChange}
                onFocus={() => setIsValidLocation(true)}
              />
              {!isValidLocation && <span className={Styles.error}> Please enter a valid location.</span> } 
            </div>
            <div className={Styles.form_group}>
              <label htmlFor='rating'>Rating</label>
              <input
                type='number'
                name='rating'
                value={formData.rating}
                onChange={handleChange}
                onFocus={() => setIsValidRating(true)}
              />
              {!isValidRating && <span className={Styles.error}>Please enter a valid rate.</span>}
            </div>
            <div className={Styles.form_group}>
              <label htmlFor='image'>Image</label>
              <input 
                type="file" 
                multiple="multiple"
                name="gallery"
                onChange={handleFileChange} 
                onFocus={() => setIsValidGallery(true)}
              />
              {!isValidGallery && <span className={Styles.error}>Please upload an images.</span>}
            </div>

            <button className={Styles.btn_add}>
              Add
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

