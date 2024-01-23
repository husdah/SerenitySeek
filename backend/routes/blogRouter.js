const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');

const { addBlog, getAllBlogs, getBlogsByUserId, updateBlog, deleteBlog } = require('../controllers/blogController');
const validateToken = require('../middlewares/validateTokenHandler');
const {isUser} = require('../middlewares/roleHandler');


router.post("/blog",validateToken, upload.array('gallery') ,addBlog);
router.get("/blog", getAllBlogs);
router.get("/userBlog", getBlogsByUserId);
router.put("/blog/:id", validateToken, updateBlog);
router.delete("/blog/:id/:userId", validateToken, deleteBlog);


module.exports = router;