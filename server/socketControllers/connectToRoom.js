const Chat = require('../models/chatModel');
const genRoomId = require('../utils/genRoomId');
const sendMessage = require('./sendMessage');

module.exports = async (socket) => {
  // console.log('Connected: ' + socket.user._id);
  const { user, recipientEmail } = socket;
  // create room id using sender's and recipient's email
  const room = genRoomId(recipientEmail, user.email);

  try {
    let chat;
    // Check if room exists
    chat = await Chat.findOne({ room: room }).populate('messages');
    // If room does not exist, create a new one
    if (!chat) {
      chat = await Chat.create({ room: room });
    }

    // Join the room
    socket.join(room);

    // Send chat history to client
    if (chat.messages) socket.emit('messages', JSON.stringify(chat.messages));

    // Send message to room
    socket.on('message', sendMessage(socket, user, room));
  } catch (err) {
    console.log(err);
  }
};
