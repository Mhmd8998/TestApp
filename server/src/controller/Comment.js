const asyncHandler= require("express-async-handler");
const {CommentModel,validateAddComment} = require("../model/Comment");
const {PostModel}=require("../model/Post");
module.exports ={
  postComment:asyncHandler(async (req,res) =>{
    const {error} = validateAddComment(req.body);
    if (error){
      res.status(400).json({message:error.details[0].message});
    }
    const post = await PostModel.findById(req.params);
    if(!post){
      res.status(404).json({message:"Post Not Found !"});
    }
    const comment = await CommentModel.create({
      postId:req.params.id,
      userId:req.user.id,
      comment:req.body.comment
    })
    res.status(200).json(comment);
  })
}
