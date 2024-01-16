const express = require('express');
const router = express.Router();

const { addBlog, getAllBlogs, getBlogsByUserId, updateBlog, deleteBlog } = require('../controllers/blogController');

router.post("/blog", addBlog);
router.get("/blog", getAllBlogs);
router.get("/userBlog",getBlogsByUserId);
router.put("/blog/:id",updateBlog);
router.delete("/blog/:id",deleteBlog);


module.exports = router;