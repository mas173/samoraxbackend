const express = require("express")
const { home, createUser, login, change_pass, logout } = require("../controllers/auth.controller")
const { jwtAuth } = require("../middlewares/jwtAuth")
const { offerBanner, getoffer } = require("../controllers/offer.controller")
const { createFeedback, getAllfeedback, removeFeedback, updateHighlight, getHighlight } = require("../controllers/feedback.controller")


const router = express.Router()


router.get("/",home)
router.post("/admin/create",createUser)
router.post("/admin/login",login)
router.put("/admin/changepass",jwtAuth,change_pass)
router.post("/admin/logout",jwtAuth,logout)
router.post("/admin/update/offer",jwtAuth,offerBanner)
router.get("/offers",getoffer)

// feedback rotues
router.post("/costumer/feedback/create",createFeedback)
router.get("/costumer/feedbacks",jwtAuth,getAllfeedback)
router.post("/costumer/feedback/remove",jwtAuth,removeFeedback)
router.post("/costumer/feedback/update",jwtAuth,updateHighlight)
router.get("/costumer/feedback/highlight",getHighlight)

router.get("/admin/me",jwtAuth, (req,res)=>{
res.status(200).json({email:req.admin.email})
})


module.exports = router