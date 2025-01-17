const asyncHandler = require("express-async-handler");
const UserModel = require('../model/User');

module.exports={
  getAllUser:asyncHandler(async (req,res) =>{
    try{
      const users = await UserModel.find();
      res.staus(200).json(users);
    } catch (err){
      res.status(401).json({message:err.message});
    }
  }),
}
