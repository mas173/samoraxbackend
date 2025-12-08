const mongoose= require("mongoose")

const offerSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  status:{
     type: Boolean,
    enum: [true, false],
    default: false
  }
}, { timestamps: true })

 const offerdata = mongoose.model("offers",offerSchema)
 
 module.exports = offerdata

