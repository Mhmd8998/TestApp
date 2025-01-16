const router = require("express").Router();
const controller = require("../controller/Auth");

router.post("register",controller.createUser);
router.post("/login",controller.login);

module.exports =router;
