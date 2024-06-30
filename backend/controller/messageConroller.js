const Message = require("../model/MessageModel");

const SendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  try {
    const newMessage = new Message({ sender, receiver, content });
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
  const { senderId, receiverId } = useParams;
  try {
    const messages = await Message.find()
      .populate("sender", senderId)
      .populate("receiver", receiverId);
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Server error" });
  }
};

module.exports = { getMessage, SendMessage };
