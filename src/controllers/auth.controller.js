const Admin_schema = require("../models/Admin.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const home = async (req, res) => {
  res.status(200).json({
    message: "server is running",
  });

  return;
};

const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  try {
    const hash_pass = await bcrypt.hash(password, 12);

    const user = await Admin_schema.create({ email, password: hash_pass });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to create admin " });
    return;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email or passoword missing" });
  }

  try {
    const is_email = await Admin_schema.findOne({ email });

    if (!is_email) {
      return res.status(401).json({ message: "invalid email or password" });
    }

    const is_pass_match = await bcrypt.compare(password, is_email.password);

    if (!is_pass_match) {
      return res.status(401).json({ message: "invalid email or password" });
    }

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("samorax_jwt", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({
      message: "login success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to login" });
  }
};

const change_pass = async (req, res) => {
  const { currPass, newPass } = req.body;
  // console.log(req.body)

  if (!currPass || !newPass) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (currPass === newPass){
    return res.status(400).json({message:"new passoword should be different"})
  }

  const email = req.admin.email;
  try {
    const admin = await Admin_schema.findOne({email});
   
    const is_pass_correct = await bcrypt.compare(currPass, admin.password);

    if (!is_pass_correct) {
      return res.status(401).json({ message: "incorrect old password" });
    }
    const hashedpass = await bcrypt.hash(newPass, 12);

    await Admin_schema.findOneAndUpdate(
      { email: email },
      { password: hashedpass },
      { new: true }
    );

    res.status(201).json({ message: "password changed Success" });

    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to change pass" });
  }
};


 
const logout = (req, res) => {

try {
    res.clearCookie("samorax_jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(200).json({ message: "logged out successfully" });
} catch (error) {
  res.status(500).json({message:"failed to logout"})
}

};








module.exports = { home, createUser, login, change_pass ,logout };
