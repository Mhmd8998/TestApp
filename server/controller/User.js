const asyncHandler = require("express-async-handler");
const {UserModel,validateUpdateUser} = require('../model/User');
const bcrypt = require("bcryptjs");

module.exports = {
  getAllUser: asyncHandler(async (req, res) => {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }),

  updateUser: asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      res.status(401).json({ message: error.message });
      return; // Ensure that the function exits after sending an error response
    }

    let newPass = undefined;
    if (req.body.password) {
      newPass = bcrypt.hashSync(req.body.password, 10);
    }

    const userUpdate = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          age:req.body.age
             }
      },
      { new: true }
    );

    res.status(200).json({ message: "update user successfully" });
  }),
  getUser:asyncHandler(async (req,res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }),
  uploadProfile: asyncHandler(async (req, res) => {
  try {
    // تحقق من وجود userId في الجسم
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'userId غير موجود في الطلب' });
    }

    // تحقق من وجود صورة تم تحميلها
    if (!req.file) {
      return res.status(400).json({ message: 'لم يتم تحميل أي صورة' });
    }

    // مسار الصورة في السيرفر
    const imagePath = `/${req.file.filename}`;

    // تحديث رابط الصورة في قاعدة البيانات
    const user = await UserModel.findByIdAndUpdate(
      userId, 
      { profilePic: imagePath }, 
      { new: true } // إعادة الكائن المحدث
    );

    if (!user) {
      return res.status(404).json({ message: 'المستخدم غير موجود' });
    }

    // إرسال المستخدم مع الصورة المحدثة
    res.json(user);
  } catch (error) {
    console.error(error); // لطباعة الخطأ في السيرفر
    res.status(500).json({ message: 'فشل تحميل الصورة' });
  }
})
        
};
