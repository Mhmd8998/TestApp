const router = require('express').Router();
const validateObjectId = require("../middlewares/ValidateObjectId");
const { getAllUser, updateUser,getUser ,uploadProfile} = require('../controller/User');
const { verifyTokenAndAdmin, verifyTokenAndUserId } = require('../middlewares/verifyToken');
const upload = require("../middlewares/UploadPhoto");

// Route to get all users (only accessible to admins)
router.route('/users').get(verifyTokenAndAdmin, getAllUser);
router.route('/user/:id').get(validateObjectId,verifyTokenAndUserId, getUser);

// Route to update a user by ID (accessible to the user themselves or an admin)
router.route('/update/:id').put(validateObjectId,verifyTokenAndUserId, updateUser);
router.route("/profile/upload-peofile-photo").post(verifyTokenAndUserId,upload.single('profilePic'),uploadProfile)

module.exports = router;
