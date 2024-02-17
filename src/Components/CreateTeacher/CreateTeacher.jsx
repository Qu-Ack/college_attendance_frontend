import { useState } from "react";
import axios from "axios";
// import { useSearchParams } from "react-router-dom";
import './createteacher.css'

function CreateTeacher() {
    const [teacherName, setTeacherName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")

    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };

    function handleSubmit(e) {
        e.preventDefault();
        const response = axios.post("https://collegeattendance-production.up.railway.app/api/teacher", {
            teacherName,
            username,
            password,
            confirmpassword
        }, {
            headers: myHeaders
        })

        if (response.status == 200) {
            console.log("Success")
        } else {
            console.log(response)
        }

    }


    return (
        // <form method="POST">
        //     <input type="text" name="teacherName" id="name" value={teacherName} onChange={(e) => {setTeacherName(e.target.value)}} placeholder="Enter the name of the Teacher"/>
        //     <input type="text" name="username" id="course_code" value={username} onChange={(e) => {setUserName(e.target.value)}} placeholder="Enter the username"></input>
        //     {/* <input type="text" name="section" value={section} id="section" onChange={(e) => {setSection(e.target.value)}} placeholder="enter the section"></input> */}
        //     <input type="password" name="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter the password" />
        //     <input type="password" name="confirmpassword" id="confirmpassword" value={confirmpassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder="Enter the confirm password" />
        //     <button type="submit" onClick={handleSubmit}>create Teacher</button>
        // </form>

        <div className="CREATETEACH_WRAPPER">
            <section className="AATEA_mainPage">
                <h1 className="AATEA_title">Add a Teacher</h1>
                <form className="AATEA_addTeacher" method="POST">
                    <label htmlFor="AATEA_teacherName" className="AATEA_text">Teacher Name</label>
                    <input id="AATEA_teacherName" type="text" className="AATEA_box" value={teacherName} onChange={(e) => { setTeacherName(e.target.value) }} />
                    <label htmlFor="AATEA_teacherUsername" className="AATEA_text">Username</label>
                    <input id="AATEA_teacherUsername" type="text" className="AATEA_box" value={username} onChange={(e) => { setUserName(e.target.value) }} />
                    <label htmlFor="AATEA_teacherPassword" className="AATEA_text">Password</label>
                    <input id="AATEA_teacherPassword" type="password" className="AATEA_box" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <label htmlFor="AATEA_teacherConfirmPassword" className="AATEA_text" >Confirm Password</label>
                    <input id="AATEA_teacherConfirmPassword" type="password" className="AATEA_box" value={confirmpassword} onChange={(e) => { setConfirmPassword(e.target.value) }}/>
                    <button id="AATEA_submit" onClick={handleSubmit} type="submit">Add</button>
                </form>
            </section>
        </div>
    )


}

export default CreateTeacher