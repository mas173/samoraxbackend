const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema({
  name:{
    type:String,
    required:"true"
  },
  price:{
    type: String
  },
  img_url:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  available:{
    type:Boolean,
    default:true
  }
})

module.exports = mongoose.model("menu",menuSchema)