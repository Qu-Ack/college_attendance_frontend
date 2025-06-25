import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./login.css";

function StudentLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [studentid, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.token;
    console.log(token);
    if (token && typeof token === "string") {
      const decoded = jwtDecode(token);
      if (decoded.role == "student") {
        navigate(`/studdashboard/${decoded.id}`);
      } else if (decoded.role == "admin") {
        navigate(`/admin`);
      } else if (decoded.role == "teacher") {
        navigate(`/dashboard/${decoded.id}`);
      }
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          studentid,
          password,
        },
      );
      console.log(response.data);
      setLoading(false);
      if (typeof response.data.errors != "undefined") {
        setError(response.data.errors);
      } else if (typeof response.data.token != "undefined") {
        localStorage.setItem("token", response.data.token);
        localStorage.token = response.data.token;
        const decoded = jwtDecode(localStorage.token);
        if (decoded.role == "student") {
          navigate(`/studdashboard/${decoded.id}`);
        }
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
    //     <div className="" id="studentLogin">
    //   <div className="">
    //     <div className="">Student Login</div>
    //     <form className="">
    //       <div className="">
    //         <label htmlFor="fname" className="">Email</label>
    //         <input type="text" id="fname" name="fname" className=""  onChange={(e) => {setEmail(e.target.value)}} />
    //       </div>
    //       <div className="">
    //         <label htmlFor="lname" className="">Password</label>
    //         <input type="password" id="lname" name="lname" className="" onChange={(e) => {setPassword(e.target.value)}} />
    //       </div>
    //     </form>
    //     <button className="" onClick={handleSubmit}>Login</button>

    //     <div className="">Not a Student?</div>
    //     <div className="">
    //       <Link to="/teacherlogin" className="">Teacher login</Link>
    //       <Link to="/adminlogin"className="">Admin login</Link>
    //     </div>
    //   </div>
    // </div>
    // <div className="STUDENT_WRAPPER">
    //   <div className="login_mainPage" id="login_studentLogin">
    //     <div className="login_loginContainer">
    //       <div className="login_loginText">Student Login</div>
    //       <form className="login_loginInput">
    //         <div className="login_email">
    //           <label htmlFor="email" className="login_text" >Student ID</label>
    //           <input type="text" id="email" name="email" className="login_box" onChange={(e) => { setEmail(e.target.value) }} />
    //         </div>
    //         <div className="login_password">
    //           <label htmlFor="password" className="login_text">Password</label>
    //           <input type="password" id="password" name="password" className="login_box" onChange={(e) => { setPassword(e.target.value) }} />
    //         </div>
    //       </form>
    //       <button className="login_loginButton" onClick={handleSubmit}>Login</button>

    //       <div className="login_notA">Not a Student?</div>
    //       <div className="login_otherLoginBtns">
    //         <Link to="/teacherlogin" className="login_teacherLoginBtn">Teacher login</Link>
    //         <Link to="/adminlogin" className="login_adminLoginBtn">Admin login</Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="STUDLOGIN_WRAPPER">
      <div className="loginStudent_mainPage" id="loginStudent_studentLogin">
        <div className="loginStudent_loginContainer">
          <div className="loginStudent_loginText">Student Login</div>
          <form className="loginStudent_loginInput">
            <div className="loginStudent_email">
              <label htmlFor="email" className="loginStudent_text">
                Student ID
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="loginStudent_box"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="loginStudent_password">
              <label htmlFor="password" className="loginStudent_text">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="loginStudent_box"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </form>
          <button className="loginStudent_loginButton" onClick={handleSubmit}>
            Login
          </button>

          <div className="loginStudent_notA">Not a Student?</div>
          <div className="loginStudent_otherLoginBtns">
            <Link to="/teacherlogin" className="loginStudent_teacherLoginBtn">
              Teacher login
            </Link>
            <Link to="/adminlogin" className="loginStudent_adminLoginBtn">
              Admin login
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

    // <div className="mainPage">
    //     <div className="loginContainer">
    //         <div className="loginText">Login</div>
    //         <form className="loginInput">
    //             <div className="email">
    //                 <label htmlFor="fname" className="text">StudentID</label>
    //                 <input type="text" id="fname" name="studentid" className="box" onChange={(e) => {setEmail(e.target.value)}}/>
    //             </div>
    //             <div className="password">
    //                 <label htmlFor="lname" className="text">Password</label>
    //                 <input type="password" id="lname" name="password" className="box" onChange={(e) => {setPassword(e.target.value)}}/>
    //             </div>
    //         </form>
    //         <button type="submit" className="loginButton" onClick={handleSubmit}>Login</button>
    //         <div className="user-text">
    //             {/* <p className="login-text">or go to <Link to="/signup" className="login-link">Sign Up</Link></p> */}
    //             <div className="loading">{loading && "Loading .."}</div>
    //             <div className="error">{error}</div>
    //         </div>
    //     </div>
    // </div>
  );
}

export default StudentLogin;
