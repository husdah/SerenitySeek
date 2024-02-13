import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCommentDots } from 'react-icons/fa';
import { IoHeart } from 'react-icons/io5';
import { SiYourtraveldottv } from 'react-icons/si';
import AddBlogForm from './addBlogForm';
import './blogs.css'

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/blogs/blog');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  const handleLike = async (blogId) => {
    try {
      // Send a request to update the like count
      const response = await axios.put(`http://localhost:4000/blogs/blogLikes/${blogId}`, { action: 'like' });
      if (response && response.data) {
        setLiked(true);
        const updatedBlogResponse = await axios.get(`http://localhost:4000/blogs/blog`);
        setBlogs(updatedBlogResponse.data);
      }
    } catch (error) {
      console.error('Error occurred while handling like action:', error);
    }
  };

  return (
    <div className="blogs_page">
      <div className='banner_blogs'><h2>Discover others' experiences.</h2></div>
      < AddBlogForm />
    <div className="blogs-section">
      {blogs.map((blog, blogIndex) => (
        <div className='blog-container' key={blogIndex}>
          {blog.gallery && blog.gallery.length > 0 && (
            <div>
              <div className="gallery-container">
                {blog.gallery.map((imageObject, imageIndex) => (
                  <img
                    key={imageIndex}
                    src={`http://localhost:4000/uploads/${imageObject.filename}`}
                    alt={`Gallery - Image ${imageIndex + 1}`}
                    className="gallery-image"
                    crossOrigin="anonymous"
                  />
                ))}
              </div>
            </div>
          )}
          <div className='content'>
            <p className='date'>{new Date(blog.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</p>
            <p className="location-icon"><span className="icon-wrapper"><SiYourtraveldottv /></span>{blog.location}</p>
            {blog.userId && (
              <p className="username-caption">
                <span className="username">{blog.user ? blog.user.username : 'Loading...'}</span>
                <span className="caption">{blog.caption}</span>
              </p>
            )}
            <div className='icons'>
              <div className="row">
                <div className="heart-container" onClick={() => handleLike(blog._id)}>
                  <i className={`heart-icon ${liked ? 'filled' : 'outline'}`}><IoHeart/></i>
                  <span>{blog.likes}</span>
                </div>
              </div>
              <div className='row'>
                <i className='comments-icon'><FaCommentDots /></i>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Blogs;
