import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './AddBlogForm.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const countries = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Japan', code: 'JP' },
  { name: 'Italy', code: 'IT' },
  { name: 'Spain', code: 'ES' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Mexico', code: 'MX' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Russia', code: 'RU' },
  { name: 'China', code: 'CN' },
  { name: 'India', code: 'IN' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'Turkey', code: 'TR' }
];

const AddBlogForm = () => {
    const { user, dispatch } = useAuthContext();
    const [ formData, setFormData ] = useState({
    location: '',
    caption:'',
    gallery: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
  };


  const handleFileChange = (e) => {
    setFormData({ ...formData, gallery: e.target.files });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formDataObj = new FormData(); 
    console.log(formData);
    formDataObj.append('location', formData.location);
    formDataObj.append('caption', formData.caption);
    for (let i = 0; i < formData.gallery.length; i++) {
      formDataObj.append(`gallery`, formData.gallery[i]);
    }

    const response = await fetch('http://localhost:4000/blogs/blog', {
      method: 'POST',
      headers: {
      Authorization: `Bearer ${user.accessToken}`,
      },
      body: formDataObj,
      credentials: 'include',
    });

    const newAccessToken = response.headers.get('New-Access-Token');
    // Check if a new access token is present
    if (newAccessToken) {
      // Update the access token in LocalStorage
      user.accessToken = newAccessToken;
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({type: 'LOGIN', payload: user})
      console.log('New access token savedddddd:', newAccessToken);
    }

    const responseData = await response.json();

    if (response.ok) {
      console.log(responseData.message);
      // Show SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: responseData.message,
      }).then(() => {
        // Reload the page
        window.location.reload();
      });
    } else {
      console.error(responseData.message);
      // Show SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: responseData.message,
      });
    }
  } catch (error) {
    console.error('Error while adding Blogs:', error);
    // Show SweetAlert error message
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred while adding the blog. Please try again later.',
    });
  }
}

  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>Share your moments</h1>
      <form onSubmit={handleSubmit} className={styles['form_container']}>
        <div className={styles['caption_input']}>
          <input
            type="text"
            name="caption"
            placeholder="Type your caption here..."
            value={formData.caption}
            onChange={handleChange}
          />
        </div>
        <div className={styles['location_group']}>
          <div className={styles['input_group']}>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles['input_group']}>
            <input type="file" id="image" onChange={handleFileChange} />
          </div>
        </div>
        <div className={styles['button_group']}>
          <button type="submit">Add Blog</button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogForm;
