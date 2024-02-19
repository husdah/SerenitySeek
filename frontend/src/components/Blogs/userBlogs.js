import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
import { IoHeart } from 'react-icons/io5';
import { SiYourtraveldottv } from 'react-icons/si';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './blog.module.css';

const UserBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [liked, setLiked] = useState(false);
  const userId = new URLSearchParams(location.search).get('userId');

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/blogs/userBlog?userId=${userId}`);
        setUserBlogs(response.data);
      } catch (error) {
        console.error('Error fetching user blogs:', error);
      }
    };

    const fetchUserData = async () => {
        try {
          const userResponse = await axios.get(`http://localhost:4000/api/user/${userId}`);
          setUser(userResponse.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserBlogs();
      fetchUserData();
  }, [userId]);

  const handleLike = async (blogId) => {
    try {
      // Send a request to update the like count
      const response = await axios.put(`http://localhost:4000/blogs/blogLikes/${blogId}`, { action: 'like' });
      if (response && response.data) {
        setLiked(true);
        const updatedBlogResponse = await axios.get(`http://localhost:4000/blogs/blog`);
        setUserBlogs(updatedBlogResponse.data);
      }
    } catch (error) {
      console.error('Error occurred while handling like action:', error);
    }
  };


  return (
    <div className={styles.blogs_page}>
      <div className={styles.banner_blogs}>
        {user && <h1>{user.Fname} {user.Lname}'s Blogs</h1>}
      </div>
      <div className={styles.blogs_section}>
        {userBlogs.map((blog, blogIndex) => (
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
              <p className={styles.username_caption}>
              <Link to={`/userBlogs?userId=${encodeURIComponent(blog.userId && blog.userId._id)}`} className={styles.user_link}>
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
    </div>
  );
};

export default UserBlogs;
