import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./CSS/Dashboard.css";
import UserContext from "../Context/UserContext";
import dotenv from "dotenv";
import Axios from "axios";
import DashboardCard from "../Components/DashboardCard";

dotenv.config();

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [followedStocks, setFollowedStocks] = useState([]);

  const favouriteStocks = async () => {
    let id = user.user.id;
    let data = { id };

    await Axios.post("http://localhost:3001/stocks/allfavourites", data).then(
      (res) => {
        if (res.data.msg) {
          console.log(res);
          console.log(res.data.msg);
          let favs = res.data.favourites;
          console.log(favs);
          let stockArray = [];
          for (let i = 0; i < favs.length; i++) {
            stockArray.push(favs[i].ticker);
          }
          setFollowedStocks([...stockArray]);
          console.log(followedStocks);
        }
      }
    );
  };

  useEffect(() => {
    favouriteStocks();
  }, []);

  return (
    <div>
      <body>
        <Navbar />
        <div className="header glass">
          <div className="account-title">
            <h1>Welcome, {user.user.fullName}!</h1>
          </div>
          <div className="dashboard">
            {followedStocks.length > 0 ? (
              followedStocks.map((ticker) => {
                return (
                  <div className="dashboard-card">
                    <DashboardCard query={ticker} />
                  </div>
                );
              })
            ) : (
              <div>
                <h3>
                  You are not following any stocks!{" "}
                  <NavLink to="/search">Click here to get searching!</NavLink>
                </h3>
              </div>
            )}
          </div>
        </div>
      </body>
    </div>
  );
};

export default Dashboard;
