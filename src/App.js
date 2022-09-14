import HomePage from "./components/HomePage";
import NavBar from "./components/Navbar";
import Navigation from "./components/Navigation"


function App() {
  return (
    <div className="hero is-fullheight is-black">
      <div className="hero-head">
        <NavBar></NavBar>
      </div>

      {/* <HomePage></HomePage> */}
      <Navigation></Navigation>

      
    </div>
  );
}

export default App;
