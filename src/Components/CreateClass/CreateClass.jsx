import axios from "axios";
import { useState } from "react"

function CreateClass() {

    const [name, setName] = useState("");
    const [courseCode , setCourseCode] = useState("");
    const [section , setSection] = useState("")


    function handleSubmit(e) {
        e.preventDefault();
        const response = axios.post("" , {
            name,
            courseCode,
            section
        })

        if(response.status == 200) {
            console.log("Success" )
        } else {
            console.log("fuck")
        }

    }


    return (
        <form action="#">
            <input type="text" name="name" id="name" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Enter the name of the course"/>
            <input type="text" name="course_code" id="course_code" value={courseCode} onChange={(e) => {setCourseCode(e.target.value)}} placeholder="Enter the code course"></input>
            <input type="text" name="section" value={section} id="section" onChange={(e) => {setSection(e.target.value)}} placeholder="enter the section"></input>
            <button type="submit" onClick={handleSubmit}>create Class</button>
        </form>
    )
}

export default CreateClass