// Libraries
import React from "react";
import { Link } from "react-router-dom";
// Style
import "./style/Navigation.css";

function Navigation() {
  return (
    <nav className="Nav-container">
      <ul className="Nav-links">
        <li>
          <Link to="/">Namai</Link>
        </li>
        <li>
          <Link to="/application">Aplikacija</Link>
        </li>
        <li>
          <Link to="/history">Istorija</Link>
        </li>
        <li>
          <Link to="/login">Prisijungti</Link>
        </li>
        <li>
          <Link to="/register">Registruotis</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
