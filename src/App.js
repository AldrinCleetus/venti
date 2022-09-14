import HomePage from "./components/HomePage";
import NavBar from "./components/Navbar";
import Navigation from "./components/Navigation"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="hero is-fullheight is-black">
      <div className="hero-head">
        <NavBar></NavBar>
      </div>

      {/* <Navigation></Navigation> */}

      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/navigation" element={<Navigation></Navigation>}></Route>
      </Routes>

      
    </div>
  );
}

export default App;
