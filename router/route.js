const express=require('express')
const userController=require('../controllers/userController')
const jwtMiddleware = require("../middleware/jwtMiddleware");
const route=express.Router()

route.post('/api/register',userController.register)
route.post('/api/login',userController.login)
route.get('/api/getprofile',jwtMiddleware,userController.getProfile)
module.exports=route