const Message = require("../model/MessageModel");

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

module.exports = { getMessage, SendMessage };
