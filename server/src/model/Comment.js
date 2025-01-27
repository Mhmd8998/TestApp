const mongoose = require("mongoose");
const Joi = require("joi");

const CommentSchema = mongoose.Schema({
  postId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  comment:{
    type:String,
    required:true,
    minlength:3
  }
},{ timestamps:true});
const CommentModel = mongoose.model("Comment",CommentSchema);

const validateAddComment =(obj)=>{
  const schema = Joi.object({
    comment:Joi.string().required()
  })
  return schema.validate(obj);
}

module.exports = {
  CommentModel,
  validateAddComment
}
