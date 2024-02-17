import axios from "axios";
import { useState } from "react"
import './createclass.css'

function CreateClass() {

    const [className, setClassName] = useState("");
    const [classCode, setClassCode] = useState("");

    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await axios.post("https://collegeattendance-production.up.railway.app/api/class", {
            className,
            classCode,
        }, {
            headers: myHeaders
        })
        console.log(response)

    }


    return (
        // <form method="POST">
        //     <input type="text" name="className" id="name" value={className} onChange={(e) => {setClassName(e.target.value)}} placeholder="Enter the name of the course"/>
        //     <input type="text" name="classCode" id="course_code" value={classCode} onChange={(e) => {setClassCode(e.target.value)}} placeholder="Enter the code course"></input>
        //     {/* <input type="text" name="section" value={section} id="section" onChange={(e) => {setSection(e.target.value)}} placeholder="enter the section"></input> */}
        //     <button type="submit" onClick={handleSubmit}>create Class</button>
        // </form>


        //     <section class="AASUB_mainPage">
        //     <h1 class="AASUB_title">Add a Subject</h1>
        //     <form class="AASUB_addSubject">
        //         <label for = "subjectCode" class="AASUB_text">Subject Code</label>
        //         <input id="AASUB_subjectCode" value={className} onChange={(e) => {setClassName(e.target.value)}} type = "text" class="AASUB_box">
        //         <label for = "subjectName" class="AASUB_text">Subject Name</label>
        //         <input id="AASUB_subjectName" value={classCode} onChange={(e) => {setClassCode(e.target.value)} type = "text" class="AASUB_box">
        //         <button id="AASUB_submit" onClick={handleSubmit}>Add</button>
        //     </form>
        // </section>

        <div className="CREATECLS_WRAPPER">
            <section className="AASUB_mainPage">
                <h1 className="AASUB_title">Add a Subject</h1>
                <form className="AASUB_addSubject">
                    <label htmlFor="AASUB_subjectCode" className="AASUB_text">Subject Code</label>
                    <input id="AASUB_subjectCode" value={classCode} onChange={(e) => setClassCode(e.target.value)} type="text" className="AASUB_box" />
                    <label htmlFor="AASUB_subjectName" className="AASUB_text">Subject Name</label>
                    <input id="AASUB_subjectName" value={className} onChange={(e) => setClassName(e.target.value)} type="text" className="AASUB_box" />
                    <button id="AASUB_submit" type="submit" onClick={handleSubmit}>Add</button>
                </form>
            </section>
        </div>
    )

}

export default CreateClass