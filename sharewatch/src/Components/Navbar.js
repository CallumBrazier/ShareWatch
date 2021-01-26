import React, { useContext } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

import "../Pages/CSS/Home.css";
import swlogo from "../images/SW-Main-Logo-White.png";
import AuthOptions from "./AuthOptions";
import UserContext from "../Context/UserContext";

export default function Navbar({ handleOpen, handleOpen2 }) {
  const { user } = useContext(UserContext);
  return (
    <div className="navBar">
      {user.user ? (
        <div className="topNav">
          <div className="logo">
            <NavLink to="/home" className="navBar-link">
              <img className="main-logo" src={swlogo} alt="main logo" />
            </NavLink>
          </div>

          <div className="navLinks">
            <ul>
              <NavLink to="/dashboard" className="navBar-link">
                <li>Home</li>
              </NavLink>
              <NavLink to="/search" className="navBar-link mid-link">
                <li>Search</li>
              </NavLink>
              <NavLink to="/home" className="navBar-link">
                <li>Contact Us</li>
              </NavLink>
            </ul>
          </div>
          <div className="sign">
            <span>
              <AuthOptions
                handleOpen={handleOpen}
                handleOpen2={handleOpen2}
              ></AuthOptions>
            </span>
          </div>
        </div>
      ) : (
        <div className="topNav">
          <div className="logo">
            <NavLink to="/home" className="navBar-link">
              <img className="main-logo" src={swlogo} alt="main logo" />
            </NavLink>
          </div>

          <div className="navLinks">
            <ul>
              <NavLink to="/home" className="navBar-link">
                <li>Home</li>
              </NavLink>
              <NavLink to="/home" className="navBar-link mid-link">
                <li>Opportunities</li>
              </NavLink>
              <NavLink to="/home" className="navBar-link">
                <li>Contact Us</li>
              </NavLink>
            </ul>
          </div>
          <div className="sign">
            <span>
              <AuthOptions
                handleOpen={handleOpen}
                handleOpen2={handleOpen2}
              ></AuthOptions>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
