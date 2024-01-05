import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import Header from "../components/Header";
import cardioIcon from "../assets/images/cardio.png"
import resistanceIcon from "../assets/images/resistance.png"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React, {useEffect, useState} from 'react';
import {ChatComponent, ChatAppend} from 'react-native-chat-component';

export default function Talk() {
  const loggedIn = Auth.isLoggedIn();
  const navigate = useNavigate();


  




  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <div className="exercise d-flex flex-column align-items-center">
        <h2 className='title'>Talk to a Trainer !</h2>

        

       
      </div>
    </div>
  );
}
