const express = require("express")
const DB_Connect = require("./lib/Db")
const dotenv = require("dotenv").config()
const cors = require("cors")
const router = require("./routes/routes")
const cookie_parser = require("cookie-parser")


const app = express()
app.use(express.json())
app.use(cookie_parser())
app.use(
  cors({
    origin: ["http://localhost:5173", "https://samorax.netlify.app/"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// handle preflight
app.options("*", cors());
app.use(router)

const PORT = process.env.PORT || 3000


DB_Connect().then(()=>{
app.listen(PORT,()=>{
  console.log("server runnig on port 3000")
  
})
})
