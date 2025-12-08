const offerSchema = require("../models/offer")



const offerBanner = async(req,res)=>{

  const {title , status}= req.body

  if(!title){
    return res.status(400).json({message:"All fields are required"})
  }

    try {
       const offerdoc = await offerSchema.findOneAndUpdate(
      {}, 
      { title, status },
      { new: true, upsert: true }
    );

    return res.status(201).json({message:"offer createe ..!", offer:offerdoc})
    } catch (error) {
      
console.log(error)
return res.status(500).json({message:"failed to create offer. "})

    }
  }
const getoffer =async (req,res)=>{

try {
    const offers = await offerSchema.find()

    return res.status(200).json(offers)

} catch (error) {
console.log(error)
  return res.status(500).json({
    message:"failed to fetch the offers"
  })
  
}
}
  
module.exports = {offerBanner ,getoffer}
