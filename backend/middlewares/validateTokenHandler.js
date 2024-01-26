const jwt=require('jsonwebtoken');

const validateToken = async(req,res,next)=>{
    let token;
    let authHeader= req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token=authHeader.split(" ")[1];

        if(!token)
        {
            return res.status(401).json({error:"Missing token or user not authorized"});
        }
        
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err)
            {
                return res.status(401).json({error:"User is not authorized2"});
            }
            req.user=decoded.user;
            next();
        })
    }else {
        return res.status(401).json({error:"User is not authorized"});
    } 
}
module.exports=validateToken;