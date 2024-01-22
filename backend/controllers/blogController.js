const blogModel = require('../models/Blog');
const validator = require('validator');
const {default:mongoose} = require('mongoose');

//Add Blog
const addBlog = async (req,res) => {
    const {userId, location , companyId, caption, gallery, comments} = req.body;

    if (!validator.isLength(caption, { min: 1, max: 255 })) {
        return res.status(400).json({ message: 'Caption must be between 1 and 255 characters long' });
    }
    if (!Array.isArray(gallery) || gallery.some(image => !validator.isURL(image))) {
        return res.status(400).json({ message: 'Invalid gallery format' });
    }

    try{
        const addedBlog = await blogModel.create({
            userId : userId,
            location : location,
            companyId : companyId,
            caption : caption,
            gallery : gallery,
            comments: comments || [],
        });

        res.status(201).json({message:'Blog added successfully!'});

    }catch(error){
        res.status(400).json({error:error.message});
    }
}

//Get All Blogs
const getAllBlogs = async (req,res) => {
    try{
        const blogs = await blogModel.find();
        if (blogs.length === 0) {
            return res.status(204).json({ message: 'No available blogs' });
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

        const blogs = await blogModel.find({ userId: userId }).sort({ createdAt: -1 });

        if(blogs.length == 0){
            res.status(204).json({ message: 'No available blogs for the specified user' });
        }else{
            res.status(200).json({blogs});
        }
    }catch(error){
        res.status(500).json({ error: error.message });
    }

};

//Update a Blog
const updateBlog = async (req,res) => {
    const {id} = req.params;
    const {location,companyId,caption,comments} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "Id is not valid!"});
    }
    if(id != req.user.id){
        return res.status(400).json({message : "You are not authorized to access this request"});
    }

    try{
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found!" });
        }

        blog.location = location || blog.location;
        blog.companyId = companyId || blog.companyId;
        blog.caption = caption || blog.caption;
    
        if (comments && comments.length > 0) {
            blog.comments.push(...comments);
        }

        const updatedBlog = await blog.save();

        if(!updatedBlog){
            return res.status(404).json({message: "Not Found!"});
        }

        res.status(201).json({message: "Blog Updated Succssfully!"});
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

//Delete a Blog
const deleteBlog = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "Id is not valid!"});
    }
    if(id != req.user.id){
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


module.exports = {
    addBlog,
    getAllBlogs,
    getBlogsByUserId,
    updateBlog,
    deleteBlog
};