const jwt=require('jsonwebtoken')
const jwtMiddleware=(req,res,next)=>{
    console.log("Inside jwt Middleware")
    console.log(req.headers.authorization);
    try{
    const token=req.headers.authorization.slice(7)
    const jwtverification=jwt.verify(token,process.env.jwtkey)
    console.log(jwtverification);
    req.payload=jwtverification.userId
    next()
    }
    catch(err){
        res.status(402).json("Authorization Error"+err) 
    }
}
module.exports=jwtMiddleware