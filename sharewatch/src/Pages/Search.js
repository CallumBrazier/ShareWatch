import React, { useEffect, useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import UserContext from "../Context/UserContext";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import "./CSS/Search.css";

import StockCard from "../Components/Card";

export default function Search() {
  const { user } = useContext(UserContext);
  const [query, setQuery] = useState("AAPL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log(user);
  }, []);

  const getQuery = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div>
      <body>
        <Navbar />
        <div className="header glass">
          <div className="account-title">
            {/* <h3>Search for your favourite USD securities!</h3> */}
            <form onSubmit={getSearch}>
              <input
                type="text"
                value={search}
                placeholder="Type in security name"
                onChange={getQuery}
                className="searchbar"
              ></input>
              <button type="submit" id="searchbutton">
                <SearchOutlinedIcon />
              </button>
            </form>
          </div>
          <StockCard query={query} />
        </div>
      </body>
    </div>
  );
}
