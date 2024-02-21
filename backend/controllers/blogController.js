const blogModel = require('../models/Blog');
const userModel = require('../models/User');
const validator = require('validator');
const fs = require('fs').promises;
const {default:mongoose} = require('mongoose');

const addBlog = async (req, res) => {
    const { location, caption } = req.body;
    const gallery = req.files;

    if (!validator.isLength(caption, { min: 1, max: 255 })) {
        return res.status(400).json({ message: 'Caption must be between 1 and 255 characters long' });
    }

    if (!location || !caption || !Array.isArray(gallery)) {
        return res.status(400).json({ message: 'Missing or invalid blog data' });
    }
    try {
        const addedBlog = await blogModel.create({
            userId: req.user.id,
            location: location,
            caption: caption,
            gallery: gallery,
        });

        res.status(201).json({ message: 'Blog added successfully!', blog: addedBlog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get All Blogs
const getAllBlogs = async (req,res) => {
    try{
        const blogs = await blogModel.find().populate('userId', 'Fname Lname') .sort({ createdAt: -1 });
        if (blogs.length === 0) {
            return res.status(404).json({ message: 'No available blogs' });
        }
        res.status(200).json(blogs);
    }catch(error){
        res.status(500).json({error:error.message});
    }

}

//Get Blogs for specific User
const getBlogsByUserId = async (req, res) => {

    try{
        const userId = req.query.userId;

        if(!userId){
            return res.status(400).json({message:"userId parameter is required"});
        }

        const blogs = await blogModel.find({ userId: userId }).populate('userId', 'Fname Lname') .sort({ createdAt: -1 });

        if(blogs.length == 0){
            res.status(204).json({ message: 'No available blogs for the specified user' });
        }else{
            res.status(200).json(blogs);
        }
    }catch(error){
        res.status(500).json({ error: error.message });
    }

};

//Get blog by Id

const getBlogById = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: "not a valid Id!"});
    }
    try{
        const blog = await blogModel.findOne({_id : id}).populate('userId', 'Fname Lname').populate({
            path: 'comments.userId',
            select: 'Fname Lname'
        }) .sort({ createdAt: -1 });
        if(!blog){
            return res.status(404).json({message : "Blog Not Found"});
        }
        console.log(blog);
        res.status(200).json(blog);
    }catch(error){
        return res.status(500).json({message:"controller error"});
    }
}


const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { location, caption, likes, message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Id is not valid!" });
    }

    try {
        const blog = await blogModel.findById(id).populate('userId', 'Fname Lname');
        if (!blog) {
            return res.status(404).json({ message: "Blog not found!" });
        }

        blog.location = location || blog.location;
        blog.caption = caption || blog.caption;
        blog.likes = likes || blog.likes;

        const userId = req.user.id; 
        // Adding a new comment
        if (message) {
            blog.comments.push({
                message,
                userId
            });
        }

        const updatedBlog = await blog.save();
        console.log(updatedBlog);

        if (!updatedBlog) {
            return res.status(404).json({ message: "Not Found!" });
        }

        res.status(201).json({ message: "Blog Updated Successfully!", data: updatedBlog });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


//Update nb of likes

const updateBlogLikes = async (req, res) => {
    const { id } = req.params;
    const { action } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Id is not valid!" });
        return;
    }

    try {
        const blog = await blogModel.findById(id).populate('userId','Fname Lname');
        if (!blog) {
            return res.status(404).json({ message: "Blog not found!" });
        }

        if (action === "like") {
            // Increase the number of likes by one
            blog.likes += 1;
        } else {
            // Handle other actions if needed
        }

        const updatedBlogLikes = await blog.save();

        if (!updatedBlogLikes) {
            return res.status(404).json({ message: "Not Found!" });
        }

        res.status(201).json({ message: "Blog Updated Successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//Delete a Blog
const deleteBlog = async (req,res) => {
    const {id,userId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "Id is not valid!"});
    }
    if(userId != req.user.id){
        return res.status(400).json({message : "You are not authorized to access this request"});
    }

    try{
        const deletedBlog = await blogModel.findByIdAndDelete(id);

        if(!deletedBlog){
            return res.status(404).json({message: "Not Found!"});
        }
        res.status(201).json({message: "Blog Deleted Succssfully!"});

    }catch(error){
        res.status(400).json({error: error.message});
    }
}

//get user from blog
const getUserByBlogId = async (req, res) => {
    try {
        const blogId = req.params.blogId; 
        const blog = await blogModel.find({ _id: blogId });

        if (!blog || blog.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        const userId = blog[0].userId; // Assuming userId is in the first blog found

        const user = await userModel.find({ _id: userId });

        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error in getUserByBlogId controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = {
    addBlog,
    getAllBlogs,
    getBlogsByUserId,
    getBlogById,
    updateBlog,
    updateBlogLikes,
    deleteBlog,
    getUserByBlogId,
};