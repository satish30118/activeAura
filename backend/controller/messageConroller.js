const Message = require("../model/MessageModel");
const Notification = require("../model/NotificationModel");

const SendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;

  try {
    const newMessage = new Message({ senderId, receiverId, content });
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      details: newMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getMessage = async (req, res) => {
  const { receiverId } = req.params;
  const senderId = req.user.id;
  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort("timestamp");
    res.json({ success: true, message: "Message found", details: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getNotification = async (req, res) => {
  const receiverId = req.user.id;
  try {
    const notification = await Notification.find({
      receiverId,
    })
    res.json({
      success: true,
      message: "Notification found",
      details: notification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const deleteNotification = async (req, res) => {
  const { senderId } = req.params;
  const receiverId = req.user.id;
  try {
    const notification = await Notification.remove({
      senderId,
      receiverId,
    });
    res.json({
      success: true,
      message: "Notification deleted ",
      details: notification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getMessage,
  SendMessage,
  getNotification,
  deleteNotification,
};
