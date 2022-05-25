// Libraries
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Context
import { useGlobalUserContext, UserContext } from "../../util/UserContext";
// Style
import "./style/Navigation.css";

function Navigation() {
  const { logOut, userData } = useGlobalUserContext(UserContext);
  let redirect = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));

  function isDisabled() {
    if (userData.role === "user") {
      return `test`;
    }
  }
  function isDisabledAdmin() {
    if (userData.role === "admin") {
      return `test`;
    }
  }

  return (
    <nav className="Nav-container">
      <ul className="Nav-links">
        {!user && (
          <li>
            <Link to="/login">Prisijungti</Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/register">Registruotis</Link>
          </li>
        )}
        {user && (
          <li className={`${isDisabledAdmin()}`}>
            <Link to="/application">Aplikacija</Link>
          </li>
        )}
        {user && (
          <li className={`${isDisabledAdmin()}`}>
            <Link to="/history">Istorija</Link>
          </li>
        )}
        {user && (
          <li className={`${isDisabledAdmin()}`}>
            <Link to="/charts">Diagramos</Link>
          </li>
        )}
        {!user && (
          <li className={`${isDisabledAdmin()}`}>
            <Link to="/">Dokumentacija</Link>
          </li>
        )}
        {user && (
          <li className={`${isDisabled()}`}>
            <Link to="/admin">Admin</Link>
          </li>
        )}

        {user && (
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
