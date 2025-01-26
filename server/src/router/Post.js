const router = require("express").Router();
const validateObjectId = require("../middlewares/ValidateObjectId");
const { verifyToken } = require('../middlewares/verifyToken');
const {createPost,updatePost,getAllPost} = require("../controller/Post");
const validateObjectId = require("../middlewares/ValidateObjectId");

router.route("/post")
  .post(verifyToken,createPost)
  .get(verifyToken,getAllPost)
router.route("/post/:id").put(validateObjectId,verifyToken,updatePost);
router.route("like/:id").put(verifyToken,validateObjectId,likeHandler)
module.exports = router;
