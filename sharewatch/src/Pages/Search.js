import React, { useEffect, useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import UserContext from "../Context/UserContext";

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
    console.log("search:", search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    console.log("query:", query);
  };

  return (
    <div>
      <body>
        <Navbar />
        <div className="header glass">
          <div className="account-title">
            <h3>Search for securities and coins!</h3>
            <form onSubmit={getSearch}>
              <input
                type="text"
                value={search}
                placeholder="Type in security name"
                onChange={getQuery}
              ></input>
              <button type="submit">Search</button>
            </form>
          </div>
          <StockCard query={query} />
        </div>
      </body>
    </div>
  );
}
