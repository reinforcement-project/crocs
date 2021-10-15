module.exports = (socket, next) => {
  const { user, recipientEmail } = socket.handshake.auth;

  socket.user = user;
  socket.recipientEmail = recipientEmail;
  // socket.room = room;

  next();
};
