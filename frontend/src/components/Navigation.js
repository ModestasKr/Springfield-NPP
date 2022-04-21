// Libraries
import React from "react";
import { Link } from "react-router-dom";
// Style
import "./application/style/Navigation.css";

function Navigation() {
  return (
    <nav className="Nav-container">
      <ul className="Nav-links">
        <li>
          <Link to="/application">Application</Link>
        </li>
        <li>
          <Link to="/income">Income</Link>
        </li>
        <li>
          <Link to="/expense">Expense</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
