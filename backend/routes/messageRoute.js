const { SendMessage, getMessage } = require("../controller/messageConroller");
const router = require("express").Router();

router.route("/send-message").post(SendMessage);
router.route("/get-message/:senderId/:receiverId").get(getMessage);

module.exports = router;
