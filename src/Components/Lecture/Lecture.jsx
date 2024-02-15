import { useParams } from "react-router"
import { QRCodeSVG } from "qrcode.react"
import { useEffect, useState } from "react";
import axios from "axios";
import './lecAttendTeach.css'
function Lecture() {
    const { classid, lectureid } = useParams();

    const [lectureData, setLectureData] = useState({})
    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };
    useEffect(() => {
        async function request() {
            try {
                const response = await axios.get(`https://collegeattendance-production.up.railway.app/api/lecture/${lectureid}`, {
                    headers: myHeaders
                })
                setLectureData(response.data.lecture)
                // console.log(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        request()
    }, [])

    return (
        // <QRCodeSVG value={lectureid}></QRCodeSVG>
        <section className="mainPage">
            <h1 className="subjectName">ECT103 - Circuit Theory</h1>
            <h2 className="lectureNumber">Lecture 1{/* - Section A*/}</h2>
            {/* Insert your QR in this div */}
            <div className="QRcontainer panel">
                <div className="detailsContainer">
                    <h3>Class details: </h3>
                    <div className="line"></div>
                    <div className="details">
                        {/* <p>Section: <span>A</span></p> */}
                        <p>Date: <span>16/01/2024</span></p>
                        <p>Time: <span>10:00</span></p>
                    </div>
                </div>
                <QRCodeSVG className="QRcode" value={lectureid} />
            </div>
            <button className="deleteLecture">Delete this Lecture</button>

            <section className="table panel">
                <div className="heading">
                    <span className="serialNumber">Sr. No.</span>
                    <span className="studentID">Student ID</span>
                    <span className="attendance">Attendance</span>
                </div>

                {
                    lectureData.attendance && lectureData.attendance.map((stud) => {
                        return (
                            <a className="entry" href="#">
                                <span className="serialNumber">1</span>
                                <span className="studentID">{stud.student.studentid}</span>
                                {/* <span className="studentID">{stud.student.name}</span> */}
                                <span className="attendance">{stud.status}</span>
                            </a>
                        )
                    })
                }
            </section>
        </section>
    )
}

export default Lecture