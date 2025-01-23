const asyncHandler = require("express-async-handler");
const {PostModel,validateCreatePost,validateUpdatePost} = require("../model/Post");

module.exports= {
  const createPost = asyncHandler(async (req, res) => {
  // التحقق من صحة البيانات
  const { error } = validateCreatePost(req.body);
  //فحص البيانات المدخلة
  if (error) {
    return res.status(400).json({ message: error.details[0].message });  // تم تصحيح typo إلى "details" واستخدام status 400
  }
  const { title, description, userId } = req.body;
    // إنشاء منشور جديد
    const post = new PostModel({
      title,
      description,
      userId,
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
    // تحديث بيانات المنشور
    const post = await PostModel.findByIdAndUpdate(
        req.params.id,
        {$set: {
              title: req.body.title,
              description: req.body.description,
        }
        },{ new: true });
    // التحقق من وجود المنشور بعد التحديث
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    // رسالة اتمام العملية بنجاح
    return res.status(200).json({ message: "Updated Post Successfully", post });
})
                                    

};
