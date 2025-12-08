const mongoose = require('mongoose');

const feedback = new mongoose.Schema({
  name:{
    type:String,
   required:true
  },
  review:{
    type:String,
    required:true
  },
  rating:{
    type:String,
    required:true
  },
  highlighted:{
    type:String,
    enum:[true,false],
    default:false
  }
  
}, { timestamps: true })

module.exports = mongoose.model("feedback",feedback)