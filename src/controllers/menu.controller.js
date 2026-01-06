const menuSchema = require("../models/menu.schema");

const addMenu = async(req ,res)=>{

  const {name , description ,price }= req.body;
  console.log(name ,description ,price)
  
  const imageUrl = res.locals.image?.url;

  if(!imageUrl){
    return res.status(400).json({message:"Image url is missing"})
  }

  if(!name || !description || !price){
    return res.status(400).json({msg:"Please enter all the fields"})
  }

  const menu =await menuSchema.create({
    name, img_url:imageUrl , description, price 
  })

  return res.status(201).json({msg:"Menu added successfully", menu:menu})

  
}

const getAllmenu= async(req,res)=>{
  try {
    
    const all_menu = await menuSchema.find()
    
     return res.status(200).json({message:"All availabe menus",
      all_menu
     })


  } catch (error) {
    console.log(error)
      return res.status(500).json({message:"failed to fetch menus"})
    
  }
}



module.exports = {addMenu , getAllmenu}