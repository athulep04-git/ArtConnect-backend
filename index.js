require('dotenv').config()
const express=require('express')
const cors=require('cors')
require('./config/db')
const server=express()

const route=require('./router/route')
server.use(cors())
server.use(express.json())
server.use(route)
const PORT=process.env.PORT||3000

server.get('/',(req,res)=>{
res.send("welcome to ArtConnect server");
})
server.listen(PORT,()=>{
console.log(`server running on port ${PORT}`);
})
