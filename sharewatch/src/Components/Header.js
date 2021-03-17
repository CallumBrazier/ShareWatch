import React, { useState, useEffect } from "react";

import "./CSS/Header.css";
import iphone from "../images/iphone-sw.png";

export default function Header({ handleOpen }) {
  return (
    <div className="top-section">
      <div className="header glass">
        <div className="header-left">
          <h1 className="header-title">
            Invest in your future,
            <br /> It's as easy as 1, 2, 3!
          </h1>
          <p className="header-para">
            1. Create an
            <a className="clickable-link" onClick={handleOpen}>
              {" "}
              account
            </a>
            !
            <br /> 2. Select companies to monitor on your dashboard.
            <br /> 3. Make informed investment decisions and profit!*
          </p>

          <div className="buttonGrp">
            <button className="investButton" onClick={handleOpen}>
              <b>Start investing now</b>
            </button>
          </div>
        </div>

        <div className="header-right">
          <img src={iphone} alt="iphone" className="iphone-image" />
        </div>
      </div>

      {/* <div className="circle-left"></div>
      <div className="circle-right"></div>
      <div className="circle-mid"></div>
      <div className="circle-bottom"></div>
      <div className="circle"></div> */}

      <div className="disclaimer">
        <h6 className="disclaimer-text">
          *Investing involves risk. You aren’t guaranteed to make money, and you
          might lose the money you start with. We don’t provide personalised
          advice or recommendations. Any information we provide is general only
          and current at the time written.
        </h6>
      </div>
    </div>
  );
}
