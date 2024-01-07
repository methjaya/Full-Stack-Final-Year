import React, { useState } from 'react';
import { updatePassword } from '../utils/API';
import { Navigate } from 'react-router-dom';
import Auth from "../utils/auth";

const Changepass = () => {
  const [formCredentials, setFormCredentials] = useState({
    password: '',
    newPassword: '',
  });
  const loggedIn = Auth.isLoggedIn();
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  const onChange = (event) => {
    const { name, value } = event.target;
    setFormCredentials({
      ...formCredentials,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {

    event.preventDefault();
    try {
      const token = Auth.getJwtToken();
      if (!token) {
        alert("Token is missing!");
        return;
      }
      const response = await updatePassword(token, formCredentials);

      if(response.status == 401){
        alert("Wrong Credentials!");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      alert("Password Updated Successfully!");

    } catch (err) {
      console.error(err);
      alert("Failed to update data!");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="tab-pane fade active show" id="change-pass">
        <h2 className="text-center mt-3 mb-4">Update Password</h2>
        <hr className="border-light m-0" />
        <div className="card-body text-center">
          <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
              <label className="form-label">Current Password</label>
              <input type="password" name="password" minLength={5} className="form-control" onChange={onChange} value={formCredentials.password} />
            </div>
            <div className="form-group mb-3">
              <label className="form-label">New Password</label>
              <input type="password" name="newPassword" minLength={5} className="form-control" onChange={onChange} value={formCredentials.newPassword} />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mr-2">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Changepass;
