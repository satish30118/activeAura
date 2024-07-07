const socketIO = require('socket.io');
const Message = require('../model/MessageModel');


const socketSetup = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', async (data) => {
      const { receiverId, content } = data;
      const senderId = req.user.id;

      try {
        const message = new Message({
          senderId,
          receiverId,
          content,
        });

        await message.save();
        io.to(receiverId).emit('receiveMessage', message);
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
