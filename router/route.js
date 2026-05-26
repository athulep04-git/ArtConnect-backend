const express=require('express')
const userController=require('../controllers/userController')
const artworkController =require('../controllers/artworkController')
const jwtMiddleware = require("../middleware/jwtMiddleware");
const route=express.Router()

route.post('/api/register',userController.register)
route.post('/api/login',userController.login)
route.get('/api/getprofile',jwtMiddleware,userController.getProfile)
route.post('/api/addartwork',artworkController.addArtwork)
route.get('/api/getartworks',artworkController.getArtworks)
route.get('/api/getsingleartwork/:id',artworkController.getSingleArtwork)
route.put('/api/updateartwork/:id',artworkController.updateArtwork)
route.delete('/api/deleteartwork/:id',artworkController.deleteArtwork)

module.exports=route