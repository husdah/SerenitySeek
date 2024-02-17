const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');

const { addBlog, getAllBlogs, getBlogsByUserId, getBlogById, updateBlog,updateBlogLikes ,deleteBlog ,getUserByBlogId} = require('../controllers/blogController');
const validateToken = require('../middlewares/validateTokenHandler');
const {isUser} = require('../middlewares/roleHandler');


router.post("/blog", upload.array('gallery') ,addBlog);
router.get("/blog", getAllBlogs);
router.get("/userBlog", getBlogsByUserId);
router.get("/blogSingle/:id", getBlogById);
router.put("/blog/:id", updateBlog);
router.put("/blogLikes/:id",updateBlogLikes);
router.delete("/blog/:id/:userId", validateToken, deleteBlog);
router.get("/blogUser/:blogId/user", getUserByBlogId);


module.exports = router;