const router = require("express").Router();
const { verifyToken } = require('../middlewares/verifyToken');
const {createPost,updatePost} = require("../controller/Post");
const validateObjectId = require("../middlewares/ValidateObjectId");

router.route("/post").post(verifyToken,createPost);
router.route("/post:id").put(validateObjectId,verifyToken,updatePost);

module.exports = router;
