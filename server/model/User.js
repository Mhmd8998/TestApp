const mongoose = require('mongoose');

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
  profileImage:{
    
  }
});

module.exports = mongoose.model("User",UserSchema);
