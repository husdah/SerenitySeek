import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
import { IoHeart } from 'react-icons/io5';
import { SiYourtraveldottv } from 'react-icons/si';
import React, { useState, useEffect } from 'react';
import styles from './blog.module.css';
import AddComments from './addComments';

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/blogs/blog');
        setAllBlogs(response.data);
      } catch (error) {
        console.error('Error fetching all blogs:', error);
      }
    };

    fetchAllBlogs();
  }, []);

  const handleEditBlog = async (blogId) => {
    console.log("edit clicked");
    setSelectedBlogId(blogId);
    setModalOpen(true);
  };


  const handleLike = async (blogId) => {
    try {
      // Send a request to update the like count
      const response = await axios.put(`http://localhost:4000/blogs/blogLikes/${blogId}`, { action: 'like' });
      if (response && response.data) {
        setLiked(true);
        const updatedBlogResponse = await axios.get(`http://localhost:4000/blogs/blog`);
        setAllBlogs(updatedBlogResponse.data);
      }
    } catch (error) {
      console.error('Error occurred while handling like action:', error);
    }
  };

  

  return (
      <div className={styles.blogs_page}>
        <div className={styles.banner_blogs}><h1>Explore Others' Experiences</h1></div>
        <div className={styles.blogs_section}>
          {allBlogs.map((blog, blogIndex) => (
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
                    <i className={styles.comments_icon} onClick={() => handleEditBlog(blog._id)}><FaCommentDots /></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {modalOpen &&  (
          <AddComments
            closeModal={() => {
              setModalOpen(false);
              //fetchPackagesForCompany();
            }}
            blogId = { selectedBlogId }
            
          />
        )}
        </div>
      </div>
  );
};

export default AllBlogs;
