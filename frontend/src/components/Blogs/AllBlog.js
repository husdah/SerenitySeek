import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
import { IoHeart } from 'react-icons/io5';
import { SiYourtraveldottv } from 'react-icons/si';
import React, { useState, useEffect } from 'react';

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [liked, setLiked] = useState(false);

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
    <div className="blogs_page">
    <div className='banner_blogs'><h1> Explore Others' Experiences </h1></div>
      <div className="blogs-section">
      {allBlogs.map((blog, blogIndex) => (
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
            <p className="username-caption">
            <Link to={`/userBlogs/${encodeURIComponent(blog.userId && blog.userId._id)}`}>
                {blog.userId && blog.userId.Fname} {blog.userId && blog.userId.Lname} 
            </Link>

           <span className="caption">{blog.caption}</span>
           </p>

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

export default AllBlogs;
