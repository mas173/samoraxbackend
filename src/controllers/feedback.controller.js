const feedbackSchema = require("../models/feedback");
const createFeedback = async (req, res) => {
  const { name, review, rating } = req.body;

  if (!name || !review || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const feedback = await feedbackSchema.create({ name, review, rating });

    return res
      .status(201)
      .json({ message: "feedback submmited", feedback: feedback });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to submit feedback" });
  }
};

const getAllfeedback = async (req, res) => {
  try {
    const feedbacks = await feedbackSchema.find().sort({ createdAt: -1 });

    res.status(200).json( feedbacks );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to fetch feedbacks" });
  }
};

const removeFeedback = async (req ,res)=>{

  const {id} = req.body 

  if(!id){
    res.status(400).json({message:"id is required .. invalid request "})
  }

  try {
    await feedbackSchema.findByIdAndDelete(id)

    res.status(200).json({meesage:" feedback deleted "})
  } catch (error) {
    console.log(error)

   res.status(500).json({message:"failed to delete "})
  }
  
}

const updateHighlight = async (req,res)=>{

  const {id , highlighted} = req.body

  if(!id) return res.status(400).json({message:"id is required"})

try {
    await feedbackSchema.findByIdAndUpdate(id , {highlighted:highlighted})
    return res.status(201).json({message:"feedback updated"})
} catch (error) {
  console.log(error)
  return res.status(500).json({message:"failed to update the feedback"})
}
}

const getHighlight = async (req,res)=>{

try {
  const highlight = await feedbackSchema.find({highlighted:true}).select("-highlighted -_id -__v -updatedAt -createdAt").sort({ createdAt: -1})
  res.status(200).json(highlight)
} catch (error) {
  console.log(error)
  res.status(500).json({message:"failed to fetch highlight feedbacks"})
}

}
module.exports = { createFeedback ,getAllfeedback , removeFeedback , updateHighlight , getHighlight};
