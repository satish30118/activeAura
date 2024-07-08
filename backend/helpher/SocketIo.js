const socketIO = require("socket.io");
const Message = require("../model/MessageModel");
const User = require("../model/UserModel");

const socketSetup = (server) => {
  const io = socketIO(server);
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("A user connected with id: ", socket.id);

    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log("All online users: ", onlineUsers);
    });

    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId, content } = data;

      try {
        const message = new Message({
          senderId,
          receiverId,
          content,
        });

        await message.save();

        if (onlineUsers.has(receiverId)) {
          io.to(onlineUsers.get(receiverId)).emit("receiveMessage", message);
          io.to(onlineUsers.get(senderId)).emit("receiveMessage", message);
        } else {
          console.log(`You have a new message from ${senderId}: ${content}`);
          const notification = await Notification({
            senderId,
            receiverId,
          }).save();
        }
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      onlineUsers.forEach((socketId, userId) => {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
        }
      });
    });
  });

  return io;
};

module.exports = socketSetup;
