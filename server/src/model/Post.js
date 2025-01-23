const mongoose = require("mongoose");
const Joi = require("joi");
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    required: true,
  },
  description: {
    type: String,
    minlength: 5,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,  // القيمة الافتراضية هي 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Assuming you are linking to a User model
    ref: "User",  // Reference to the User model
    required: true,
  },
});

const PostModel = mongoose.model("Post", PostSchema);

const validateCreatePost = (obj)=>{
  const schema = joi.object({
    title:joi.string().min(5).required(),
    description:joi.string().min(5).required(),
    userId:joi.string().required()
  })
  return schema.validate(obj);
};
const vaidateUpdatePost = (obj)=>{
  const schema = joi.object({
    title:joi.string().min(5),
    description:joi.string().min(5)
  })
  return schema.validate(obj);
}

module.exports = {
  PostModel,
  validateCreatePost,
  vaidateUpdatePost
};
