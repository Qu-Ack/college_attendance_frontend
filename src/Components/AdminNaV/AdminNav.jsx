import './Adminnav.css'
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
function AdminNav() {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate()
    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    function handleAdminLogout() {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className='ADMINNAV_WRAPPER'>
            <header className="A_header">
                <button className={`A_hamburger ${isActive ? 'A_is-active' : ''}`} id="A_adminHamburger" onClick={toggleMenu}>
                    <div className="A_navbar"></div>
                </button>
                <button className="A_logOut" onClick={handleAdminLogout}>Log Out</button>
            </header>

            <nav className={`A_navigation ${isActive ? 'A_is-active' : ''}`}>
                <Link className="A_dashboard" to="/admin">Dashboard</Link>

                <div className="A_dropdown">
                    <button className="A_dropbtn">Add</button>
                    <div className="A_dropdown-content">
                        <Link to="createclass" className="A_addSubject">Subject</Link>
                        <Link to="createteacher" className="A_addTeacher">Teacher</Link>
                        <Link to="createstudent" className="A_addStudent">Student</Link>
                    </div>
                </div>

                {/* Uncomment the below code if needed */}
                {/* <div className="A_dropdown">
                    <button className="A_dropbtn">Remove</button>
                    <div className="A_dropdown-content">
                        <a href="#" className="A_removeSubject">Subject</a>
                        <a href="#" className="A_removeTeacher">Teacher</a>
                        <a href="#" className="A_removeStudent">Student</a>
                    </div>
                </div> */}

                <div className="A_dropdown">
                    <button className="A_dropbtn">Assign Subject to</button>
                    <div className="A_dropdown-content">
                        <Link to="assignteachertoclass" className="A_assignTeacher">Teacher</Link>
                        <Link to="assignstudenttoclass" className="A_assignStudent">Student</Link>
                    </div>
                </div>

            </nav>

            <Outlet/>
        </ div>

    )
}

export default AdminNav