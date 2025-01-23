const router = require("express").Router();
const { verifyToken } = require('../middlewares/verifyToken');
const {createPost,updatePost} = require("../controller/Post");
const validateObjectId = require("../middlewares/ValidateObjectId");
router.route("/new/post").post(verifyToken,createPost);
router.route("/put/post:id").put(validateObjectId,verifyToken,updatePost);

module.exports = router;
