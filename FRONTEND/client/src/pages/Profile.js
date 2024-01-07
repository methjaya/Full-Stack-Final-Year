import React, { useEffect, useState } from 'react';
import {
  Link,
  Navigate
} from 'react-router-dom';
import Header from "../components/Header";
import "../index.css";
import Auth from "../utils/auth";
import Changepass from './Changepass';
import General from './General';
import Updateprof from './Updateprof';
import Workout from './Workout';

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
    <div className='#history'>

      <Header />

      <body>
        <div className="container light-style flex-grow-1 container-p-y">
          <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
          <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
              <div className="col-md-3 pt-0">
                <div className="list-group list-group-flush account-settings-links">
                  <Link to='/general' className="list-group-item list-group-item-action" data-toggle="list" >
                    General
                  </Link>
                  <Link to='/changepass' className="list-group-item list-group-item-action " data-toggle="list" >
                    Change password
                  </Link>
                  <Link to='/updateprof' className="list-group-item list-group-item-action " data-toggle="list">
                    Edit Profile
                  </Link>
                  <Link to='/workout' className="list-group-item list-group-item-action active" data-toggle="list" >
                    Workout
                  </Link>
                </div>
              </div>
              <div className="col-md-9">
                <div className="tab-content">
                  <div className="tab-pane fade active show" id="account-general">
                    <div className="card-body media align-items-center">
                      <Workout/>
                  </div>
                  {/*other tab panes */}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right mt-3">
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
            &nbsp;
            <button type="button" className="btn btn-default">
              Cancel
            </button>
          </div>
          </div>
        </div>
    
      </body>
    </div >
  )
}
