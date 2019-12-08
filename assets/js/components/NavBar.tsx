import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <a className="navbar-brand" href="/">
        Home
      </a>
      <div className="navbar-info">
        <div className="navbar-item-list">
          <a className="nav-item" href="#">
            Home
          </a>
          <a className="nav-item" href="#">
            About
          </a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
