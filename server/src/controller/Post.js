const asyncHandler = require("express-async-handler");
const {PostModel,validateCreatePost,validateUpdatePost} = require("../model/Post");

module.exports= {
  createPost: asyncHandler(async (req, res) => {
  // التحقق من صحة البيانات
  const { error } = validateCreatePost(req.body);
  //فحص البيانات المدخلة
  if (error) {
    return res.status(400).json({ message: error.details[0].message });  // تم تصحيح typo إلى "details" واستخدام status 400
  }
  const { title, description} = req.body;
    // إنشاء منشور جديد
    const post = new PostModel({
      title,
      description,
      userId:req.user.id
    });
    // حفظ المنشور في قاعدة البيانات
    await post.save();    
    // إرسال استجابة ناجحة
    return res.status(200).json({ message: "Created post successfully" });
}),
  updatePost: asyncHandler(async (req, res) => {
    // التحقق من ادخال البيانات
    const { error } = validateUpdatePost(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const post = await PostModel.findById(req.params.id);
    // التحقق من وجود المنشور بعد التحديث
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    //تحقق من ان المستخدم نفسه صاحب المنشور
    if(req.user.id !== post.userId.toString()){
      return res.status(401).json({ message: "you are not allow !" });
    }
    // تحديث بيانات المنشور
    const postUpdate = await PostModel.findByIdAndUpdate(
        req.params.id,
        {$set: {
              title: req.body.title,
              description: req.body.description,
        }
        },{ new: true }).populate("userId",["-password"]);
    
    // رسالة اتمام العملية بنجاح
    return res.status(200).json(postUpdate);
}),
  getAllPost:asyncHandler(async (req,res) => {
    const posts = await PostModel.find().populate("userId",["-password -email -createdAt -updateAt"]);
    res.status(200).json(posts);
  }),
  getPostUser:asyncHandler(async(req,res)=>{
    if(!req.user.id){
      return res.status.(404).json({message:"user is not access"});
    }
    const PostUser= await PostModel.find({userId:req.user.id}).populate("userId",["-password -email -createdAt -updateAt"]);
    if(!PostUser || PostUser.length === 0){
      return res.status(404).json({message:"Not have any Post"});
    }
    return res.status(200).json(PostUser);
  })
                                    

};
