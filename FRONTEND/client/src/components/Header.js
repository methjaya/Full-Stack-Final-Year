import React from "react";
import { Navbar, Nav } from "react-bootstrap";
// cant use <a> in react, instead, use <link> from react router dom
import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth"
import heart from "../assets/images/heart.png"

export default function Header() {

  const loggedIn = Auth.isLoggedIn();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';


  return (

    <Navbar collapseOnSelect expand="sm" variant="dark" bg={loggedIn && !isHomePage ? "dark" : null}>
      {loggedIn ? (
        Auth.getProfile().role === "admin" ?
          (<>
            <Navbar.Brand as={Link} to="/" className="brand brand-logged d-flex align-items-center">
              <img alt="heart" style={{ display: "inline" }} src={heart} className="heart-icon" />
              GymPro
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav >
                {/* use eventKey to show navbar style from react bootstrap */}
                <Nav.Link as={Link} to="/exercise" eventKey="1" >Create</Nav.Link>
                <Nav.Link as={Link} to="/workouts/edit" eventKey="2">Workout</Nav.Link>
                <Nav.Link as={Link} to="/talk" eventKey="3">Community Chat</Nav.Link>
                <Nav.Link as={Link} to="/profile" eventKey="4">Profile</Nav.Link>
                <Nav.Link onClick={Auth.logout} >Logout </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>) : (
          <>
            <Navbar.Brand as={Link} to="/" className="brand brand-logged d-flex align-items-center">
              <img alt="heart" style={{ display: "inline" }} src={heart} className="heart-icon" />
              GymPro
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav >
                {/* use eventKey to show navbar style from react bootstrap */}
                <Nav.Link as={Link} to="/history" eventKey="2">Workout</Nav.Link>
                <Nav.Link as={Link} to="/talk" eventKey="3">Talk</Nav.Link>
              ù<Nav.Link as={Link} to="/profile" eventKey="4">Profile</Nav.Link>
                <Nav.Link onClick={Auth.logout} >Logout </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>)
          ) :
        (<Navbar.Brand as={Link} to="/" className={`brand brand-new mx-auto d-flex align-items-center
          ${isLoginPage || isSignupPage ? "brand-text" : null}`}>
          <img alt="heart" style={{ display: "inline" }} src={heart} className="heart-icon" />
          GymPro
        </Navbar.Brand>)}
    </Navbar >
  );
}



