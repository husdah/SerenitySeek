const jwt=require('jsonwebtoken');

const validateToken=async(req,res,next)=>{
    let token;
    let authHeader=req.header.Authorization || req.header.authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err)
            {
                res.status(400).json({error:"User is not authorized"})
            }
            req.user=decoded.user;
            next();
        })
        if(!token)
        {
            res.status(400).json({error:"Missing token"})
        }
    }
   
}
module.exports=validateToken;