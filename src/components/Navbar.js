import { useState } from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
    
  
  
  return ( 
        <div className="px-6">
        <nav className="navbar is-black" role="navigation" aria-label="main navigation">
        <div className="navbar-brand ">
            <div className="navbar-item is-size-5">
                <a href="#"><strong><Link to="/">Venti</Link></strong></a>
            </div>            
        </div>
        <div className="navbar-end">
            <div className="navbar-item">
                <img  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipground.com%2Fimages%2Fplaceholder-logo-5.png&f=1&nofb=1" />
            </div>

        </div>
      
            </nav>
        </div>
     );
}
 
export default NavBar;