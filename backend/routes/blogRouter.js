const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');

const { addBlog, getAllBlogs, getBlogsByUserId, updateBlog, deleteBlog } = require('../controllers/blogController');

router.post("/blog", upload.array('gallery') ,addBlog);
router.get("/blog", getAllBlogs);
router.get("/userBlog",getBlogsByUserId);
router.put("/blog/:id",updateBlog);
router.delete("/blog/:id",deleteBlog);


module.exports = router;