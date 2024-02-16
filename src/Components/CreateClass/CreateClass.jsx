import axios from "axios";
import { useState } from "react"

function CreateClass() {

    const [className, setClassName] = useState("");
    const [classCode , setClassCode] = useState("");

    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await axios.post("https://collegeattendance-production.up.railway.app/api/class" , {
            className,
            classCode,
        }, {
            headers:myHeaders
        })
        console.log(response)

    }


    return (
        <form method="POST">
            <input type="text" name="className" id="name" value={className} onChange={(e) => {setClassName(e.target.value)}} placeholder="Enter the name of the course"/>
            <input type="text" name="classCode" id="course_code" value={classCode} onChange={(e) => {setClassCode(e.target.value)}} placeholder="Enter the code course"></input>
            {/* <input type="text" name="section" value={section} id="section" onChange={(e) => {setSection(e.target.value)}} placeholder="enter the section"></input> */}
            <button type="submit" onClick={handleSubmit}>create Class</button>
        </form>
    )
}

export default CreateClass