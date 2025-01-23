const router = require("express").Router();
const { verifyToken } = require('../middlewares/verifyToken');
const {createPost,updatePost} = require("../controller/Post");

router.route("/new/post").post(verifyToken,createPost);
router.route("/put/post:id").put(verifyToken,updatePost);

module.exports = router;
