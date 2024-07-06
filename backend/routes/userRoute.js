const { getFriends, addFriend } = require("../controller/UserController");
const Authorization = require("../middleware/authorization");
const router = require("express").Router();

router.route("/get-friends").get(Authorization, getFriends);
router.route("/add-friend").post(Authorization, addFriend);

module.exports = router;
