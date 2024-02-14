import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom";

function Class() {
    const [lectureName, setLectureName] = useState("");
    const [myclass, setmyClass] = useState({});
    const { classid } = useParams();


    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };
    async function handleClick(e) {
        e.preventDefault();
        console.log(myHeaders)
        const response = await axios.post(`https://collegeattendance-production.up.railway.app/api/class/lecture/${classid}`, {
            lecture_name: lectureName
        }, { headers: myHeaders });

        console.log(response)
        const response2 = await axios.get(`https://collegeattendance-production.up.railway.app/api/singleclass/${classid}`, {headers:myHeaders})
        // console.log(response.data)
        setmyClass(response2.data.cls)
    }

    useEffect(() => {
        async function request() {
            const response = await axios.get(`https://collegeattendance-production.up.railway.app/api/singleclass/${classid}`, {
                headers: myHeaders
            })
            console.log(response.data)
            setmyClass(response.data.cls)
        }

        request()
    }, [])


    console.log(myclass)
    return (
        <div className="myclass">
            <h1>Class {classid}</h1>
            <form method="POST">
                <input type="text" name="lecture_name" id="lecture_name" placeholder="Enter The Lecture Name" value={lectureName} onChange={(e) => { setLectureName(e.target.value) }} />
                <button onClick={handleClick}>Schedule a Lecture</button>
            </form>
            <h1>class Name: {myclass.className}</h1>
            <h1>Class Code: {myclass.classCode}</h1>
            <h1>Previous Lectures</h1>
            <ul>
                {myclass.lectures && myclass.lectures.length === 0 ? (
                    <h1>No Lectures yet</h1>
                ) : (
                    myclass.lectures && myclass.lectures.map(lecture => {
                        return (
                            <>
                                <Link to={`lectures/${lecture._id}`} key={lecture._id}>{lecture.lectureName} -------   {lecture.dateTime}</Link>
                                <br></br>
                            </>
                        )
                    })
                )}
            </ul>

        </div>
    )

}
export default Class