import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../Context/UserContext";

import "./CSS/modal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ErrorNotice from "../misc/ErrorNotice";

const Body = ({ handleClose, handleClick }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordConfirm] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const registerUser = async () => {
    try {
      const newUser = { email, fullName, password, passwordCheck };
      await Axios.post("http://localhost:3001/users/signup", newUser).then(
        (res) => {
          if (res.data.msg) {
            setRegisterStatus(res.data.msg);
          }
        }
      );
    } catch (err) {
      err.response.data.msg && setRegisterStatus(err.response.data.msg);
    }
  };

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <FontAwesomeIcon
          onClick={handleClose}
          className="fontAwesomeCross"
          icon={faTimes}
          size="2x"
        />

        <h1 className="modal-title">
          Control your <br /> finances!
        </h1>
        <h3 className="modal-context-active" onClick={handleClick}>
          Sign Up
        </h3>
        <h3 className="modal-context-inactive" onClick={handleClick}>
          Login
        </h3>
        {registerStatus && (
          <ErrorNotice
            message={registerStatus}
            clearError={() => setRegisterStatus(undefined)}
          />
        )}
        <form name="registerForm">
          <input
            className="modal-input"
            type="text"
            name="fullName"
            placeholder=" Full Name"
            required
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <br />
          <input
            className="modal-input"
            type="emailaddress"
            name="email"
            placeholder=" Email Address"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <input
            className="modal-input"
            type="password"
            name="password"
            placeholder=" Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <input
            className="modal-input"
            type="password"
            name="confirm"
            placeholder=" Confirm Password"
            required
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />

          <br />
          <button
            type="reset"
            className="signinButton"
            variant="contained"
            onClick={registerUser}
          >
            Start your journey!
          </button>
        </form>
      </div>
    </div>
  );
};

const Body2 = ({ handleClose, handleClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setLogin } = useContext(UserContext);
  const [loginStatus, setLoginStatus] = useState("");

  const history = useHistory();

  const login = async (e) => {
    try {
      const loginRes = await Axios.post("http://localhost:3001/users/login", {
        email: email,
        password: password,
      });
      setLogin({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("user", loginRes.data.user);
      history.push("/dashboard");
      console.log("user", user);
    } catch (err) {
      err.response.data.msg && setLoginStatus(err.response.data.msg);
    }
  };

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <FontAwesomeIcon
          onClick={handleClose}
          className="fontAwesomeCross"
          icon={faTimes}
          size="2x"
        />

        <h1 className="modal-title">Welcome!</h1>
        <h3 className="modal-context-inactive" onClick={handleClick}>
          Sign Up
        </h3>
        <h3 className="modal-context-active2">Log In</h3>
        {loginStatus && (
          <ErrorNotice
            message={loginStatus}
            clearError={() => setLoginStatus(undefined)}
          />
        )}
        <form>
          <input
            className="modal-input"
            type="emailaddress"
            name="email"
            placeholder=" Email Address"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <input
            className="modal-input"
            type="password"
            name="password"
            placeholder=" Password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
        </form>

        <button className="loginButton" variant="contained" onClick={login}>
          Begin investing!
        </button>
      </div>
    </div>
  );
};

export { Body, Body2 };
