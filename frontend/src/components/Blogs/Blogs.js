import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
import { IoHeart } from 'react-icons/io5';
import { SiYourtraveldottv } from 'react-icons/si';
import { IoHeartOutline } from 'react-icons/io5';
import AddBlogForm from './addBlogForm';
import UpdateBlog from './updateBlog';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './blog.module.css';
import { FaPen, FaTrash, FaEllipsisV } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AddComments from './addComments';

import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';

const Blogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [liked, setLiked] = useState(false);
  const { user, dispatch } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

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

  const handleEditBlog = async (blogId) => {
    console.log("edit clicked");
    setSelectedBlogId(blogId);
    setModalOpen(true);
  };

  const handleBlog = async (blogId) => {
    console.log("edit clicked");
    setSelectedBlogId(blogId);
    setModalOpen2(true);
  };

  const handleDelete = async (blogId) => {
    console.log('clicked');
    try {
        let userId = jwtDecode(user.accessToken).user.id;

        // Use SweetAlert to ask for confirmation before deletion
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmation.isConfirmed) {
            await axios.delete(`http://localhost:4000/blogs/blog/${blogId}/${userId}`, {
                headers: {
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
                        dispatch({ type: 'LOGIN', payload: user });
                        console.log('New access token saved:', newAccessToken);
                    }
                    // Display a success SweetAlert
                    Swal.fire(
                        'Deleted!',
                        'Your blog has been deleted.',
                        'success'
                    ).then(() => {
                        // Remove the deleted blog from state
                        setMyBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
                    });
                })
                .catch((error) => {
                    console.log("Auth Error", error);
                    // Display an error SweetAlert
                    Swal.fire(
                        'Error!',
                        'An error occurred while deleting the blog.',
                        'error'
                    );
                });
        }
    } catch (error) {
        console.error('Error occurred while deleting the blog:', error);
    }
};
  


  return (
      <div className={styles.blogs_page}>
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
                        <FaPen className={styles.icon} onClick={() => handleEditBlog(blog._id)} />
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
                        <div className={styles.heart_container}>
                          <i className={`${styles.heart_icon}`}>
                          {liked ? <IoHeart className={styles.filled} /> : <IoHeartOutline className={styles.outline} />}
                          </i>
                          <span>{blog.likes}</span>
                        </div>
                      </div>
                      <div className={styles.row}>
                        <i className={styles.comments_icon} onClick={() => handleBlog(blog._id)}><FaCommentDots /></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
           {modalOpen &&  (
          <UpdateBlog
            closeModal={() => {
              setModalOpen(false);
              //fetchPackagesForCompany();
            }}
            blogId = { selectedBlogId }
          />
           )}
          {modalOpen2 && (
          <AddComments
            closeModal={() => {
              setModalOpen2(false);
              //fetchPackagesForCompany();
            }}
            blogId = { selectedBlogId }
          />
        )}
        </div>
      </div>
     
  );
};

export default Blogs;
