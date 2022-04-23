// Libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
//  Components
import Application from "./components/Application";
import Navigation from "./components/Navigation";
import History from "./components/history/History";

function App() {
  return (
    <div className="App-container">
      <BrowserRouter>
        <nav className="Nav-container">
          <Navigation />
        </nav>
        <Routes>
          <Route path="/application" element={<Application />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
