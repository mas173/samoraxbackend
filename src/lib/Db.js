const mongoose = require("mongoose");

const DB_Connect = async () => {
  try {
    await mongoose.connect(process.env.CONN_STRING);
    console.log("DB connected sucessfully")
  } catch (error) {
  
    console.log("error connecting to database" , error)

  }
};

module.exports = DB_Connect
