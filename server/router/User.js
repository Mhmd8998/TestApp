const router = require('express').Router();
const {getAllUser, updateUser}=require('../controller/User');
const {verifyTokenAndAdmin,verifyTokenAndUserId}=require('../middlewares/verifyToken');

router.route('/users').get(verifyTokenAndAdmin,getAllUser)
router.route('/update/:id').put(verifyTokenAndUserId,updateUser)
module.exports = router
