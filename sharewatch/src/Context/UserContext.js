import React, { useState, createContext } from "react";
import Axios from "axios";

const UserContext = createContext({
  token: "",
  user: "",
});

export default UserContext;

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({
    token: undefined,
    user: undefined,
  });

  const checkedLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (user.token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }
    const tokenRes = await Axios.post(
      "http://localhost:3001/users/tokenIsValid",
      null,
      { headers: { "x-auth-token": token } }
    );
    if (tokenRes.data) {
      const userRes = await Axios.get("http://localhost:3001/users/", {
        headers: { "x-auth-token": token },
      });
      setUser({ token: tokenRes.data, user: userRes.data });
    }
  };

  // Login updates the user data with a name parameter
  const setLogin = (user) => {
    setUser(() => ({
      token: user.token,
      user: user.user,
    }));
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser(() => ({
      token: undefined,
      user: undefined,
    }));
  };

  return (
    <UserContext.Provider value={{ user, setLogin, checkedLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
