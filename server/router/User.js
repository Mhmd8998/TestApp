const router = require('express').Router();
const validateObjectId = require("../middlewares/ValidateObjectId");
const { getAllUser, updateUser } = require('../controller/User');
const { verifyTokenAndAdmin, verifyTokenAndUserId } = require('../middlewares/verifyToken');

// Route to get all users (only accessible to admins)
router.route('/users').get(verifyTokenAndAdmin, getAllUser);

// Route to update a user by ID (accessible to the user themselves or an admin)
router.route('/update/:id').put(validateObjectId,verifyTokenAndUserId, updateUser);

module.exports = router;
