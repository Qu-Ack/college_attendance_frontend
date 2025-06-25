import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import "./loginadmin.css";
// import styles from './login.module.css'

function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.token;
    if (token && typeof token === "string") {
      const decoded = jwtDecode(token);
      if (decoded.role == "admin") {
        navigate(`/admindashboard`);
      }
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          username,
          password,
        },
      );
      console.log(response);
      setLoading(false);
      if (typeof response.data.errors != "undefined") {
        setError(response.data.errors);
      } else if (typeof response.data.token != "undefined") {
        localStorage.token = response.data.token;
        const decoded = jwtDecode(localStorage.token);
        console.log(decoded);
        navigate(`/admin`);
      } else {
        // console.log(response.data.errors)
        setError(response.data.errors);
        console.log(error);
      }
    } catch (err) {
      setError(err);
    }
  }

  return (
    // <div className={styles.form-wrapper">
    //     <form method="POST">
    //         <input type="text" name="username" id="username" placeholder="enter your username" onChange={(e) => { setUsername(e.target.value) }} />
    //         <input type="password" name="password" id="password" placeholder="enter your password" onChange={(e) => { setPassword(e.target.value) }} />
    //         <button type="submit" onClick={handleSubmit}>Log In</button>
    //         <div className={styles.user-text">
    //             <p className={styles.login-text">or go to <Link to="/signup" className={styles.login-link">Sign Up</Link></p>
    //             <div className={styles.loading">{loading && "Loading .."}</div>
    //             {/* <div className={styles.error">{error}</div> */}
    //         </div>
    //     </form>
    // </div>

    //     <div className="" id="adminLogin">
    //   <div className="">
    //     <div className="">Admin Login</div>
    //     <form className="">
    //       <div className="">
    //         <label htmlFor="fname" className="">Email</label>
    //         <input type="text" id="fname" name="fname" className="" onChange={(e) => { setUsername(e.target.value) }}  />
    //       </div>
    //       <div className="">
    //         <label htmlFor="lname" className="">Password</label>
    //         <input type="password" id="lname" name="lname" className="" onChange={(e) => { setPassword(e.target.value) }}/>
    //       </div>
    //     </form>
    //     <button className="" onClick={handleSubmit}>Login</button>

    //     <div className="">Not an Admin?</div>
    //     <div className="">
    //       <Link to="/" className="">Student login</Link>
    //       <Link to="/teacherlogin" className="">Teacher login</Link>
    //     </div>
    //   </div>
    // </div>

    <div className="ADMINLOGIN_WRAPPER">
      <div className="loginAdmin_mainPage" id="loginAdmin_adminLogin">
        <div className="loginAdmin_loginContainer">
          <div className="loginAdmin_loginText">Admin Login</div>
          <form className="loginAdmin_loginInput">
            <div className="loginAdmin_email">
              <label htmlFor="email" className="loginAdmin_text">
                Username
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="loginAdmin_box"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="loginAdmin_password">
              <label htmlFor="password" className="loginAdmin_text">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="loginAdmin_box"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </form>
          <button className="loginAdmin_loginButton" onClick={handleSubmit}>
            Login
          </button>

          <div className="loginAdmin_notA">Not an Admin?</div>
          <div className="loginAdmin_otherLoginBtns">
            <Link to="/" className="loginAdmin_studentLoginBtn">
              Student login
            </Link>
            <Link to="/teacherlogin" className="loginAdmin_teacherLoginBtn">
              Teacher login
            </Link>
          </div>
          <div className="user-text">
            {/* <p className="login-text">or go to <Link to="/signup" className="login-link">Sign Up</Link></p> */}
            <div className="loading">{loading && "Loading .."}</div>
            <div className="error">{error}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
