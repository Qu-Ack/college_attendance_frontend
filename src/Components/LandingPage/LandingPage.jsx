import { Link } from "react-router-dom"

function LandingPage() {
    return(
        <>
        <Link to="/studentlogin">Student Login</Link>
        <Link to="/teacherlogin">Teacher Login</Link>
        </>
    )
}

export default LandingPage