// Libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
//  Components
import Application from "./page/application/Application";
import Navigation from "./components/navigation/Navigation";
import History from "./page/history/History";
import Doccumentation from "./page/doccumentation/Doccumentation";
import Charts from "./page/charts/Charts";
import Home from "./page/home/Home";
// User
import Login from "./page/user/Login";
import Register from "./page/user/Register";
// Context
import { UserProvider } from "./context/UserContext";
// Style
import "./app.css";

function App() {
  return (
    <div className="App-container">
      <UserProvider>
        <BrowserRouter>
          <nav className="Nav-container">
            <Navigation />
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Doccumentation" element={<Doccumentation />} />
            <Route path="/application" element={<Application />} />
            <Route path="/history" element={<History />} />
            <Route path="/charts" element={<Charts />} />
            {/* useNavigate */}
            <Route
              path="/Doccumentation/application"
              element={<Doccumentation />}
            />
            <Route
              path="/Doccumentation/history"
              element={<Doccumentation />}
            />
            {/* User */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          {/* <footer className="Footer-container">
          <Footer />
        </footer> */}
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
