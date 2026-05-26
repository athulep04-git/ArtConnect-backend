const Artwork =require('../models/artworkModel')

// ADD ARTWORK
exports.addArtwork =async (req,res)=>{
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