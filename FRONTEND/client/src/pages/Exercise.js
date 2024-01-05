import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import Header from "../components/Header";
import cardioIcon from "../assets/images/cardio.png"
import resistanceIcon from "../assets/images/resistance.png"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Exercise() {
  const loggedIn = Auth.isLoggedIn();
  const navigate = useNavigate();

  // Sample user names
  const users = ['Sahansa', 'Sajeewa', 'Shehan'];
  

  const [selectedUser, setSelectedUser] = useState(users[0]); // Default to the first user

  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <div className="exercise d-flex flex-column align-items-center">
        <h2 className='title'>Make Your Workout with Us!</h2>

        {/* Dropdown menu for selecting user */}
        <div>
          <label htmlFor="userSelect">Select User:</label>
          <select
            id="userSelect"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            {users.map((user, index) => (
              <option key={index} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="col-md-6">
            <button className='cardio-btn d-flex flex-column align-items-center justify-content-center' onClick={() => navigate("/exercise/cardio")}>
              <img alt="cardio" src={cardioIcon} className="exercise-icon" />
              Cardio
            </button>
          </div>
          <div className="col-md-6">
            <button className='resistance-btn d-flex flex-column align-items-center justify-content-center' onClick={() => navigate("/exercise/resistance")}>
              <img alt="resistance" src={resistanceIcon} className="exercise-icon" />
              Resistance
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <button className='abs-btn d-flex flex-column align-items-center justify-content-center' onClick={() => navigate("/exercise/cardio")}>
              <img alt="cardio" src={cardioIcon} className="exercise-icon" />
              Abs
            </button>
          </div>
          <div className="col-md-6">
            <button className='track-btn d-flex flex-column align-items-center justify-content-center' onClick={() => navigate("/exercise/Track")}>
              <img alt="rtrack" src={resistanceIcon} className="exercise-icon" />
              Track
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
