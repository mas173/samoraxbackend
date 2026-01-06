const menuSchema = require("../models/menu.schema")

const getAllactiveMenu = async(req, res)=>{

  try {
    
const data = await menuSchema.find({available:true}).select("-available")
res.status(200).json({menus:data})

  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"failed to load menus"})
  }

}

module.exports = {getAllactiveMenu}