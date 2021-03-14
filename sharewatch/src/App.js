import React, { useEffect, useContext } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Search from "./Pages/Search";
import UserContext from "./Context/UserContext";
import Comparison from "./Pages/Comparison";

export default function App() {
  const { checkedLoggedIn } = useContext(UserContext);

  useEffect(() => {
    checkedLoggedIn();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/search" component={Search} />
        <Route path="/home" component={Home} />
        <Route path="/comparison" component={Comparison} />
      </Switch>
    </Router>
  );
}
