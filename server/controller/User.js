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
  uploadProfile:asyncHandler(async (req,res)=>{
    console.log(req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded!" }); // في حال لم يتم رفع صورة
  }

  res.status(200).json({
    message: "Upload Photo Profile is successfully",
    file: req.file // يمكنك إضافة معلومات الملف المرفوع في الاستجابة إن أردت
  });
})    
};
