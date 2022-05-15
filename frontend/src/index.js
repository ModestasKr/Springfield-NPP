// Libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// Components
import App from "./App";
// import Navigation from "./components/navigation/Navigation";
// Style
import "./util/styles/index.css";

// Report
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <nav className="Nav-container">
        <Navigation />
      </nav> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
