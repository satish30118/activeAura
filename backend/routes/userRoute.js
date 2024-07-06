const getProfile = require("../controller/UserController");
const Authorization = require("../middleware/authorization");
const router = require("express").Router();

router.route("/get-friends").get(Authorization, getProfile);
router.route("/add-friend").get(Authorization, getProfile.addFriend);

module.exports = router;
