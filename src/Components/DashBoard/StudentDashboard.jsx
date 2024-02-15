import axios from "axios"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import './student_dashboard.css'
import profilePic from './images/temp.png'
import '../tables.css'

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
        <section className="mainPage">
            <section className="profile panel">
                <img className="profilePic" src={profilePic} alt="Your Profile Pic" />
                <div className="profileText">
                    <div className="name">{data.name}</div>
                    <div className="studentID">{data.studentid}</div>
                    <div className="department">CSE</div>
                </div>
            </section>

            <section className="table panel">
                <div className="heading">
                    <span className="code">Code</span>
                    <span className="subject">Subject Name</span>
                    <span className="semester">Sem</span>
                </div>
                {
                    data.classes && data.classes.map(cls => {
                        return (
                            <a className="entry" href="#">
                                <span className="code">{cls.classCode}</span>
                                <span className="subject">{cls.className}</span>
                                <span className="semester">1</span>
                            </a>
                        )
                    })
                }

                {/* <a className="entry" href="../lecture_attendance_STUDENT/lecAttedStudent.html">
                    <span className="code">CST102</span>
                    <span className="subject">Data Structure and Algorithms</span>
                    <span className="semester">2</span>
                </a>
                <a className="entry" href="../lecture_attendance_STUDENT/lecAttedStudent.html">
                    <span className="code">ECT103</span>
                    <span className="subject">Circuit Theory</span>
                    <span className="semester">1</span>
                </a>
                <a className="entry" href="../lecture_attendance_STUDENT/lecAttedStudent.html">
                    <span className="code">ECT101</span>
                    <span className="subject">Digital Design</span>
                    <span className="semester">1</span>
                </a> */}
            </section>
        </section>
    )

}

export default StudentDashboard