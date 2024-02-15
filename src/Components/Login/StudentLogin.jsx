import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './login.css'

function StudentLogin() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [studentid, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const token = localStorage.token;
        if (token && typeof token === 'string') {
            const decoded = jwtDecode(token);
            navigate(`/studdashboard/${decoded.id}`);
        }
    }, [navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {

            const response = await axios.post("https://collegeattendance-production.up.railway.app/api/login", {
                studentid,
                password
            })
            console.log(response)
            setLoading(false);
            if (typeof response.data.errors != 'undefined') {
                setError(response.data.errors.errors[0].msg);
            } else if (typeof response.data.token != 'undefined') {
                localStorage.token = response.data.token;
                const decoded = jwtDecode(localStorage.token)
                console.log(decoded)
                navigate(`/studdashboard/${decoded.id}`)
            } else {
                // console.log(response.data.errors)
                setError(response.data.errors);
                console.log(error)

            }
        } catch (err) {
            setError(err)
        }
    }

    return (
        // <div className="form-wrapper">
        //     <form method="POST">
        //         <input type="email" name="studentid" id="studentid" placeholder="enter your studentid" onChange={(e) => {setEmail(e.target.value)}}/>
        //         <input type="password" name="password" id="password" placeholder="enter your password" onChange={(e) => {setPassword(e.target.value)}}/>
        //         <button type="submit" onClick={handleSubmit}>Log In</button>
        //         <div className="user-text">
        //             <p className="login-text">or go to <Link to="/signup" className="login-link">Sign Up</Link></p>
        //             <div className="loading">{loading && "Loading .."}</div>
        //             {/* <div className="error">{error}</div> */}
        //         </div>
        //     </form>
        // </div>
        <div className="mainPage">
            <div className="loginContainer">
                <div className="loginText">Login</div>
                <form className="loginInput">
                    <div className="email">
                        <label htmlFor="fname" className="text">StudentID</label>
                        <input type="text" id="fname" name="studentid" className="box" onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <div className="password">
                        <label htmlFor="lname" className="text">Password</label>
                        <input type="password" id="lname" name="password" className="box" onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                </form>
                <button type="submit" className="loginButton" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )
}

export default StudentLogin