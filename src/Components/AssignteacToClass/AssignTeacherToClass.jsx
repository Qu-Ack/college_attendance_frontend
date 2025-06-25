import { useState, useEffect } from "react";
import axios from "axios";
import "./assignteachertoclass.css";

function AssignTeacherToClass() {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  const myHeaders = {
    "Content-Type": "application/json", // Adjust the content type based on your API requirements
    Authorization: `Bearer ${localStorage.token || ""}`, // Add any other headers as needed
  };

  useEffect(() => {
    // Fetch teachers and classes from backend API
    const fetchTeachersAndClasses = async () => {
      try {
        const teachersResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/get_teachers`,
          {
            headers: myHeaders,
          },
        );
        const classesResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/get_classes`,
          {
            headers: myHeaders,
          },
        );
        setTeachers(teachersResponse.data.teachers);
        setClasses(classesResponse.data.classes);
        console.log(teachersResponse.data);
        console.log(classesResponse.data);
      } catch (error) {
        console.error("Error fetching teachers and classes:", error);
      }
    };

    fetchTeachersAndClasses();
  }, []);

  const handleAssignClassToTeacher = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setData("");
      setError("");
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/teachertoclass`,
        {
          teacherID: selectedTeacher,
          classID: selectedClass,
        },
      );
      setLoading(false);
      if (typeof response.data.error != "undefined") {
        setError(response.data.error);
      } else if (typeof response.data.error == "undefined") {
        setData("Teacher Assigned to Subject Successfully");
      }
    } catch (error) {
      setError(error);
      // alert('Error assigning teacher to the class. Please try again.');
    }
  };

  return (
    // <div>
    //     <h2>Assign Class to Teacher</h2>
    //     <div>
    //         <label>Select Teacher: </label>
    //         <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
    //             <option value="">Select a Teacher</option>
    //             {teachers && teachers.map((teacher) => (
    //                 <option key={teacher._id} value={teacher._id}>{teacher.teacherName}</option>
    //             ))}
    //         </select>
    //     </div>
    //     <div>
    //         <label>Select Class: </label>
    //         <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
    //             <option value="">Select a Class</option>
    //             {classes.map((cls) => (
    //                 <option key={cls._id} value={cls._id}>{cls.classCode}</option>
    //             ))}
    //         </select>
    //     </div>
    //     <button onClick={handleAssignClassToTeacher}>Assign</button>
    // </div>
    <div className="ASTT_WRAPPER">
      <section className="ASTT_mainPage">
        <h1 className="ASTT_title">Assign Subject to Teacher</h1>
        <form className="ASTT_assignTeacher">
          <label htmlFor="teacherName" className="ASTT_text">
            Select Teacher
          </label>
          <select
            className="ASTT_selectList"
            id="teacherName"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="">Select a Teacher</option>
            {teachers &&
              teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.teacherName}
                </option>
              ))}
          </select>
          <label htmlFor="subjectName" className="ASTT_text">
            Select Subject to Assign
          </label>
          <select
            className="ASTT_selectList"
            id="subjectName"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select a Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.classCode}
              </option>
            ))}
          </select>
          <button id="ASTT_submit" onClick={handleAssignClassToTeacher}>
            Assign
          </button>
        </form>
        <div>
          {/* <p className="login-text">or go to <Link to="/signup" className="login-link">Sign Up</Link></p> */}
          <div className="admin_loading">{loading && <h1>Loading ..</h1>}</div>
          <div className="admin_data">{data}</div>
          <div className="admin_error">{error}</div>
        </div>
      </section>
    </div>
  );
}

export default AssignTeacherToClass;

