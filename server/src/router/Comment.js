const router = require("express").Router();
const validateObjectId = require("../middlewares/ValidateObjectId");
const { verifyToken } = require('../middlewares/verifyToken');
const {postComment,getComment}=require("../controller/Comment");

router.route("/comment/:id").post(validateObjectId,verifyToken,postComment);
router.route("/post/comments/:id").get(validateObjectId,verifyToken,getComment);

module.exports = router;
