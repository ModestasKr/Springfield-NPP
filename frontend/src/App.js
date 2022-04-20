// Libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
//  Components
import Application from "./components/Application";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App-container">
      <BrowserRouter>
        <nav className="Nav-container">
          <Navigation />
        </nav>
        <Routes>
          <Route path="/application" element={<Application />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
