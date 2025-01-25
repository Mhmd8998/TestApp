const router = require("express").Router();
const { verifyToken } = require('../middlewares/verifyToken');
const {createPost,updatePost,getAllPost,getPostUser} = require("../controller/Post");
const validateObjectId = require("../middlewares/ValidateObjectId");

router.route("/post")
  .post(verifyToken,createPost)
  .get(verifyToken,getAllPost)
router.route("/post/user").get(verifyToken,getPostUser)
router.route("/post/:id").put(validateObjectId,verifyToken,updatePost);
router.route("/profile").get(verifyToken,getProfile);

module.exports = router;
