const router = require("express").Router();
const controller = require("../controller/Auth");

// المسار المصحح لنقطة النهاية للتسجيل
router.post("/register", controller.createUser);
router.post("/login", controller.login);

router.post("/logOut", controller.logOut);

module.exports = router;
