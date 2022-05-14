// Libraries
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Context
import { useGlobalUserContext, UserContext } from "../../context/UserContext";
// Style
import "./style/Navigation.css";

function Navigation() {
  const { logOut, userData } = useGlobalUserContext(UserContext);
  let redirect = useNavigate();
  return (
    <nav className="Nav-container">
      <ul className="Nav-links">
        <li>
          <Link to="/">...</Link>
        </li>
        <li>
          <Link to="/application">Aplikacija</Link>
        </li>
        <li>
          <Link to="/history">Istorija</Link>
        </li>
        <li>
          <Link to="/charts">Diagramos</Link>
        </li>
        <li>
          <Link to="/Doccumentation">Dokumentacija</Link>
        </li>
        <li>
          <Link to="/login">Prisijungti</Link>
        </li>
        <li>
          <Link to="/register">Registruotis</Link>
        </li>
        <li>
          <button
            type="submit"
            className="logout-btn"
            onClick={() => {
              logOut();
              redirect("/");
            }}
          >
            Atsijungti
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
