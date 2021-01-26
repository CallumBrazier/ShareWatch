import React, { useState, useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import UserContext from "../Context/UserContext";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./CSS/Home.css";

import Navbar from "../Components/Navbar";
import Header from "../Components/Header";

import Modal from "@material-ui/core/Modal";

import { Body, Body2 } from "../Components/Modal";

const HomePage = () => {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 });
  const isPortrait = useMediaQuery({ orientation: "portrait" });
  const isRetina = useMediaQuery({ minResolution: "2dppx" });

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClick = () => {
    if (open === true) {
      setOpen(false);
      setOpen2(true);
    } else if (open2 === true) {
      setOpen2(false);
      setOpen(true);
    }
  };

  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div>
      <Modal open={open} onBackdropClick={handleClose}>
        <Body
          handleClick={handleClick}
          handleClose={handleClose}
          onBackdropClick={handleClose}
        />
      </Modal>

      <Modal open={open2} onBackdropClick={handleClose}>
        <Body2
          handleClick={handleClick}
          handleClose={handleClose}
          onBackdropClick={handleClose}
        />
      </Modal>

      <Navbar handleOpen={handleOpen} handleOpen2={handleOpen2} />
      <Header handleOpen={handleOpen} />
    </div>
  );
};

export default HomePage;
