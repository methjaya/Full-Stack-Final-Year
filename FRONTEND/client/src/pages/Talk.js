import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { getMe } from '../utils/API';
import Auth from "../utils/auth"
import { formatDate } from '../utils/dateFormat';
import Header from "../components/Header";
import cardioIcon from "../assets/images/cardio.png"
import resistanceIcon from "../assets/images/resistance.png"
import { io } from 'socket.io-client';

// Chat component
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
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.user === 'trainer' ? 'Trainer: ' : 'Client: '}
            {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default function History() {
  const [userData, setUserData] = useState({});
  const [exerciseData, setExerciseData] = useState([])
  const [displayedItems, setDisplayedItems] = useState(6);
  const [socket, setSocket] = useState(null);

  const loggedIn = Auth.isLoggedIn();
  let currentDate;

  // everytime loggedIn/userdata changes, the getuserdata runs
  useEffect(() => {
    const getUserData = async () => {
      try {
        //get token
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const response = await getMe(token)

        if (!response.ok) {
          throw new Error("something went wrong!")
        }

        const user = await response.json()

        // combine cardio and resistance data together
        if (user.cardio && user.resistance) {
          const cardio = user.cardio;
          const resistance = user.resistance;
          const exercise = cardio.concat(resistance);

          // sort exercise data by date
          exercise.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
          })

          //format date in exercise data
          exercise.forEach(item => {
            item.date = formatDate(item.date)
          });

          setUserData(user);
          setExerciseData(exercise)
        }
      } catch (err) { console.error(err) }
    };
    getUserData();

    // Connect to the WebSocket server
    const newSocket = io('YOUR_WEBSOCKET_SERVER_URL');
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [loggedIn, userData])

  function showMoreItems() {
    setDisplayedItems(displayedItems + 6);
  }

  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='history'>
      <Header />
      <div className="d-flex flex-column align-items-center">
        <h2 className='title'>Talk to a Trainer !</h2>
        <h2 ></h2>
        <h2 ></h2>

   

        {/* Render the ChatScreen component */}
        {socket && <ChatScreen userType="client" socket={socket} />}
      </div>

      <div></div>
    </div>
  );
}
