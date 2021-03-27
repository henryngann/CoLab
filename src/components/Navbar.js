import React from "react";
import "../media/CoLab.css";
import logo from "../media/sivitus_logo_black-01.png";
const Navbar = () => {
  return (
    <nav className="background shadow-lg">
      <div className="container-fluid">
        <img
          src={logo}
          alt="Logo"
          style={{
            marginLeft: "50px",
            width: "8rem",
            height: "5rem",
            marginTop: "1rem",
          }}
        ></img>
        <span className="navbar-brand mb-0 h1"></span>
      </div>
    </nav>
  );
};

export default Navbar;
