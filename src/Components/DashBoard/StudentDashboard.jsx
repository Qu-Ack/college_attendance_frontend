import axios from "axios"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { useParams } from "react-router"

function StudentDashboard() {
    const [data, setData] = useState({});
    const { studid } = useParams();

    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };
    useEffect(() => {
        async function request() {
            try {
                const response = await axios.get(`https://collegeattendance-production.up.railway.app/api/student/${studid}`, {
                    headers: myHeaders
                })
                console.log(response.data.stud)
                setData(response.data.stud)

            } catch (err) {
                console.log("error", err);
            }
        }
        request()
    }, [])

    return (
        <>
        <h1>My Classes</h1>
            <ul>
                {
                    data.classes && data.classes.map((cls) => <Link>{cls.className}</Link>)
                }
            </ul>
        <Link to="/reader">Scan Qr Code</Link>
        </>
    )

}

export default StudentDashboard