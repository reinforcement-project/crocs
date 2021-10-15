import React from 'react';
import socket from '../socket';

export default function NewMessages({ currentUser, recipient, setRecipient }) {
  useEffect(() => {
    socket.auth = {
      user: currentUser,
      recipientEmail: reciopient.recipientEmail,
    };
    return () => {
      cleanup;
    };
  }, [input]);

  return <div>New Messages</div>;
}
