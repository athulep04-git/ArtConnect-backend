const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(406).json("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "Registration successful", newUser });
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.login=async(req,res)=>{
  const {email,password}=req.body
  try{
    const existingUser=await User.findOne({email})
    if(!existingUser){
      return res.status(404).json("User not found")
    }
    const passwordMatch=await bcrypt.compare(password,existingUser.password)
    if(!passwordMatch){
      return res.status(401).json("Incorrect password")
    }
    res.status(200).json({message:"Login successful",existingUser})
  }
catch(err){
  res.status(500).json(err)
}
}