import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import './lecture_list.css'

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
        const response2 = await axios.get(`https://collegeattendance-production.up.railway.app/api/singleclass/${classid}`, { headers: myHeaders })
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


    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    function formatTime(isoDateString) {
        const date = new Date(isoDateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    }

    console.log(myclass)
    return (
        // <div className="myclass">
        //     <h1>Class {classid}</h1>
        //     <form method="POST">
        //         <input type="text" name="lecture_name" id="lecture_name" placeholder="Enter The Lecture Name" value={lectureName} onChange={(e) => { setLectureName(e.target.value) }} />
        //         <button onClick={handleClick}>Schedule a Lecture</button>
        //     </form>
        //     <h1>class Name: {myclass.className}</h1>
        //     <h1>Class Code: {myclass.classCode}</h1>
        //     <h1>Previous Lectures</h1>
        //     <ul>
        //         {myclass.lectures && myclass.lectures.length === 0 ? (
        //             <h1>No Lectures yet</h1>
        //         ) : (
        //             myclass.lectures && myclass.lectures.map(lecture => {
        //                 return (
        //                     <>
        //                         <Link to={`lectures/${lecture._id}`} key={lecture._id}>{lecture.lectureName} -------   {lecture.dateTime}</Link>
        //                         <br></br>
        //                     </>
        //                 )
        //             })
        //         )}
        //     </ul>

        // </div>

        // <section className="mainPage">
        //     <h1 className="subjectName">{myclass.classCode} - {myclass.className}</h1>
        //     {/* <h2 className="section">Section A</h2> */}
        //     <form method="POST">
        //         <input type="text" name="lecture_name" id="lecture_name" placeholder="Enter The Lecture Name" value={lectureName} onChange={(e) => { setLectureName(e.target.value) }} />
        //         <button className="scheduleLecture" onClick={handleClick}>Schedule Lecture</button>
        //     </form>

        //     <section className="table panel">
        //         <div className="heading">
        //             <span className="lectureNumber">Lec No.</span>
        //             <span className="lectureTitle">Title</span>
        //             <span className="date">Date</span>
        //             <span className="time">Time</span>
        //         </div>
        //         {myclass.lectures && myclass.lectures.length === 0 ? (
        //             <h1>No Lectures yet</h1>
        //         ) : (
        //             myclass.lectures && myclass.lectures.map(lecture => {
        //                 return (
        //                     <>
        //                         {/* <Link to={`lectures/${lecture._id}`} key={lecture._id}>{lecture.lectureName} -------   {lecture.dateTime}</Link>
        //                         <br></br> */}
        //                         <Link className="entry" to={`lectures/${lecture._id}`}>
        //                             <span className="lectureNumber">1</span>
        //                             <span className="lectureTitle">{lecture.lectureName}</span>
        //                             <span className="date">{formatDate(lecture.dateTime)}</span>
        //                             <span className="time">{formatTime(lecture.dateTime)}</span>
        //                         </Link>
        //                     </>
        //                 )
        //             })
        //         )}

        //     </section>
        // </section>


        <div className="Ll_">

            <section className="Ll_mainPage">
                <h1 className="Ll_subjectName">{myclass.classCode} - {myclass.className}</h1>
                {/* Uncomment if needed */}
                {/* <h2 className="Ll_section">Section A</h2> */}
                <form method="POST">
                    <input type="text" name="lecture_name" id="lecture_name" placeholder="Enter The Lecture Name" value={lectureName} onChange={(e) => { setLectureName(e.target.value) }} />
                    <button className="Ll_scheduleLecture" onClick={handleClick}>Schedule Lecture</button>
                </form>

                <section className="Ll_table Li_panel">
                    <div className="Ll_heading">
                        <span className="Ll_lectureNumber">Lec No.</span>
                        <span className="Ll_lectureTitle">Title</span>
                        <span className="Ll_date">Date</span>
                        <span className="Ll_time">Time</span>
                    </div>
                    {myclass.lectures && myclass.lectures.length === 0 ? (
                        <h1>No Lectures yet</h1>
                    ) : (
                        myclass.lectures && myclass.lectures.map((lecture, index) => {
                            return (
                                <>
                                    {/* <Link to={`lectures/${lecture._id}`} key={lecture._id}>{lecture.lectureName} -------   {lecture.dateTime}</Link>
                    <br></br> */}
                                    <Link key={index} to={`lectures/${lecture._id}`} className="Ll_entry">
                                        <span className="Ll_lectureNumber">{index + 1}</span>
                                        <span className="Ll_lectureTitle">{lecture.lectureName}</span>
                                        <span className="Ll_date">{formatDate(lecture.dateTime)}</span>
                                        <span className="Ll_time">{formatTime(lecture.dateTime)}</span>
                                    </Link>
                                </>
                            )
                        })
                    )}
                    {/* <Link to={`lectures/${lecture._id}`} className="Ll_entry">
                        <span className="Ll_lectureNumber">1</span>
                        <span className="Ll_lectureTitle">{lecture.lectureName}</span>
                        <span className="Ll_date">{formatDate(lecture.dateTime)}</span>
                        <span className="Ll_time">{formatTime(lecture.dateTime)}</span>
                    </Link> */}
                    {/* Repeat the above <a> tag for each lecture entry */}
                </section>
            </section>
        </div>
    )


    // <div className="Ll_">

    //         <section className="Ll_mainPage">
    //             <h1 className="Ll_subjectName">{myclass.classCode} - {myclass.className}</h1>
    //             {/* Uncomment if needed */}
    //             {/* <h2 className="Ll_section">Section A</h2> */}
    // <form method="POST">
    //             <input type="text" name="lecture_name" id="lecture_name" placeholder="Enter The Lecture Name" value={lectureName} onChange={(e) => { setLectureName(e.target.value) }} />
    //             <button className="Ll_scheduleLecture" onClick={handleClick}>Schedule Lecture</button>
    //         </form>

    //             <section className="Ll_table Li_panel">
    //                 <div className="Ll_heading">
    //                     <span className="Ll_lectureNumber">Lec No.</span>
    //                     <span className="Ll_lectureTitle">Title</span>
    //                     <span className="Ll_date">Date</span>
    //                     <span className="Ll_time">Time</span>
    //                 </div>
    // {myclass.lectures && myclass.lectures.length === 0 ? (
    //     <h1>No Lectures yet</h1>
    // ) : (
    //     myclass.lectures && myclass.lectures.map(lecture => {
    //         return (
    //             <>
    //                 {/* <Link to={`lectures/${lecture._id}`} key={lecture._id}>{lecture.lectureName} -------   {lecture.dateTime}</Link>
    //                 <br></br> */}
    //                 <Link to={`lectures/${lecture._id}`} className="Ll_entry">
    // //                     <span className="Ll_lectureNumber">1</span>
    // //                     <span className="Ll_lectureTitle">{lecture.lectureName}</span>
    // //                     <span className="Ll_date">{formatDate(lecture.dateTime)}</span>
    // //                     <span className="Ll_time">{formatTime(lecture.dateTime)}</span>
    // //                 </Link>
    //             </>
    //         )
    //     })
    // )}
    //                 <Link to={`lectures/${lecture._id}`} className="Ll_entry">
    //                     <span className="Ll_lectureNumber">1</span>
    //                     <span className="Ll_lectureTitle">{lecture.lectureName}</span>
    //                     <span className="Ll_date">{formatDate(lecture.dateTime)}</span>
    //                     <span className="Ll_time">{formatTime(lecture.dateTime)}</span>
    //                 </Link>
    //                 {/* Repeat the above <a> tag for each lecture entry */}
    //             </section>
    //         </section>
    //     </div>

}
export default Class