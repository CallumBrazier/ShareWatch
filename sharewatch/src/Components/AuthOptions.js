import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";

export default function AuthOptions({ handleOpen, handleOpen2 }) {
  const { user, logout } = useContext(UserContext);
  const history = useHistory();

  const letsgo = () => {
    logout();
    history.push("/home");
  };

  return (
    <div>
      {user.user ? (
        <button className="modalOpenButtons" onClick={letsgo}>
          Log Out
        </button>
      ) : (
        <>
          <button className="modalOpenButtons" onClick={handleOpen}>
            REGISTER
          </button>{" "}
          |{" "}
          <button className="modalOpenButtons" onClick={handleOpen2}>
            LOGIN
          </button>
        </>
      )}
    </div>
  );
}
