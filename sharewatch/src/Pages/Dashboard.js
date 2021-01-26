import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./CSS/Dashboard.css";
import UserContext from "../Context/UserContext";
import dotenv from "dotenv";

dotenv.config();

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const followedStocks = [];

  return (
    <div>
      <body>
        <Navbar />
        <div className="header glass">
          <div className="account-title">
            <h1>Welcome, {user.user.fullName}!</h1>
            <div>
              {followedStocks.length > 0 ? (
                followedStocks.map(() => {})
              ) : (
                <h3>
                  You are not following any stocks!{" "}
                  <a href="/search">Click here to get searching!</a>
                </h3>
              )}
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Dashboard;
