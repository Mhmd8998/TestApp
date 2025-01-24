const router = require("express").Router();
const { verifyToken } = require('../middlewares/verifyToken');
const {createPost,updatePost,getAllPost} = require("../controller/Post");
const validateObjectId = require("../middlewares/ValidateObjectId");

router.route("/post")
  .post(verifyToken,createPost)
  .get(verifyToken,getAllPost)
router.route("/post/:id").put(validateObjectId,verifyToken,updatePost);

module.exports = router;
