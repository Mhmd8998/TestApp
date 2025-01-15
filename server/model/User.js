const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    minlength:5
  },
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    minlength:5
  },
  password:{
    type:String,
    required:true,
    minlength:8
  },
  age:Number,
  bio:String,
  imageProfile: {
    type: Object,
    default: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      publicId: null
    },
  isAdmin: {
    type: Boolean,
    default: false
  }
},{timestamps:true});

UserSchema.methods.generateAuthToken= function (){
  jwt.sign({id:this._id,isAdmin:this.isAdmen},"SECRET");
}

const UserModel = mongoose.model("User",UserSchema);

const validateRegisterUser = (obj)=>{
  const schema = joi.object({
    username:joi.string().trim().max(100).min(3).required(),
    email:joi.string().trim().max(100).min(3).required().email(),
    password:joi.string().trim().max(100).min(8).required(),
    firstname:joi.string().max(100).min(3).required(),
    lastname:joi.string().max(100).min(3).required(),
    age:joi.string().trim().max(100).min(3).required(),
  })
}
module.exports{
  UserModel,
}
