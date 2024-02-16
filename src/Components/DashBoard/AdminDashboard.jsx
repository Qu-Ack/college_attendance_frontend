import { Link } from "react-router-dom"

function AdminDashBoard() {
    return(
        <>
        <Link to="/admin/createclass">Create Class</Link>
        <br />
        <Link to="/admin/createteacher">Create Teacher</Link>
        <br />
        <Link to='/admin/assignstudenttoclass'>Assign Student TO Class</Link>
        <br />
        <Link to='/admin/assignteachertoclass'>Assign Teacher To Class</Link>
        </>

    )
}

export default AdminDashBoard