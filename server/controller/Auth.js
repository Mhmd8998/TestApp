const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRegisterUser, validateLoginUser, UserModel } = require("../model/User");

module.exports = {
  createUser: asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
      return res.status(401).json({ message: error.details[0].message });
    }

    const { username, firstname, lastname, email, password, age } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPass = bcrypt.hashSync(password, 10);
    const newUser = new UserModel({
      username,
      firstname,
      lastname,
      email,
      password: hashPass,
      age,
    });

    await newUser.save();
    return res.status(200).json('User created successfully');
  }),

  login: asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
      return res.status(401).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const userId = user._id
    const token = user.generateAuthToken();
    return res.status(200).json({ message: "Logged in successfully", token ,userId});
  })
};
