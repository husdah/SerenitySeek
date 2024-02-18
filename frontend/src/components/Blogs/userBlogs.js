import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/blogs/userBlog?userId=${userId}`);
        setUserBlogs(response.data);
      } catch (error) {
        console.error('Error fetching user blogs:', error);
      }
    };

    fetchUserBlogs();
  }, [userId]);

  return (
    <div>
      <h1>User Blogs</h1>
      <div className="blogs-section">
        {userBlogs.map((blog, index) => (
          <div key={index}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            {/* Add more rendering logic as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBlogs;
