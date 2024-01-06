// ChatScreen.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './ChatScreen.css';

const ChatScreen = ({ userType, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      user: userType,
      text: newMessage,
    };

    // Emit the message to the server
    socket.emit('message', message);

    // Update local state
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user === 'trainer' ? 'trainer-message' : 'client-message'}`}
          >
            <span className="message-sender">{message.user === 'trainer' ? 'Trainer' : 'Client'}:</span>
            <span className="message-text">{message.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;
