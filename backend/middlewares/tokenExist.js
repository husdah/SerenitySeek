const ifHaveToken = async(req,res,next)=>{
    let token;
    let authHeader= req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token=authHeader.split(" ")[1];

        if(token)
        {
            return res.status(401).json({error:"You are Already Logged in and have an account"});
        }else{
            next();
        }
    }else{
        next();
    } 
}
module.exports = ifHaveToken;