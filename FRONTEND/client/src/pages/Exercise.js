import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Auth from "../utils/auth";
import Header from "../components/Header";
import cardioIcon from "../assets/images/cardio.png"
import resistanceIcon from "../assets/images/resistance.png"
import { getUsers } from '../utils/API';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Exercise() {
  const loggedIn = Auth.isLoggedIn();
  const navigate = useNavigate();
  const handleNavigation = (data) => {
    // Use the navigate function to navigate and pass data through URL
    navigate(`/exercise/resistance?data=${data}`);
  };

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(users[0]);

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  if( !(Auth.getProfile().role === "admin")){
    return <Navigate to="/" />;
  }



  if (users.length < 1) {
    try {
      const token = Auth.getJwtToken();
      if (!token) throw new Error('Unauthorized!');

      getUsers(token).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load data!');
        }
        res.json().then((users) => {
          setUsers(users);
        });
      });



    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div>
      <Header />
      <div className="exercise d-flex flex-column align-items-center">
        <h2 className='title'>Create Workouts !</h2>

        {/* Dropdown menu for selecting user */}
        <div>
          <label htmlFor="userSelect">Select User:</label>
          <select
            id="userSelect"
            value={selectedUser}
            onChange={(e) => {setSelectedUser(e.target.value); console.log(e.target.value)}}
          >
            {users.map((user, index) => (
              <option key={index} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="col-md-6">
            <button className='cardio-btn d-flex flex-column align-items-center justify-content-center' onClick={() => handleNavigation(selectedUser)}>
              <img alt="cardio" src={cardioIcon} className="exercise-icon" />
              Cardio
            </button>
          </div>
          <div className="col-md-6">
            <button className='resistance-btn d-flex flex-column align-items-center justify-content-center' onClick={() => handleNavigation(selectedUser)}>
              <img alt="resistance" src={resistanceIcon} className="exercise-icon" />
              Strength
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <button className='abs-btn d-flex flex-column align-items-center justify-content-center' onClick={() => handleNavigation(selectedUser)}>
              <img alt="cardio" src={cardioIcon} className="exercise-icon" />
              Abs
            </button>
          </div>
          <div className="col-md-6">
            <button className='track-btn d-flex flex-column align-items-center justify-content-center' onClick={() => handleNavigation(selectedUser)}>
              <img alt="rtrack" src={resistanceIcon} className="exercise-icon" />
              Track
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
