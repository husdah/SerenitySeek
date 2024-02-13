import React, { useState } from 'react';
import axios from 'axios';

const AddBlogForm = () => {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('caption', caption);
      formData.append('location', location);

      await axios.post('http://localhost:4000/blogs/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Blog added successfully!');
      // Optionally, you can redirect the user or perform any other action after successful submission
    } catch (error) {
      console.error('Error adding blog:', error);
      alert('Error adding blog. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="caption">Caption:</label>
        <input type="text" id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" onChange={handleImageChange} />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  );
};

export default AddBlogForm;
