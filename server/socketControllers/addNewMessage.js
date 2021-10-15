const User = require('../models/userModel');

const addNewMessage = async (sender, recipientEmail) => {
  // Add message to recipient's newMessage field
  const recipient = await User.findOne({ email: recipientEmail }).updateOne(
    {
      'newMessages.from': { $ne: sender.email },
    },
    { $push: { newMessages: { from: sender.email, name: sender.name } } },
    {
      new: true,
      runValidators: true,
    },
  );
};

module.exports = addNewMessage;
