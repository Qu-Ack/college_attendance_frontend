import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddStudentToClass() {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };


    useEffect(() => {
        // Fetch students and classes from backend API
        const fetchStudentsAndClasses = async () => {
            try {
                const studentsResponse = await axios.get('https://collegeattendance-production.up.railway.app/api/get_students', {headers: myHeaders});
                const classesResponse = await axios.get('https://collegeattendance-production.up.railway.app/api/get_classes', {headers:myHeaders});
                setStudents( studentsResponse.data.students);
                console.log(studentsResponse.data)
                console.log(classesResponse.data)
                setClasses(classesResponse.data.classes);
            } catch (error) {
                console.error('Error fetching students and classes:', error);
            }
        };

        fetchStudentsAndClasses();
    }, []);

    const handleAddStudentToClass = async () => {
        try {
            await axios.post('https://collegeattendance-production.up.railway.app/api/addstudtoclass', {
                studentID: selectedStudent, 
                classID: selectedClass
            });
        } catch (error) {
            console.error('Error adding student to class:', error);
        }
    };

    return (
        <div>
            <h2>Add Student to Class</h2>
            <div>
                <label>Select Student: </label>
                <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                    <option value="">Select a Student</option>
                    {students && students.map((student) => (
                        <option key={student._id} value={student._id}>{student.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Select Class: </label>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                    <option value="">Select a Class</option>
                    {classes && classes.map((cls) => (
                        <option key={cls._id} value={cls._id}>{cls.classCode}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleAddStudentToClass}>Add</button>
        </div>
    );
}

export default AddStudentToClass;
