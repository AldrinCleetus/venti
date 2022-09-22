import { useState } from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
    
  
  
  return ( 
        <div className="px-6">
        <nav className="navbar is-black" role="navigation" aria-label="main navigation">
        <div className="navbar-brand ">
            
            <div className="navbar-item">
                <Link to='/'><img  src="images/logo.png" /></Link>
            </div>           
        </div>
        <div className="navbar-end">
            
            <div className="navbar-item fade-in-animation">
                <a className="button is-black is-rounded CButton" href="#rides">Ride Types</a>
            </div>

            <div className="navbar-item fade-in-animation">
                <a href="#stats" className="button is-black is-rounded CButton">Login</a>
            </div>

            <div className="navbar-item fade-in-animation">
                <a href="#contact" className="button CButton is-primary is-rounded">Sign Up</a>
            </div>

        </div>
      
            </nav>
        </div>
     );
}
 
export default NavBar;