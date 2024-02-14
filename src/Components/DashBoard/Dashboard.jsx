import { Outlet, useParams } from "react-router"
import Nav from "../Nav/Nav"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";





function DashBoard() {
    const [myclasses, setMyClasses] = useState([]);
    const { id } = useParams();
    const baseurl = `https://collegeattendance-production.up.railway.app/api/class/${id}`


    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };
    useEffect(() => {
        async function request() {
            try {
                const response = await axios.get(baseurl, {
                    headers: myHeaders
                });
                console.log(response.data);
                setMyClasses(response.data.classes);
            } catch (error) {
                console.error("An error occurred:", error);
                // Handle the error here, such as setting an error state
            }
        }
        request();
    }, []);

    return (
        <>
            <h1>My Classes</h1>
            <ul>{
                myclasses.map(myclass => <li key={myclass._id}><Link to={`/myclasses/${myclass._id}`}>{myclass.className}</Link></li>)
            }
            </ul>
        </>
    )
}


export default DashBoard