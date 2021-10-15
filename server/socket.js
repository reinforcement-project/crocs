/* eslint-disable no-param-reassign */
const app = require('./app');
const server = require('http').createServer(app);
const User = require('./models/userModel');
const Chat = require('./models/chatModel');
const genRoomId = require('./utils/genRoomId');
// const sendMessage = require("./sendMessage");
const Message = require('./models/messageModel');

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.use((socket, next) => {
  const { user } = socket.handshake.auth;

  socket.user = user;

  next();
});

io.on('connection', async (socket) => {
  // * DEV: seeing if you connected
  socket.emit('connected');

  const { user } = socket;

  try {
    // A) Send new messages details
    const { newMessages } = await User.findById(user._id).select('newMessages');
    // B)  If there are new messages, send them to socket client
    if (newMessages[0]) {
      /* console.log(newMessages); */
    }

    socket.on('connect to room', async (recipientEmail) => {
      // create room id using sender's and recipient's email
      console.log(recipientEmail);
      console.log('connected to room 👻. Recipient: ', recipientEmail);

      const room = genRoomId(recipientEmail, user.email);

      let chat;
      // Check if room exists
      chat = await Chat.findOne({ room }).populate('messages');

      // If room does not exist, create a new one
      if (!chat) {
        chat = await Chat.create({ room });
      }

      // Join the room
      socket.join(room);

      // Send chat history to client
      if (chat.messages) socket.emit('messages', JSON.stringify(chat.messages));

      // Send message to room
      socket.on('message', async (data) => {
        const { from, to, content } = JSON.parse(data);

        // Store message (in database)
        const message = await Message.create({ from, to, content, room });

        // Add message to recipient's newMessage fields
        const recipient = await User.findOne({
          email: recipientEmail,
        }).updateOne(
          {
            'newMessages.from': { $ne: user.email },
          },
          { $push: { newMessages: { from: user.email, name: user.name } } },
          {
            new: true,
            runValidators: true,
          },
        );

        // Send message to recipient
        socket.to(room).emit('message', JSON.stringify(message));
      });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = server;
