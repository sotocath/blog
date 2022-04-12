import React from "react";
import logo from "./img/earth-asia-solid.svg";
import "./index.css";

const Logo = () => {
  return (
    <a href="/" className="logo">
      <div>
        <img alt="Travel-blog" src={logo} className="logo__pic" />
      </div>
      <div className="logoText">
        <span>Выйти из рамок</span>
        <br />
        <span className="logoSmall">трэвел-блог</span>
      </div>
    </a>
  );
};

export default Logo;
