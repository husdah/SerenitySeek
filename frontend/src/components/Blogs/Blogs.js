import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
import { IoHeart } from 'react-icons/io5';
import { SiYourtraveldottv } from 'react-icons/si';
import AddBlogForm from './addBlogForm';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './blog.module.css';
import { FaPen, FaTrash, FaEllipsisV } from 'react-icons/fa';

import Navbar from '../navbar/Navbar'
import Footer from '../Footer/Footer'

const Blogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [liked, setLiked] = useState(false);
  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let userId = jwtDecode(user.accessToken).user.id;
        const response = await axios.get(`http://localhost:4000/blogs/userBlog?userId=${userId}`,
        { headers: {
          Authorization: `Bearer ${user.accessToken}`,
          },
          withCredentials: true,
        })
        .then(async (response) => {
          // Check and handle new access token
          const newAccessToken = response.headers['new-access-token'];
          if (newAccessToken) {

            // Update the access token in LocalStorage
            user.accessToken = newAccessToken;
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({type: 'LOGIN', payload: user});
            console.log('New access token saved:', newAccessToken);

          }
          setMyBlogs(response.data);
    
        })
        .catch((error) => {console.log("Auth Error", error);
      });
       

        } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);
  
  const handleLike = async (blogId) => {
    try {
      // Send a request to update the like count
      const response = await axios.put(`http://localhost:4000/blogs/blogLikes/${blogId}`, { action: 'like' });
      if (response && response.data) {
        // Update the liked state for the specific blog
        setMyBlogs(prevBlogs => prevBlogs.map(blog => {
          if (blog._id === blogId) {
            return { ...blog, liked: true };
          }
          return blog;
        }));
      }
    } catch (error) {
      console.error('Error occurred while handling like action:', error);
    }
  };

  const handleUpdate = (blogId) => {
    // Implement logic to handle the update action
  };

  const handleDelete = async (blogId) => {
    console.log('clicked');
    try {
      let userId = jwtDecode(user.accessToken).user.id;
  
      await axios.delete(`http://localhost:4000/blogs/blog/${blogId}/${userId}`,{ headers: {
        Authorization: `Bearer ${user.accessToken}`,
        },
        withCredentials: true,})
        .then(async (response) => {
          // Check and handle new access token
          const newAccessToken = response.headers['new-access-token'];
          if (newAccessToken) {

            // Update the access token in LocalStorage
            user.accessToken = newAccessToken;
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({type: 'LOGIN', payload: user});
            console.log('New access token saved:', newAccessToken);

          }
          setMyBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
    
        })
        .catch((error) => {console.log("Auth Error", error);
      });
    } catch (error) {
      console.error('Error occurred while deleting the blog:', error);
    }
  };
  


  return (
    <>
      <Navbar nothome='true' />
    
      <div className={styles.blogs_page}>
        <Link to="/allBlogs">View All Blogs</Link>
        <AddBlogForm />
        <div className={styles.banner_blogs}><h1>Your Blogs</h1></div>
        <div className={styles.blogs_section}>
          {myBlogs.length > 0 && (
            <div className={styles.blogs_section}>
              {myBlogs.map((blog, blogIndex) => (
                <div className={styles.blog_container} key={blogIndex}>
                  {blog.gallery && blog.gallery.length > 0 && (
                    <div>
                      <div className={styles.gallery_container}>
                        {blog.gallery.map((imageObject, imageIndex) => (
                          <img
                            key={imageIndex}
                            src={`http://localhost:4000/uploads/${imageObject.filename}`}
                            alt={`Gallery - Image ${imageIndex + 1}`}
                            className={styles.gallery_image}
                            crossOrigin="anonymous"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className={styles.content}>
                    <p className={styles.date}>{new Date(blog.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p>
                    <p className={styles.location_icon}><span className={styles.icon_wrapper}><SiYourtraveldottv /></span>{blog.location}</p>
                    <div className={styles.icons_row}>
                        <FaPen className={styles.icon} onClick={() => handleUpdate(blog._id)} />
                        <FaTrash className={styles.icon} onClick={() => handleDelete(blog._id)} />
                      </div>
                    <p className={styles.username_caption}>
                    <Link to={`/userBlogs?userId=${encodeURIComponent(blog.userId && blog.userId._id)}`} state={blog.userId.Fname +" " +blog.userId.Lname} className={styles.user_link}>
                    <span className={styles.user_name}>
                      {blog.userId && blog.userId.Fname} {blog.userId && blog.userId.Lname}
                      </span>
                    </Link>

                      <span className={styles.caption}>{blog.caption}</span>
                    </p>
                    <div className={styles.icons}>
                      <div className={styles.row}>
                        <div className={styles.heart_container} onClick={() => handleLike(blog._id)}>
                          <i className={`${styles.heart_icon} ${liked ? styles.filled : styles.outline}`}><IoHeart /></i>
                          <span>{blog.likes}</span>
                        </div>
                      </div>
                      <div className={styles.row}>
                        <i className={styles.comments_icon}><FaCommentDots /></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blogs;
