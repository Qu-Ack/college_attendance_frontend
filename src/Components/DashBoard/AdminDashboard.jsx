import { Link } from "react-router-dom"
import profilePic from './images/temp.png'
import '../AdminNaV/Adminnav.css'

function AdminDashBoard() {
    return (
        <>
            <section className="A_mainPage" id="A_adminDashboard">
                <section className="A_profile">
                    <img className="A_profilePic" src={profilePic} alt="Your Profile Pic" />
                    <div className="A_profileText">
                        <div className="A_name">John Doe</div>
                        <div className="A_designation">ADMIN</div>
                        {/* <div className="A_department">Department of CSE</div> */}
                    </div>
                </section>
            </section>
        </>

    )
}

export default AdminDashBoard