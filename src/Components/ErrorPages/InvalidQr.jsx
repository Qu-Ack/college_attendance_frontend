import { Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

function InvalidQr() {

    const decoded = jwtDecode(localStorage.token``)
    return(
        <>
        <h1>Invalid Qr</h1>
        <Link to="/reader">Scan Again</Link>
        <Link to={`/studdashboard/${decoded.id}`}></Link>
        </>
    )
}

export default InvalidQr