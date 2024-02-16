import { useParams } from "react-router"
import { QRCodeSVG } from "qrcode.react"
import { useEffect, useState } from "react";
import axios from "axios";
import './lecAttendTeach.css'
import io from 'socket.io-client'
function Lecture() {
    const { classid, lectureid } = useParams();
    const [socket, setSocket] = useState(null)
    const [lectureData, setLectureData] = useState({})
    const [lecid, setLecId] = useState(`${lectureid}+`)
    const [qrValue, setQrValue] = useState("")
    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };
    useEffect(() => {
        async function request() {
            try {
                const skt = io("https://collegeattendance-production.up.railway.app/")
                setSocket(skt)
                const response = await axios.get(`https://collegeattendance-production.up.railway.app/api/lecture/${lectureid}`, {
                    headers: myHeaders
                })
                setLectureData(response.data.lecture)
                console.log(response.data)


                // if(socket) {
                //     socket.on('qrCodeScanned', ({ result }) => {
                //         console.log("event detected")
                //         setLecId(result)
                //     })
                // }
                
            }
            catch (err) {
                console.log(err)
            }
        }
        request()

        return () => {
            if (socket) {
                socket.disconnect();
            }
        }
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('qrCodeScanned', ({ result }) => {
                console.log("Event detected");
                setLecId(result);
            });
        }
    
        return () => {
            if (socket) {
                socket.off('qrCodeScanned'); // Clean up event listener when unmounting
            }
        };
    }, [socket]);

    // useEffect(() => {
    //     if (socket) {
    //         socket.on('qrCodeScanned' , ({result}) => {
    //             setLecId(result);
    //         });
    //     }
    // }, [socket]);

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
    return (
        // <QRCodeSVG value={lectureid}></QRCodeSVG>
        <section className="mainPage">
            <h1 className="subjectName">{lectureData.lectureCode} - {lectureData.lectureName}</h1>
            <h2 className="lectureNumber">Lecture 1{/* - Section A*/}</h2>
            {/* Insert your QR in this div */}
            <div className="QRcontainer panel">
                <div className="detailsContainer">
                    <h3>Class details: </h3>
                    <div className="line"></div>
                    <div className="details">
                        {/* <p>Section: <span>A</span></p> */}
                        <p>Date: <span>{formatDate(lectureData.dateTime)}</span></p>
                        <p>Time: <span>{formatTime(lectureData.dateTime)}</span></p>
                    </div>
                </div>
                <QRCodeSVG className="QRcode" value={lecid} />
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