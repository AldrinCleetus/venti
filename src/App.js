import HomePage from "./components/HomePage";
import NavBar from "./components/Navbar";
import Navigation from "./components/Navigation"
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";

import { useJsApiLoader } from "@react-google-maps/api";

function App() {

  const [location,setLocation] = useState({
    origin:"",
    destination:""
  })

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries:['places'],
  })



  return (
    <div className="hero is-fullheight is-black">
      <div className="hero-head">
        <NavBar></NavBar>
      </div>

      {/* <Navigation></Navigation> */}

      <Routes>
        <Route path="/" element={<HomePage setLocation={setLocation} isLoaded={isLoaded}></HomePage>}></Route>
        <Route path="/navigation" element={<Navigation location={location} isLoaded={isLoaded}></Navigation>}></Route>
      </Routes>

      
    </div>
  );
}

export default App;
