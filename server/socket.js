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
  const { user } = socket;

  //
  // Join personal room (so that you can send notifications to this socket)
  socket.join(user._id);

  try {
    // A) Send new messages details
    const { newMessages } = await User.findById(user._id).select('newMessages');

    if (newMessages[0]) {
      // B) If there are new messages, send them to socket client
      socket.emit('new messages', JSON.stringify(newMessages));
    }

    //
    socket.on('connect to room', async (recipientEmail) => {
      // create room id using sender's and recipient's email
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

    socket.on('clicked new message', async (email) => {
      // { $pull: { results: { $elemMatch: { score: 8 , item: "B" } } } }
      await User.findOne({ email: socket.user.email }).exec(
        async (err, user) => {
          user.newMessages = user.newMessages.filter(
            (newMessage) => newMessage.from != email,
          );
          const updatedUser = await user.save();
          socket.emit('new messages', JSON.stringify(updatedUser.newMessages));
        },
      );
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = server;
