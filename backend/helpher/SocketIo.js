const socketIO = require('socket.io');
const Message = require('../model/MessageModel');

const socketSetup = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', async (data) => {
      console.log('Message received: ', data); 

      const { senderId, receiverId, content } = data;

      try {
        const message = new Message({
          senderId,
          receiverId,
          content,
        });

        await message.save();
        io.emit('receiveMessage', message); // Changed from io.to(receiverId).emit to io.emit for testing
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

module.exports = socketSetup;
