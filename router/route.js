const express=require('express')
const userController=require('../controllers/userController')
const route=express.Router()

route.post('/api/register',userController.register)

module.exports=route