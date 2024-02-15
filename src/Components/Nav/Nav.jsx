import { Link, Outlet } from "react-router-dom"


// Import React and CSS
import React, { useState } from 'react';
import '../menu.css';  // Make sure to import your other CSS files

// Nav component
const Nav = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  

  return (
    <div>
      <header className="header">
        <button className={`hamburger ${isActive ? 'is-active' : ''}`} onClick={toggleMenu}>
          <div className="navbar"></div>
        </button>
        {/* <button className="logOut">Log Out</button> */}
      </header>

      <nav className={`navigation ${isActive ? 'is-active' : ''}`}>
        <a className="aboutUs" href="../teacher_dashboard/">
          About Us
        </a>
      </nav>


      <Outlet/>
    </div>
  );
};

export default Nav;



// export default Nav