// Libraries
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Context
import { useGlobalUserContext, UserContext } from "../../util/UserContext";
// Style
import "./style/Navigation.css";

function Navigation() {
  const { logOut } = useGlobalUserContext(UserContext);
  let redirect = useNavigate();
  return (
    <nav className="Nav-container">
      <ul className="Nav-links">
        {!localStorage.getItem("user") && (
          <li>
            <Link to="/">...</Link>
          </li>
        )}
        {!localStorage.getItem("user") && (
          <li>
            <Link to="/login">Prisijungti</Link>
          </li>
        )}
        {!localStorage.getItem("user") && (
          <li>
            <Link to="/register">Registruotis</Link>
          </li>
        )}
        {localStorage.getItem("user") && (
          <li>
            <Link to="/application">Aplikacija</Link>
          </li>
        )}
        {localStorage.getItem("user") && (
          <li>
            <Link to="/history">Istorija</Link>
          </li>
        )}
        {localStorage.getItem("user") && (
          <li>
            <Link to="/charts">Diagramos</Link>
          </li>
        )}
        {localStorage.getItem("user") && (
          <li>
            <Link to="/Doccumentation">Dokumentacija</Link>
          </li>
        )}
        {localStorage.getItem("user") && (
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
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
