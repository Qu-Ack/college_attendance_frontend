import { Link, Outlet, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import '../Login/login.css'
// import { useState } from "react";
// Import React and CSS
import '../DashBoard/teacher_dashboard.css'
import '../DashBoard/student_dashboard.css'
import { useEffect } from "react";
import React, { useState } from 'react';
import '../AboutUs/Aboutus.css'

// Nav component
const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const [headerClass, setHeaderClass] = useState("")
  const [logoutClass, setLogoutClass] = useState("");
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


  function handleAboutUs() {
    setHeaderClass('aboutUs_header')
    setLogoutClass('.aboutUs_logOut')
  }

  // if(decoded.role == 'teacher') {
  //   setHeaderClass('TD_header')
  // } else {
  //   setHeaderClass('login_header')
  // }

  useEffect(() => {
    if (decoded && decoded.role === 'teacher') {
      setHeaderClass('TD_header');
      setLogoutClass('TD_logOut')
    } else if (decoded && decoded.role == 'student') {
      setHeaderClass('SD_header');
      setLogoutClass('SD_logOut')
    } else {
      setHeaderClass('login_header');
      setLogoutClass('login_logOut')
    }
  }, [decoded]);
  

  return (
    <div>
      <header className={headerClass}>
        <button className={`login_hamburger ${isActive ? 'login_is-active' : ''}`} onClick={toggleMenu}>
          <div className="login_navbar"></div>
        </button>
        {localStorage.token && <button onClick={handleLogout}className={logoutClass}>Log Out</button>}
      </header>

        <nav className={`login_navigation ${isActive ? 'login_is-active' : ''}`}>
        {
          decoded && decoded.role == 'student' ? <Link to="/aboutus" className="login_aboutUs">About Us</Link> : <Link className="login_aboutUs" to="/aboutus">{decoded && decoded.teacherName}
        About Us</Link> 
        }
        
      </nav>  
      
      {/* <nav className={`navigation ${isActive ? 'is-active' : ''}`}>
        <a className="aboutUs" href="../teacher_dashboard/">
          About Us
        </a>
      </nav> */}




      <Outlet context={handleAboutUs}/>
    </div>
  );
};

export default Nav;



// export default Nav