const isAdmin = async(req,res,next)=>{
    const role = req.user.role;

    if(role == 0){
        next();
    }else{
        return res.status(400).json({message : "Only Admin is allowed to access is request"});
    }
}

const isCompany = async(req,res,next)=>{
    const role = req.user.role;

    if(role == 2){
        next();
    }else{
        return res.status(400).json({message : "Only Companies are allowed to access is request"});
    }
}

const isUser = async(req,res,next)=>{
    const role = req.user.role;

    if(role == 1){
        next();
    }else{
        return res.status(400).json({message : "Only Users are allowed to access is request"});
    }
}

module.exports = 
{
    isAdmin,
    isCompany,
    isUser
};