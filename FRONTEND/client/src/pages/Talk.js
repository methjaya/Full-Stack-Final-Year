// History.js
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { } from '../utils/API';
import Auth from "../utils/auth"
import Header from "../components/Header";
import ChatScreen from "../components/ChatScreen";
import './ChatScreen.css'; // Import the CSS file for styling

export default function History() {

  const loggedIn = Auth.isLoggedIn();

  useEffect(() => {
    const getUserData = async () => {

    };

    getUserData();

  }, [loggedIn])

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='history'>
      <Header />
      <div className="d-flex flex-column align-items-center">
        <h2 className='title'>Community Chat</h2>

        {<ChatScreen userType="client" />}
      </div>

      <div></div>
    </div>
  );
}
