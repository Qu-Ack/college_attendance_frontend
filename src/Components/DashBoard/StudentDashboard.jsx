import axios from "axios"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import './student_dashboard.css'
import profilePic from './images/temp.png'
// import '../tables.css'

function StudentDashboard() {
    const [data, setData] = useState({});
    const { studid } = useParams();
    const [loading, setLoading] = useState(false)

    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };
    useEffect(() => {
        async function request() {
            try {
                setLoading(true)
                const response = await axios.get(`http://localhost:5000/api/student/${studid}`, {
                    headers: myHeaders
                })
                setLoading(false)
                console.log(response.data.stud)
                setData(response.data.stud)

            } catch (err) {
                console.log("error", err);
            }
        }
        request()
    }, [])

    if (loading) {
        return <div className="STUD_WRAPPER"><h1 className="loading_screen">Loading ...</h1></div>
    }

    return (
        // <section className="mainPage">
        //     <section className="profile panel">
        //         <img className="profilePic" src={profilePic} alt="Your Profile Pic" />
        //         <div className="profileText">
        //             <div className="name">{data.name}</div>
        //             <div className="studentID">{data.studentid}</div>
        //             <div className="department">CSE</div>
        //         </div>
        //     </section>
        //     {/* <button class = "markAttendance">Mark Attendance</button> */}
        //     <Link to="/reader" className="markAttendance">Mark Attendance</Link>
        //     <section className="table panel">
        //         <div className="heading">
        //             <span className="code">Code</span>
        //             <span className="subject">Subject Name</span>
        //             <span className="semester">Sem</span>
        //         </div>
        //         {
        //             data.classes && data.classes.map(cls => {
        //                 return (
        //                     <a className="entry" href="#">
        //                         <span className="code">{cls.classCode}</span>
        //                         <span className="subject">{cls.className}</span>
        //                         <span className="semester">1</span>
        //                     </a>
        //                 )
        //             })
        //         }

        //         {/* <a className="entry" href="../lecture_attendance_STUDENT/lecAttedStudent.html">
        //             <span className="code">CST102</span>
        //             <span className="subject">Data Structure and Algorithms</span>
        //             <span className="semester">2</span>
        //         </a>
        //         <a className="entry" href="../lecture_attendance_STUDENT/lecAttedStudent.html">
        //             <span className="code">ECT103</span>
        //             <span className="subject">Circuit Theory</span>
        //             <span className="semester">1</span>
        //         </a>
        //         <a className="entry" href="../lecture_attendance_STUDENT/lecAttedStudent.html">
        //             <span className="code">ECT101</span>
        //             <span className="subject">Digital Design</span>
        //             <span className="semester">1</span>
        //         </a> */}
        //     </section>
        // </section>

        <div className="STUD_WRAPPER">
            <section className="SD_mainPage">
                <section className="SD_profile panel">
                    <img className="SD_profilePic" src={profilePic} alt="Your Profile Pic" />
                    <div className="SD_profileText">
                        <div className="SD_name">{data.name}</div>
                        <div className="SD_studentID">{data.studentid}</div>
                        {/* <div className="SD_department">CSE</div> */}
                    </div>
                </section>

                <button className="SD_markAttendance"><Link to="/reader" className="SD_MarkAtt_Link">Mark Attendance</Link></button>

                <section className="SD_table panel">
                    <div className="SD_heading">
                        <span className="SD_code">Code</span>
                        <span className="SD_subject">Subject Name</span>
                        {/* <span className="SD_semester">Sem</span> */}
                    </div>

                    {
                        data.classes && data.classes.map(cls => {
                            return (
                                <a className="SD_entry" href="#">
                                    <span className="SD_code">{cls.classCode}</span>
                                    <span className="SD_subject">{cls.className}</span>
                                    {/* <span className="SD_semester">1</span> */}
                                </a>
                            )
                        })
                    }
                </section>
            </section>
        </div>


    )


    // <section className="SD_mainPage">
    //         <section className="SD_profile panel">
    //             <img className="SD_profilePic" src={profilePic} alt="Your Profile Pic" />
    //             <div className="SD_profileText">
    //                 <div className="SD_name">{data.name}</div>
    //                 <div className="SD_studentID">{data.studentid}</div>
    //                 <div className="SD_department">CSE</div>
    //             </div>
    //         </section>

    //         <button className="SD_markAttendance"><Link to="/reader">Mark Attendance</Link></button>

    //         <section className="SD_table panel">
    //             <div className="SD_heading">
    //                 <span className="SD_code">Code</span>
    //                 <span className="SD_subject">Subject Name</span>
    //                 <span className="SD_semester">Sem</span>
    //             </div>

    // {
    //     data.classes && data.classes.map(cls => {
    //         return (
    //             <a className="SD_entry" href="#">
    //                 <span className="SD_code">{cls.classCode}</span>
    //                 <span className="SD_subject">{cls.className}</span>
    //                 <span className="SD_semester">1</span>
    //             </a>
    //         )
    //     })
    // }
    //             <a className="SD_entry" href="#">
    //                 <span className="SD_code">{cls.classCode}</span>
    //                 <span className="SD_subject">{cls.className}</span>
    //                 <span className="SD_semester">1</span>
    //             </a>
    //             <a className="SD_entry" href="../lecture_attendance_STUDENT/lecAttendStudent.html">
    //                 <span className="SD_code">CST102</span>
    //                 <span className="SD_subject">Data Structure and Algorithms</span>
    //                 <span className="SD_semester">2</span>
    //             </a>
    //             <a className="SD_entry" href="../lecture_attendance_STUDENT/lecAttendStudent.html">
    //                 <span className="SD_code">ECT103</span>
    //                 <span className="SD_subject">Circuit Theory</span>
    //                 <span className="SD_semester">1</span>
    //             </a>
    //             <a className="SD_entry" href="../lecture_attendance_STUDENT/lecAttendStudent.html">
    //                 <span className="SD_code">ECT101</span>
    //                 <span className="SD_subject">Digital Design</span>
    //                 <span className="SD_semester">1</span>
    //             </a>
    //         </section>
    //     </section>

}

export default StudentDashboard