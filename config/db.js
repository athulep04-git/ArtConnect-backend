const mongoose=require('mongoose')
mongoose.connect(process.env.connectionString).then(()=>{
console.log("mongodb connected");
})
.catch(err=>{
console.log("mongodb connection error "+err);
})
