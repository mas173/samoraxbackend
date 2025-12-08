const express = require("express")
const DB_Connect = require("./lib/Db")
const dotenv = require("dotenv").config()
const cors = require("cors")
const router = require("./routes/routes")
const cookie_parser = require("cookie-parser")


const app = express()
app.use(express.json())
app.use(cookie_parser())
app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true
}))

app.use(router)




DB_Connect().then(()=>{
app.listen(3000,()=>{
  console.log("server runnig on port 3000")
  
})
})
