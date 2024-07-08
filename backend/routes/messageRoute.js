const { SendMessage, getMessage } = require("../controller/messageConroller");
const Authorization = require("../middleware/authorization");
const router = require("express").Router();

router.route("/send-message").post(Authorization, SendMessage);
router.route("/get-message/:receiverId").get(Authorization, getMessage);
router.route("/get-notification").get(Authorization, getMessage);
router.route("/delete-notification/:senderId").delete(Authorization, getMessage);



module.exports = router;
