// Libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Page
import Application from "./page/application/Application";
import History from "./page/history/History";
import Doccumentation from "./page/doccumentation/Doccumentation";
import Charts from "./page/charts/Charts";
import Home from "./page/home/Home";
// User
import Login from "./page/user/Login";
import Register from "./page/user/Register";
// Admin
import Dashboard from "./page/admin/Dashboard";
// Components
import App from "./App";
// Style
import "./util/styles/index.css";
// Report
import reportWebVitals from "./reportWebVitals";
// Context
import { UserProvider } from "./util/UserContext";
// Route
import PrivateRoutes from "./routes/PrivateRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            {/* User */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          {/* Private */}
          <Route element={<PrivateRoutes />}>
            <Route element={<App />}>
              <Route path="/application" element={<Application />} />
              <Route path="/doccumentation" element={<Doccumentation />} />
              <Route element={<PrivateRoutes roleRequired="admin" />}>
                <Route path="/admin" element={<Dashboard />}></Route>
              </Route>
              <Route path="/history" element={<History />} />
              <Route path="/charts" element={<Charts />} />
            </Route>
          </Route>
          {/* useNavigate */}
          <Route
            path="/doccumentation/application"
            element={<Doccumentation />}
          />
          <Route path="/doccumentation/history" element={<Doccumentation />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
