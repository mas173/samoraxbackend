const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const adminschema =new mongoose.Schema({
email:{
  type:String,
  required:true
},

password:{
  type:String,
  required:true
}
})

const Admin = mongoose.model("admin",adminschema)
module.exports = Admin


