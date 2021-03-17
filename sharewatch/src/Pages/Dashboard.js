import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, NavLink, useHistory } from "react-router-dom";

import Navbar from "../Components/Navbar";
import "./CSS/Dashboard.css";
import UserContext from "../Context/UserContext";
import dotenv from "dotenv";
import Axios from "axios";
import DashboardCard from "../Components/DashboardCard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const port = process.env.PORT || 3001;

dotenv.config();

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [followedStocks, setFollowedStocks] = useState([]);
  const history = useHistory();

  const favouriteStocks = async () => {
    if (user.user) {
      let id = user.user.id;
      let data = { id };

      await Axios.post(`/stocks/allfavourites`, data).then((res) => {
        if (res.data.msg) {
          console.log("res", res);
          console.log(res.data.msg);
          let favs = res.data.favourites;
          console.log(favs);
          let stockArray = [];
          for (let i = 0; i < favs.length; i++) {
            stockArray.push({
              ticker: favs[i].ticker,
              code: favs[i].uniqueCode,
            });
          }
          setFollowedStocks([...stockArray]);
        }
      });
    }
  };

  useEffect(() => {
    favouriteStocks();
    if (user.user === undefined) {
      history.push("/home");
    }
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(followedStocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);
    console.log("followedstocks", followedStocks);
    setFollowedStocks(items);
  };

  return (
    <div>
      <body>
        <Navbar />
        <div className="header glass">
          <div className="account-title">
            <h1>{user.user ? `Welcome, ${user.user.fullName}!` : null}</h1>
          </div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <div
                  className="dashboard"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {followedStocks.length > 0 ? (
                    followedStocks.map(({ ticker, code }, index) => {
                      return (
                        <Draggable key={code} draggableId={code} index={index}>
                          {(provided) => (
                            <div
                              className="dashboard-card"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <DashboardCard query={ticker} />
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  ) : (
                    <div>
                      <h3>
                        You are not following any stocks!{" "}
                        <NavLink to="/search">
                          Click here to get searching!
                        </NavLink>
                      </h3>
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </body>
    </div>
  );
};

export default Dashboard;
