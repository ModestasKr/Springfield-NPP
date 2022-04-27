// Libraries
import React from "react";
import { Link } from "react-router-dom";
// Style
import "./Application/style/Navigation.css";

function Navigation() {
  return (
    <nav className="Nav-container">
      <ul className="Nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/application">Application</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
