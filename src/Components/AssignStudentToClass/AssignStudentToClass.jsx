import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assignstudenttoclass.css'

function AddStudentToClass() {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [data, setData] = useState("")

    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };


    useEffect(() => {
        // Fetch students and classes from backend API
        const fetchStudentsAndClasses = async () => {
            try {
                const studentsResponse = await axios.get('https://collegeattendance-production.up.railway.app/api/get_students', { headers: myHeaders });
                const classesResponse = await axios.get('https://collegeattendance-production.up.railway.app/api/get_classes', { headers: myHeaders });
                setStudents(studentsResponse.data.students);
                console.log(studentsResponse.data)
                console.log(classesResponse.data)
                setClasses(classesResponse.data.classes);
            } catch (error) {
                console.error('Error fetching students and classes:', error);
            }
        };

        fetchStudentsAndClasses();
    }, []);

    const handleAddStudentToClass = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            setError("")
            // setData("")
            const response = await axios.post('https://collegeattendance-production.up.railway.app/api/addstudtoclass', {
                studentID: selectedStudent,
                classID: selectedClass
            });
            console.log(response.data)
            setData('Subject Assigned Successfully!!')
            setLoading(false)
            if (response.data.error != 'undefined') {
                setError(response.data.error)
            } else if (response.data.error == 'undefined') {
               
            }
        } catch (error) {
            setError(error)
        }
    };

    return (
        // <div>
        //     <h2>Add Student to Class</h2>
        //     <div>
        //         <label>Select Student: </label>
        //         <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
        //             <option value="">Select a Student</option>
        //             {students && students.map((student) => (
        //                 <option key={student._id} value={student._id}>{student.name}</option>
        //             ))}
        //         </select>
        //     </div>
        //     <div>
        //         <label>Select Class: </label>
        //         <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
        //             <option value="">Select a Class</option>
        //             {classes && classes.map((cls) => (
        //                 <option key={cls._id} value={cls._id}>{cls.classCode}</option>
        //             ))}
        //         </select>
        //     </div>
        //     <button onClick={handleAddStudentToClass}>Add</button>
        // </div>
        <div className="AASS_WRAPPER">
            <section className="AASS_mainPage">
                <h1 className="AASS_title">Assign Subject to Student</h1>
                <form className="AASS_assignStudent">
                    <label htmlFor="studentID" className="AASS_text">Select Student</label>
                    <select className="AASS_selectList" id="studentID" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                        <option value="">Select a Student</option>
                        {students && students.map((student) => (
                            <option key={student._id} value={student._id}>{student.name}</option>
                        ))}
                    </select>
                    <label htmlFor="subjectName" className="AASS_text">Select Subject to Assign</label>
                    <select className="AASS_selectList" id="subjectName" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                        <option value="">Select a Class</option>
                        {classes && classes.map((cls) => (
                            <option key={cls._id} value={cls._id}>{cls.classCode}</option>
                        ))}
                    </select>
                    <button id="AASS_submit" onClick={handleAddStudentToClass}>Assign</button>
                </form>
                <div >
                    {/* <p className="login-text">or go to <Link to="/signup" className="login-link">Sign Up</Link></p> */}
                    <div className="admin_loading">{loading && <h1>Loading ..</h1>}</div>
                    <div className="admin_data">{data}</div>
                    <div className="admin_error">{error}</div>
                </div>
            </section>
        </div>
    );


}

export default AddStudentToClass;
