import { Link, Outlet, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import '../menu.css'

// Import React and CSS
import React, { useState } from 'react';

// Nav component
const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  let decoded = null;
  if (localStorage.token) {
    decoded = jwtDecode(localStorage.token)
  }

  const toggleMenu = () => {
    setIsActive(!isActive);
  };


  function handleLogout() {
    localStorage.clear();
    navigate('/')
    
  }
  

  return (
    <div>
      <header className="header">
        <button className={`hamburger ${isActive ? 'is-active' : ''}`} onClick={toggleMenu}>
          <div className="navbar"></div>
        </button>
        {localStorage.token && <button onClick={handleLogout}className="logOut">Log Out</button>}
      </header>

        <nav className={`navigation ${isActive ? 'is-active' : ''}`}>
        {
          decoded && decoded.role == 'student' ? <a href="#" className="aboutUs">{decoded.name}</a> : <a className="aboutUs" href="#">{decoded && decoded.teacherName}
        </a> 
        }
        
      </nav>  
      
      {/* <nav className={`navigation ${isActive ? 'is-active' : ''}`}>
        <a className="aboutUs" href="../teacher_dashboard/">
          About Us
        </a>
      </nav> */}




      <Outlet/>
    </div>
  );
};

export default Nav;



// export default Nav