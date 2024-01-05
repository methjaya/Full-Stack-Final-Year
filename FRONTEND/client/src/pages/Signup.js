import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { register } from "../utils/API";
import Auth from "../utils/auth";
import Header from "../components/Header";


export default function Signup() {
  const isLoggedIn = Auth.isLoggedIn();

  // set up the orginal state of the form
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phoneNumber: "",
  });

  const [errMessage, setErrMessage] = useState("Failed to register");

  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // update state based on form input
  const onChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const onFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch to handle errors
    try {

      if (isNaN(formState.phoneNumber)) {
        throw new Error("Phone number should be numeric");
      }

      // create new users
      const response = await register(formState);

      // check the response
      if (!response.ok) {
        throw new Error("Failed to register");
      }

      // get token and user data from server
      const { token } = await response.json();
      // use authenticaiton functionality
      Auth.login(token);


    } catch (err) {
      console.error(err);
      setShowAlert(true);
      setErrMessage(err.message);
    }
  };

  // If the user is logged in, redirect to the home page
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (

    <div className="signup d-flex flex-column align-items-center justify-content-center text-center">
      <Header />
      <form onSubmit={onFormSubmit} className="signup-form d-flex flex-column">

        <label htmlFor="name">Name</label>
        <input
          className="form-input"
          value={formState.name}
          placeholder="Your Name"
          name="name"
          type="text"
          minLength={3}
          onChange={onChange}
        />

        <label htmlFor="email">Email</label>
        <input
          className="form-input"
          value={formState.email}
          placeholder="email@email.com"
          name="email"
          type="email"
          onChange={onChange}
        />

        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          value={formState.password}
          placeholder="***********"
          name="password"
          type="password"
          minLength={5}
          onChange={onChange}
        />

        <label htmlFor="gender">Gender</label>
        <input
          className="form-input"
          value={formState.gender}
          placeholder="Male/Female"
          name="gender"
          type="text"
          minLength={4}
          onChange={onChange}
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          className="form-input"
          value={formState.phoneNumber}
          placeholder="Enter Your Phone Number"
          name="phoneNumber"
          type="text"
          minLength={10}
          maxLength={10}
          onChange={onChange}
        />

        <div className="btn-div">
          <button disabled={!(formState.name && formState.email && formState.password && formState.phoneNumber && formState.gender)}
            className="signup-btn mx-auto my-auto"
          >Sign Up</button>
        </div>

        <p className="link-btn">
          Already have an account?{' '}
          <Link to="/login">Log in</Link>
        </p>
        {showAlert && <div className="err-message">{errMessage}</div>}
      </form>
    </div>
  );
}
