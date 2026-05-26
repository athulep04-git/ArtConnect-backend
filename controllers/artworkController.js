const Artwork =require('../models/artworkModel')

// Add artwork
exports.addArtwork =async (req,res)=>{
    if(req.role!='artist'){
        return res.status(403).json("Access denied")
    }
  const {title,description,category,image,startingPrice,isAvailable}=req.body
  try{
    const newArtwork =new Artwork({title,description,category,image,startingPrice,isAvailable})
    await newArtwork.save()
    res.status(200).json({message:"Artwork added",newArtwork})
  }
  catch(err){
    res.status(500).json(err)
  }
}

// Get all artworks
exports.getArtworks =async (req,res)=>{
  try{
    const allArtworks =await Artwork.find()
    res.status(200).json(allArtworks)
  }
  catch(err){
    res.status(500).json(err)
  }
}

//get one artwork
exports.getSingleArtwork=async (req,res)=>{
    const {id}=req.params
  try{
    const singleArtwork =await Artwork.findById(id)
    if(singleArtwork){
        res.status(200).json(singleArtwork)
    }
    else{
        res.status(404).json("Artwork not found")
    }
  }
  catch(err){
    res.status(500).json(err)
  }
}

//update artwork
exports.updateArtwork=async(req,res)=>{
    if(req.role!='artist'){
        return res.status(403).json("Access denied")
    }
const {id}=req.params
const {title,description,category,image,startingPrice,isAvailable}=req.body

try{
    const updatedArtwork=await Artwork.findByIdAndUpdate(id,{title,description,category,image,startingPrice,isAvailable},{returnDocument:'after'})
    res.status(200).json({message:"Artwork updated",updatedArtwork})
}
catch(err){
    res.status(500).json(err)
}
}


//delete artwork
exports.deleteArtwork=async(req,res)=>{
    if(req.role!='artist'){
        return res.status(403).json("Access denied")
    }
const {id}=req.params
const {title,description,category,image,startingPrice,isAvailable}=req.body

try{
    await Artwork.findByIdAndDelete(id)
    res.status(200).json("Artwork deleted successfully")
}
catch(err){
    res.status(500).json(err)
}
}