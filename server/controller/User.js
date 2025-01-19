const asyncHandler = require("express-async-handler");
const {UserModel,validateUpdateUser} = require('../model/User');
const bcrypt = require("bcryptjs");
module.exports={
  getAllUser:asyncHandler(async (req,res) =>{
    try{
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (err){
      res.status(401).json({message:err.message});
    }
  }),
  updateUser:asyncHandler(async (req,res)=>{
    const {error} = validateUpdateUser(req.body);
    if(error){
      res.status(401).json({message:error.message});
    }
    if (req.body.password){
      const newPass = bcrypt.hashSync(req.body.password,10)
    }
    
    const userupdate = await UserModel.findByIdAndUpdate(req.params.id,{
      $set{
         username:req.body.username,
         bio:req.body.bio,
         firstname:req.body.firstname,
         lastname:req.body.lastname,
         password:newPass
      }
    },{new:true});
    res.status(200).json({message:"update user successfully"});
  }),
}
