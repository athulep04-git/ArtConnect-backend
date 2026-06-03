const express=require('express')
const userController=require('../controllers/userController')
const artworkController =require('../controllers/artworkController')
const jwtMiddleware = require("../middleware/jwtMiddleware");
const route=express.Router()
const multerConfig =require('../middleware/multerMiddleware')

route.post('/api/register',userController.register)
route.post('/api/login',userController.login)
route.get('/api/getprofile',jwtMiddleware,userController.getProfile)
route.post('/api/addartwork',jwtMiddleware,multerConfig.single('image'),artworkController.addArtwork)
route.get('/api/getartworks',artworkController.getArtworks)
route.get('/api/getsingleartwork/:id',artworkController.getSingleArtwork)
route.put('/api/updateartwork/:id',jwtMiddleware,artworkController.updateArtwork)
route.delete('/api/deleteartwork/:id',jwtMiddleware,artworkController.deleteArtwork)
route.get('/api/getallusers',userController.getAllUsers)
module.exports=route