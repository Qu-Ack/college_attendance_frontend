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
    const [count, setCount] = useState(1)
    const [classData, setClassData] = useState({})
    const [lecid, setLecId] = useState(`${lectureid}+${generateRandomString(20)}`)
    const [qrValue, setQrValue] = useState("")
    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };

    function generateRandomString(length) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset[randomIndex];
        }
        return randomString;
    }


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
            socket.on('qrCodeScanned', (emmitdata) => {
                console.log("Event detected");
                async function request() {
                    const response = await axios.get(`https://collegeattendance-production.up.railway.app/api/lecture/${lectureid}`, {
                        headers: myHeaders
                    })
                    setLectureData(response.data.lecture)
                }

                request()
                console.log(emmitdata)
                setLecId(`${emmitdata.split("+")[0]}+${generateRandomString(20)}`);
                // console.log(lecid)
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
        // // <QRCodeSVG value={lectureid}></QRCodeSVG>
        // <section className="mainPage">
        //     <h1 className="subjectName">{lectureData.lectureCode} - {lectureData.lectureName}</h1>
        //     <h2 className="lectureNumber">Lecture 1{/* - Section A*/}</h2>
        //     {/* Insert your QR in this div */}
        //     <div className="QRcontainer panel">
        //         <div className="detailsContainer">
        //             <h3>Class details: </h3>
        //             <div className="line"></div>
        //             <div className="details">
        //                 {/* <p>Section: <span>A</span></p> */}
        //                 <p>Date: <span>{formatDate(lectureData.dateTime)}</span></p>
        //                 <p>Time: <span>{formatTime(lectureData.dateTime)}</span></p>
        //             </div>
        //         </div>
        //         <QRCodeSVG className="QRcode" value={lecid} />
        //     </div>
        //     <button className="deleteLecture">Delete this Lecture</button>

        //     <section className="table panel">
        //         <div className="heading">
        //             <span className="serialNumber">Sr. No.</span>
        //             <span className="studentID">Student ID</span>
        //             <span className="attendance">Attendance</span>
        //         </div>

        //         {
        //             lectureData.attendance && lectureData.attendance.map((stud) => {
        //                 return (
        //                     <a className="entry" href="#">
        //                         <span className="serialNumber">1</span>
        //                         <span className="studentID">{stud.student.studentid}</span>
        //                         {/* <span className="studentID">{stud.student.name}</span> */}
        //                         <span className="attendance">{stud.status}</span>
        //                     </a>
        //                 )
        //             })
        //         }
        //     </section>
        // </section>
        <div className="LAT_WRAPPER">
            <section className="LAT_mainPage">
                <h1 className="LAT_subjectName">ECT103 - Circuit Theory</h1>
                <h2 className="LAT_lectureNumber">Lecture Number : 1</h2>
                <div className="LAT_QRcontainer">
                    <div className="LAT_detailsContainer">
                        <h3>Class details:</h3>
                        <div className="LAT_line"></div>
                        <div className="LAT_details">
                            <p>Date: <span>{formatDate(lectureData.dateTime)}</span></p>
                            <p>Time: <span>{formatTime(lectureData.dateTime)}</span></p>
                        </div>
                    </div>
                    <QRCodeSVG className="QRcode" value={lecid} />
                </div>
                <button className="LAT_deleteLecture">Delete this Lecture</button>

                <section className="LAT_table">
                    <div className="LAT_heading">
                        <span className="LAT_serialNumber">Sr. No.</span>
                        <span className="LAT_studentID">Student ID</span>
                        <span className="LAT_attendance">Attendance</span>
                    </div>

                    {lectureData.attendance && lectureData.attendance.map((stud, index) => (
                        <a key={index} className="LAT_entry" href="#">
                            <span className="LAT_serialNumber">{index + 1}</span>
                            <span className="LAT_studentID">{stud.student.studentid}</span>
                            <span className="LAT_attendance">{stud.status}</span>
                        </a>
                    ))}

                    {/* Sample data */}
                    <a className="LAT_entry" href="#">
                        <span className="LAT_serialNumber">1</span>
                        <span className="LAT_studentID">2023KUEC2016</span>
                        <span className="LAT_attendance">Absent</span>
                    </a>
                    <a className="LAT_entry" href="#">
                        <span className="LAT_serialNumber">2</span>
                        <span className="LAT_studentID">2023KUEC2017</span>
                        <span className="LAT_attendance"></span>
                    </a>
                    <a className="LAT_entry" href="#">
                        <span className="LAT_serialNumber">3</span>
                        <span className="LAT_studentID">2023KUEC2018</span>
                        <span className="LAT_attendance">Unknown</span>
                    </a>
                </section>
            </section>
        </div>
    )



    // <section class="LAT_mainPage">
    //     <h1 class="LAT_subjectName">ECT103 - Circuit Theory</h1>
    //     <h2 class="LAT_lectureNumber">Lecture 1<!-- - Section A--></h2>
    //     <!-- Insert your QR in this div -->
    //     <div class="LAT_QRcontainer" >
    //         <div class="LAT_detailsContainer">
    //             <h3>Class details: </h3>
    //             <div class="LAT_line"></div>
    //             <div class="LAT_details">
    //                 <!-- <p>Section: <span>A</span></p> -->
    //                 <p>Date: <span>{formatDate(lectureData.dateTime)}</span></p>
    //                 <p>Time: <span>{formatTime(lectureData.dateTime)}</span></p>
    //             </div>
    //         </div>
    //         <QRCodeSVG className="QRcode" value={lecid} />
    //     </div>
    //     <button class="LAT_deleteLecture">Delete this Lecture</button>

    //     <section class="LAT_table">
    //         <div class="LAT_heading">
    //             <span class="LAT_serialNumber">Sr. No.</span>
    //             <span class="LAT_studentID">Student ID</span>
    //             <span class="LAT_attendance">Attendance</span>
    //         </div>

    // {
    //     lectureData.attendance && lectureData.attendance.map((stud) => {
    //    setCount(count + 1)
    //         return (
    //             <a class="LAT_entry" href = "#">
    //             <span class="LAT_serialNumber">{count}</span>
    //             <span class="LAT_studentID">{stud.student.studentid}</span>
    //             <span class="LAT_attendance">{stud.status}</span>
    //         </a>
    //         )
    //     })
    // }
    //        
    //         <a class="LAT_entry" href = "#">
    //             <span class="LAT_serialNumber">1</span>
    //             <span class="LAT_studentID">2023KUEC2016</span>
    //             <span class="LAT_attendance">Absent</span>
    //         </a>
    //         <a class="LAT_entry" href = "#">
    //             <span class="LAT_serialNumber">1</span>
    //             <span class="LAT_studentID">2023KUEC2016</span>
    //             <span class="LAT_attendance"></span>
    //         </a>
    //         <a class="LAT_entry" href = "#">
    //             <span class="LAT_serialNumber">1</span>
    //             <span class="LAT_studentID">2023KUEC2016</span>
    //             <span class="LAT_attendance">Unknown</span>
    //         </a>
    //     </section>
    // </section>
}

export default Lecture