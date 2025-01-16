const router = require("express").Router();
const controller = require("../controller/Auth");

router.post("/Register",controller.createUser);
router.post("/Login",controller.login);

module.exports =router;
