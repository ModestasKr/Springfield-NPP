// Libraries
import { Outlet } from "react-router-dom";
//  Components
import Navigation from "./components/navigation/Navigation";

// Style

function App() {
  return (
    <div className="App-container">
      <nav className="Nav-container">
        <Navigation />
      </nav>
      <div>
        <Outlet />
      </div>
      {/* <footer className="Footer-container">
        <Footer />
      </footer> */}
    </div>
  );
}

export default App;
