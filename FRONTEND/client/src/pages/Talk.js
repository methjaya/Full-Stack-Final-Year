// History.js
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getMe } from '../utils/API';
import Auth from "../utils/auth"
import { formatDate } from '../utils/dateFormat';
import Header from "../components/Header";
import ChatScreen from "../components/ChatScreen";
import cardioIcon from "../assets/images/cardio.png"
import resistanceIcon from "../assets/images/resistance.png"
import { io } from 'socket.io-client';
import './ChatScreen.css'; // Import the CSS file for styling

export default function History() {
  const [userData, setUserData] = useState({});
  const [exerciseData, setExerciseData] = useState([])
  const [displayedItems, setDisplayedItems] = useState(6);
  const [socket, setSocket] = useState(null);

  const loggedIn = Auth.isLoggedIn();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        const response = await getMe(token)

        if (!response.ok) {
          throw new Error("something went wrong!")
        }

        const user = await response.json()

        if (user.cardio && user.resistance) {
          const cardio = user.cardio;
          const resistance = user.resistance;
          const exercise = cardio.concat(resistance);

          exercise.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
          })

          exercise.forEach(item => {
            item.date = formatDate(item.date)
          });

          setUserData(user);
          setExerciseData(exercise)
        }
      } catch (err) { console.error(err) }
    };

    getUserData();

    const newSocket = io('YOUR_WEBSOCKET_SERVER_URL');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [loggedIn, userData])

  function showMoreItems() {
    setDisplayedItems(displayedItems + 6);
  }

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='history'>
      <Header />
      <div className="d-flex flex-column align-items-center">
        <h2 className='title'>Talk to a Trainer !</h2>

        {socket && <ChatScreen userType="client" socket={socket} />}
      </div>

      <div></div>
    </div>
  );
}