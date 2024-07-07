const { getFriends, addFriend, searchUsers } = require("../controller/UserController");
const Authorization = require("../middleware/authorization");
const router = require("express").Router();

router.route("/get-friends").get(Authorization, getFriends);
router.route("/add-friend").post(Authorization, addFriend);
router.route("/search-users/:query").get(Authorization, searchUsers);


module.exports = router;
