const { Login, Register } = require("../controller/authController");
const router = require("express").Router();

router.post("/register", Register);
router.route("/login").post(Login);

module.exports = router;
