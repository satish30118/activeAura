const socketIO = require("socket.io");
const Message = require("../model/MessageModel");

const socketSetup = (server) => {
  const io = socketIO(server, {
    pingTimeout: 60000, // Increase timeout
    pingInterval: 25000, // Set ping interval
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("sendMessage", async (data) => {
      console.log("Message received: ", data);

      const { senderId, receiverId, content } = data;

      try {
        const message = await new Message({
          senderId,
          receiverId,
          content,
        }).save();

        io.to(receiverId).emit("receiveMessage", message);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

module.exports = socketSetup;
