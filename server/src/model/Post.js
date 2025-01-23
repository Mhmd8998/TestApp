const mongoose= require("mongoose");

const PostSchema = mongoose.Shema({
  title:{
    type:String,
    minlength:5,
    required:true
  },
  description:{
    type:String,
    minlength:5,
    required:true
  },
  userId:
});
