const jwt = require("jsonwebtoken");
const Admin_schema = require("../models/Admin.schema");

const jwtAuth = async (req, resizeBy, next) => {
  try {
    const token = req.cookies?.samorax_jwt;
    // console.log("req received")

  if (!token) {
    return resizeBy
      .status(401)
      .json({ message: "unauthorised - token missing" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  if(!decoded){
    return resizeBy.status(401).json({message:"unauthorised- invalid token"})
  }

    
  const admin = await Admin_schema.findOne({email:decoded.email}).select("-password")

  if(!admin){
    resizeBy.status(401).json({
      message:"Unauthorised- Admin not found"
    })

    return
  }

  req.admin = decoded

  next()

  } catch (error) {
    console.log(error)
    return resizeBy.status(500).json({
      message:"failed to process the request"
    })
  }
};

module.exports = {jwtAuth}
