const jwt=require('jsonwebtoken')
const jwtMiddleware=(req,res,next)=>{
    console.log("Inside jwt Middleware")
    console.log(req.headers.authorization);
    try{
    const token=req.headers.authorization.slice(7)
    const jwtverification=jwt.verify(token,process.env.jwtkey)
    console.log(jwtverification);
    req.payload=jwtverification.userId
    req.role=jwtverification.role
    req.email=jwtverification.userMail
    next()
    }
    catch(err){
        res.status(401).json("Authorization Error"+err) 
    }
}
module.exports=jwtMiddleware