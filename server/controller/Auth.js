const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRegisterUser, validateLoginUser, UserModel } = require("../model/User");

module.exports{
  createUser:asyncHandler(async (req,res)=>{
    const {error} = validateRegisterUser(req.body);
    if (error){
      return res.status(401).json({message: error.details[0]. message});
    }
    const {username, firstname,lastname,email, password,age}= req.body;
    const user = await UserModel.findOne({email});
    if(user){
      return res.status(400).json({message:"email Already Exists"});
    }
    const hashPass = bcrypt.hashSync(password,10);
    const newUser = new UserModel({
      username:username,
      firstname:firstname,
      lastname:lastname,
      email:email,
      password:hashPass,
      age
    });
    newUser.save()
    return res.status(200).json('Created User Successfuly');
  }),
  login:asyncHandler(async (req,res)=>{
    const {error} = validateLoginUser(req.body);
    if (error){
      res.status(401).json({message:error.details[0].message});
    }
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user){
      res.status(400).json({message:"User Not Fund"});
    }
    const cheeckPass = await bycrpt.compare(password,user.password);
    if(!cheeckPass){
      return res.status(401).json({ message: "Error email or password "});
    }
    const token = user.generateAuthToken()
    return res.status(200).json({ message: "Logined successfully", token })
  })
}

