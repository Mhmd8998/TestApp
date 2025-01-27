const router = require("express").Router();
const validateObjectId = require("../middlewares/ValidateObjectId");
const { verifyToken } = require('../middlewares/verifyToken');
const {postComment}=require("../controller/Comment");

router.route("/comment/:id").post(validateObjectId,verifyToken,postComment);

module.exports = router;
