// Libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
//  Components
import Application from "./components/page/Application";
import Navigation from "./components/page/Navigation";
import History from "./components//history/History";
import Home from "./components/page/Home";
// User
import Login from "../src/user/Login";
import Register from "../src/user/Register";

// Style
import "./app.css";

function App() {
  return (
    <div className="App-container">
      <BrowserRouter>
        <nav className="Nav-container">
          <Navigation />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/application" element={<Application />} />
          <Route path="/history" element={<History />} />
          <Route path="/home/application" element={<Home />} />
          <Route path="/home/history" element={<Home />} />
          {/* User */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* <footer className="Footer-container">
          <Footer />
        </footer> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
