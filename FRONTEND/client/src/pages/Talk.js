// History.js
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {  } from '../utils/API';
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
