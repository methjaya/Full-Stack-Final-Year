
import React, { useState, useEffect } from 'react';
import './ChatScreen.css';
import Auth from "../utils/auth"

const ChatScreen = ({ userType }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const token = Auth.getJwtToken();
  const name = Auth.getProfile().name;
  console.log(name);

  useEffect(() => {

    const newSocket = new WebSocket(`ws://localhost:8080/${token}`);

    // Set up event listeners or any other configuration
    newSocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    newSocket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);     

      const message = {
        user: 'notme',
        text: parsedData.text,
        name : parsedData.name
      };
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Save the socket instance in state
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const sendMessage = () => {
    try {
      if (newMessage.trim() === '') return;

      const message = {
        user: userType,
        text: newMessage,
        name: name
      };

      // Check if the socket is open before sending a message
      if (socket && socket.readyState === WebSocket.OPEN) {
        // Send the message to the server
        socket.send(JSON.stringify(message));

        setMessages([...messages, message]);
        setNewMessage('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="chat-container" style={{width : "50%",height:"50%"}}>
      <div className="chat-messages" style={{}}>
        {messages.map((message, index) => {
         return (
            <div
              key={index}
              className={`message ${message.user === 'notme' ? 'trainer-message' : 'client-message'}`}
              style={{display:"flex", marginLeft:"auto", marginRight:"auto"}}
            >
              <span className="message-sender" style={{color:'yellow'}}>{message.name} :</span>
              <span className="message-text" style={{padding: '0 10px'}}>{message.text}</span>
            </div>
          )
        })}
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






// // ChatScreen.js
// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import './ChatScreen.css';

// const ChatScreen = ({ userType, socket }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     // Listen for incoming messages
//     socket.on('message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.off('message');
//     };
//   }, [socket]);

//   const sendMessage = () => {
//     if (newMessage.trim() === '') return;

//     const message = {
//       user: userType,
//       text: newMessage,
//     };

//     // Emit the message to the server
//     socket.emit('message', message);

//     // Update local state
//     setMessages([...messages, message]);
//     setNewMessage('');
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`message ${message.user === 'trainer' ? 'trainer-message' : 'client-message'}`}
//           >
//             <span className="message-sender">{message.user === 'trainer' ? 'Trainer' : 'Client'}:</span>
//             <span className="message-text">{message.text}</span>
//           </div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatScreen;























































// import React, { useState, useEffect } from 'react';

// const ChatScreen = () => {
//   const [socket, setSocket] = useState(null);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     try {
//       // Initialize WebSocket connection
//       const newSocket = new WebSocket('ws://localhost:8081');

//       // Set up event listeners or any other configuration
//       newSocket.onopen = () => {
//         console.log('WebSocket connection opened');
//       };

//       // Handle incoming messages
//       newSocket.onmessage = (event) => {
//         const message = JSON.parse(event.data);
//         console.log('Received message:', message);
//         // Handle the incoming message as needed
//       };

//       // Clean up WebSocket connection on component unmount
//       // return () => {
//       //   newSocket.close();
//       // };

//       // Set the WebSocket instance to state
//       setSocket(newSocket);
//     } catch (e) {
//       console.log(e);
//     }

//   }, []);

//   const sendMessage = () => {
//     try{
//       if (!socket || newMessage.trim() === '') return;

//       const message = {
//         text: newMessage,
//       };
  
//       // Send the message to the server
//       socket.send(JSON.stringify(message));
  
//       // Reset input field
//       setNewMessage('');
//     }catch(e){
//       console.log(e);
//     }

//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatScreen;

