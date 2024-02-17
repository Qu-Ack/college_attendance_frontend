import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
// import styles from './login.module.css'

function TeacherLogin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        const token = localStorage.token;
        if (token && typeof token === 'string') {
            const decoded = jwtDecode(token);
            navigate(`/dashboard/${decoded.id}`);
        }
    }, [navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {

            const response = await axios.post("https://collegeattendance-production.up.railway.app/api/teacher/login", {
                username,
                password
            })
            console.log(response)
            setLoading(false);
            if (typeof response.data.errors != 'undefined') {
                setError(response.data.errors);
            } else if (typeof response.data.token != 'undefined') {
                localStorage.token = response.data.token;
                const decoded = jwtDecode(localStorage.token)
                navigate(`/dashboard/${decoded.id}`)
            } else {
                // console.log(response.data.errors)
                setError(response.data);
                console.log(error)

            }
        } catch (err) {
            setError(err.message)
        }
    }


    return (
        // <div className="form-wrapper">
        //     <form method="POST">
        //         <input type="text" name="username" id="username" placeholder="enter your username" onChange={(e) => { setEmail(e.target.value) }} />
        //         <input type="password" name="password" id="password" placeholder="enter your password" onChange={(e) => { setPassword(e.target.value) }} />
        //         <button type="submit" onClick={handleSubmit}>Log In</button>
        //         <div className="user-text">
        //             {/* <p className="login-text">or go to <Link to="/signup" className="login-link">Sign Up</Link></p> */}
        //             <div className="loading">{loading && "Loading .."}</div>
        //             <div className="error">{error}</div>
        //         </div>
        //     </form>
        // </div>

        <div className="" id="teacherLogin">
      <div className="">
        <div className="">Teacher Login</div>
        <form className="">
          <div className="">
            <label htmlFor="fname" className="">Email</label>
            <input type="text" id="fname" name="fname" className="" onChange={(e) => { setEmail(e.target.value) }}/>
          </div>
          <div className={styles.password}>
            <label htmlFor="lname" className={styles.text}>Password</label>
            <input type="password" id="lname" name="lname" className=""  onChange={(e) => { setPassword(e.target.value) }}/>
          </div>
        </form>
        <button className="" onClick={handleSubmit}>Login</button>

        <div className="">Not a Teacher?</div>
        <div className="">
          <Link to="/" className="">Student login</Link>
          <Link to="/adminlogin" className="">Admin login</Link>
        </div>
      </div>
    </div>
    )
}

export default TeacherLogin