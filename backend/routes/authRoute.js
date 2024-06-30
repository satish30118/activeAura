const { Login, Register } = require("../controller/authController")
const router = require("express").Router();

router.route("/register").post(Register);
router.route("/login").post(Login);

module.exports = router;
