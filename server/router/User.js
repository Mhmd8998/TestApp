const router = require('express').Router();
const {getAllUser}=require('../controller/User');
const {verifyTokenAndAdmin}=require('../middlewares/verifyToken');

router.route('/users').get(verifyTokenAndAdmin,getAllUser)

module.exports = router
