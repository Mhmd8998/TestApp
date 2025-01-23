const asyncHandler = require("express-async-handler");
const {PostModel,validateCreatePost,validateUpdatePost} = require("../model/Post");

module.exports= {
  const createPost = asyncHandler(async (req, res) => {
  // التحقق من صحة البيانات
  const { error } = validateCreatePost(req.body);
  
  if (error) {
    return res.status(400).json({ message: error.details[0].message });  // تم تصحيح typo إلى "details" واستخدام status 400
  }

  const { title, description, userId } = req.body;

  try {
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
  } catch (error) {
    // التعامل مع الأخطاء في حالة الفشل
    return res.status(500).json({ message: error.message });
  }
}),

};
