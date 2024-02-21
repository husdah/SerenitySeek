import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuthContext } from '../../hooks/useAuthContext';
import Styles from './updateForm.module.css'

function UpdateBlog({ closeModal, blogId }) {
  const { user, dispatch } = useAuthContext();
  const [caption, setCaption] = useState('');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/blogs/blogSingle/${blogId}`, {
          method: 'GET',
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
          dispatch({ type: 'LOGIN', payload: user })
        }

        const json = await response.json();
        if (json.expired) {
          window.location.href = 'http://localhost:3000/LogoutAndRedirect';
        }

        if (json) {
          const { caption } = json;
          setCaption(caption);
        } else {
          console.error('Caption is missing in the returned data:', json);
        }
      } catch (error) {
        console.error('An error occurred while fetching data', error);
      }
    };
    fetchBlogData();
  }, [blogId, user, dispatch]);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    console.log('update is called');
    try {
      const requestBody = {
        caption: caption.trim()
      };

      const MySwal = withReactContent(Swal);

      const response = await fetch(`http://localhost:4000/blogs/blog/${blogId}`, {
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
        MySwal.fire({
          icon: 'success',
          title: json.message,
          time: 4000,
        });
        closeModal();
        window.location.reload();
      } else {
        console.error('Error updating blog:', json);
      }
    } catch (error) {
      console.error('An error occurred while updating the blog', error);
    }
  };

  return (
    <div className={Styles.modal_container}>
      <div className={Styles.modal}>
        <FaTimes className={Styles.closeBtn} onClick={closeModal} />
        <form onSubmit={handleUpdate}>
          <div className={Styles.form_group}>
            <label  className={Styles.title} htmlFor='caption'>Update Your Caption</label>
            <input
              type='text'
              name='caption'
              value={caption}
              onChange={handleCaptionChange}
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

export default UpdateBlog;