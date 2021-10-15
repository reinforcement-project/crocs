import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import socket from '../socket';

export default function NewMessages({
  currentUser,
  recipient,
  setRecipient,
  newMessagesInfo,
  setNewMessagesInfo,
}) {
  const handleClick = (email, name) => (e) => {
    // e.preventDefault();

    socket.emit('clicked new message', email);

    setNewMessagesInfo(
      newMessagesInfo.filter((newMessage) => newMessage.email != email),
    );

    setRecipient({ email, name });
  };

  const newMessagesList = newMessagesInfo.map(({ from, name, _id }) => (
    <div key={_id} className="NewMessages--user">
      <Link to="/main" onClick={handleClick(from, name)}>
        {name}
      </Link>
    </div>
  ));

  return <div className="NewMessages">{newMessagesList}</div>;
}
