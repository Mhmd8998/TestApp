const router = require("express").Router();
const { verifyToken } = require('../middlewares/verifyToken');
const {createPost,updatePost,getAllPost,likeHandler} = require("../controller/Post");
const validateObjectId = require("../middlewares/ValidateObjectId");

router.route("/post")
  .post(verifyToken,createPost)
  .get(verifyToken,getAllPost)
router.route("/post/:id").put(validateObjectId,verifyToken,updatePost);
router.route("/like/:id").put(validateObjectId,verifyToken,likeHandler)
module.exports = router;
