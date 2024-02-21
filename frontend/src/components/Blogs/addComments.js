import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Styles from './updateForm.module.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const AddComments = ({ closeModal, blogId }) => {
  const [caption, setCaption] = useState('');
  const [comments, setComments] = useState([]);
  const { user, dispatch } = useAuthContext();
  const [newComment, setNewComment] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [userId, setUserId] = useState('');
  const [check, setCheck] = useState(false);
  
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/blogs/blogSingle/${blogId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
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

        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.message || 'Failed to fetch blog data');
        }


        console.log(json);

        setCheck(false);

        setCaption(json.caption);
        setComments(json.comments);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };
    fetchBlogData();
  }, [blogId, check ]);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };


  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
        const requestBody = {
            message: newComment.trim()
        };

        const response = await fetch(`http://localhost:4000/blogs/blog/${blogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            },
            body: JSON.stringify(requestBody),
            credentials: 'include'
        });

        const responseData = await response.json(); // Parse response body as JSON

        if (response.ok) {
          console.log( responseData.data);
          //  closeModal();
          //  window.location.reload();
          setCheck(true);
          setNewComment('');
        } else {
            console.error('Error adding comment:', responseData); // Log the response data
        }
    } catch (error) {
        console.error('An error occurred while adding comment:', error);
    }
};


return (
    <div className={Styles.modal_container}>
      <div className={Styles.modal}>
        <FaTimes className={Styles.closeBtn} onClick={closeModal} />
        <h3 className={Styles.title}>Comments</h3>
        <div className={Styles.comments_section}>
          {comments.map((comment, index) => (
            <div key={index} className={Styles.comment}>
              <p><span>{comment.userId.Fname} {comment.userId.Lname} </span>{comment.message}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddComment}>
          <div className={Styles.form_group}>
            <label  className={Styles.title} htmlFor='newComment'>New Comment</label>
            <input
              name='newComment'
              value={newComment}
              onChange={handleNewCommentChange}
            />
          </div>
          <button type="submit" className={Styles.btn_update}>
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default AddComments;
