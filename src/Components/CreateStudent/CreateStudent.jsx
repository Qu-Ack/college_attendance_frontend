import { useState } from "react";
import axios from "axios";
import './createstudent.css'
// import { useSearchParams } from "react-router-dom";

function CreateStudent() {
    const [studentName, setStudentName] = useState("");
    const [studentid, setStudentId] = useState("");
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")

    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };

    function handleSubmit(e) {
        e.preventDefault();
        const response = axios.post("https://collegeattendance-production.up.railway.app/api/signup", {
            name: studentName,
            studentid,
            password,
            confirmpassword
        }, {
            headers: myHeaders
        })
        console.log(response.data)

        if (response.status == 200) {
            console.log("Success")
        } else {
            console.log(response)
        }

    }


    return (
        // <form method="POST">
        //     <input type="text" name="studentName" id="name" value={studentName} onChange={(e) => {setStudentName(e.target.value)}} placeholder="Enter the name of the Teacher"/>
        //     <input type="text" name="studentid" id="course_code" value={studentid} onChange={(e) => {setStudentId(e.target.value)}} placeholder="Enter the username"></input>
        //     {/* <input type="text" name="section" value={section} id="section" onChange={(e) => {setSection(e.target.value)}} placeholder="enter the section"></input> */}
        //     <input type="password" name="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter the password" />
        //     <input type="password" name="confirmpassword" id="confirmpassword" value={confirmpassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder="Enter the confirm password" />
        //     <button type="submit" onClick={handleSubmit}>create Teacher</button>
        // </form>
        <div className="CREATESTUD_WRAPPER">
            <section className="AASTD_mainPage">
                <h1 className="AASTD_title">Add a Student</h1>
                <form className="AASTD_addStudent" method="POST">
                    <label htmlFor="AASTD_studentName" className="AASTD_text">Student Name</label>
                    <input id="AASTD_studentName" type="text" value={studentName} onChange={(e) => { setStudentName(e.target.value) }} className="AASTD_box" />
                    <label htmlFor="AASTD_studentID" className="AASTD_text">Student ID</label>
                    <input id="AASTD_studentID" type="text" className="AASTD_box" value={studentid} onChange={(e) => { setStudentId(e.target.value) }} />
                    <label htmlFor="AASTD_studentPassword" className="AASTD_text" >Password</label>
                    <input id="AASTD_studentPassword" type="password" className="AASTD_box" value={password} onChange={(e) => { setPassword(e.target.value) }}/>
                    <label htmlFor="AASTD_studentConfirmPassword" className="AASTD_text">Confirm Password</label>
                    <input id="AASTD_studentConfirmPassword" type="password" value={confirmpassword} onChange={(e) => { setConfirmPassword(e.target.value) }} className="AASTD_box" />
                    <button id="AASTD_submit" onClick={handleSubmit}>Add</button>
                </form>
            </section>
        </div>

    )

    // <section className="AASTD_mainPage">
    //             <h1 className="AASTD_title">Add a Student</h1>
    //             <form className="AASTD_addStudent" method="POST">
    //                 <label htmlFor="AASTD_studentName" className="AASTD_text">Student Name</label>
    //                 <input id="AASTD_studentName" type="text" value={studentName} onChange={(e) => {setStudentName(e.target.value)}}  className="AASTD_box" />
    //                 <label htmlFor="AASTD_studentID" className="AASTD_text">Student ID</label>
    //                 <input id="AASTD_studentID" type="text" className="AASTD_box" value={studentid} onChange={(e) => {setStudentId(e.target.value)}}/>
    //                 <label htmlFor="AASTD_studentPassword" className="AASTD_text" value={password} onChange={(e) => {setPassword(e.target.value)}}>Password</label>
    //                 <input id="AASTD_studentPassword" type="password" className="AASTD_box" />
    //                 <label htmlFor="AASTD_studentConfirmPassword" className="AASTD_text">Confirm Password</label>
    //                 <input id="AASTD_studentConfirmPassword" type="password" value={confirmpassword} onChange={(e) => {setConfirmPassword(e.target.value)}} className="AASTD_box" />
    //                 <button id="AASTD_submit" onClick={handleSubmit}>Add</button>
    //             </form>
    //         </section>
}

export default CreateStudent