import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Auth from "../utils/auth"
import Header from "../components/Header";

export default function History() {
  const [userData, setUserData] = useState({});
  const [exerciseData, setExerciseData] = useState([])
  const [displayedItems, setDisplayedItems] = useState(6);

  const loggedIn = Auth.isLoggedIn();

  // everytime loggedIn/userdata changes, the getuserdata runs
  useEffect(() => {
    const getUserData = async () => {
      
    };
    getUserData();
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
        <h2 className='title'>Shehan you can customize from hereeeeee!!!</h2>
        
      </div >
    </div >
  )
}
