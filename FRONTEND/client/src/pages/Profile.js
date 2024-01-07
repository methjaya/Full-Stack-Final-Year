import React, { useState } from 'react';
import {
  Navigate
} from 'react-router-dom';
import Header from "../components/Header";
import "../index.css";
import Auth from "../utils/auth";
import Changepass from './Changepass';
import General from './General';

export default function History() {

  const [selectedPage, setSelectedPage] = useState(<General />);

  const loggedIn = Auth.isLoggedIn();

  function changePage(page) {
    setSelectedPage(page);
  }



  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='#history'>

      <Header />

      <body>
        <div className="container light-style flex-grow-1 container-p-y" >
          <h4 className="font-weight-bold py-3 mb-4">Profile settings</h4>
          <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light" >
              <div className="col-md-3 pt-0" >
                <div className="list-group list-group-flush account-settings-links" >
                  <div className="list-group-item list-group-item-action" onClick={() => { changePage(<General />) }} style={{cursor:"pointer"}}>
                    Change Details
                  </div>
                  <div className="list-group-item list-group-item-action " onClick={() => { changePage(<Changepass />) }} style={{cursor:"pointer"}}>
                    Change Password
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="tab-content">
                  <div className="tab-pane fade active show" id="account-general">
                    <div className="card-body media align-items-center">
                      {
                        selectedPage
                      }
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </body>
    </div >
  )
}
