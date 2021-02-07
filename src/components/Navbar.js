import React from "react";
import "../media/CoLab.css";
import logo from "../media/CoLab_logo_blue.png";
const Navbar = () => {
  return (
    <nav className="background shadow-lg">
      <img
        src={logo}
        alt="Logo"
        style={{
          marginLeft: "50px",
          width: "5.438rem",
          height: "1.5rem",
          marginTop: "1rem",
        }}
      ></img>
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1"></span>
      </div>
    </nav>
  );
};

export default Navbar;
