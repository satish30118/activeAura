const { SendMessage, getMessage, getNotification, deleteNotification } = require("../controller/messageConroller");
const Authorization = require("../middleware/authorization");
const router = require("express").Router();

router.route("/send-message").post(Authorization, SendMessage);
router.route("/get-message/:receiverId").get(Authorization, getMessage);
router.route("/get-notification").get(Authorization, getNotification);
router.route("/delete-notification/:senderId").delete(Authorization, deleteNotification);



module.exports = router;
