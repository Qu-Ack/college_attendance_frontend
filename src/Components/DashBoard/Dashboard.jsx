import { Outlet, useParams } from "react-router"
import Nav from "../Nav/Nav"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import './teacher_dashboard.css'
import '../tables.css'
import profilePic from './images/temp.png'





function DashBoard() {
    const [myclasses, setMyClasses] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const baseurl = `https://collegeattendance-production.up.railway.app/api/class/${id}`


    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };
    useEffect(() => {
        async function request() {
            try {
                setLoading(true)
                const response = await axios.get(baseurl, {
                    headers: myHeaders
                });
                setLoading(false)
                console.log(response.data);
                setMyClasses(response.data.classes);
                setTeacher(response.data.teacher)
            } catch (error) {
                console.error("An error occurred:", error);
                // Handle the error here, such as setting an error state
            }
        }
        request();
    }, []);

    if (loading) {
        return(
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            {/* <h1>My Classes</h1>
            <ul>{
                myclasses.map(myclass => <li key={myclass._id}><Link to={`/myclasses/${myclass._id}`}>{myclass.className}</Link></li>)
            }
            </ul> */}


            <section className="teacher_mainPage">
                <section className="teacher_profile teacher_panel">
                    <img className="teacher_profilePic" src={profilePic} alt="Your Profile Pic" />
                    <div className="teacher_profileText">
                        {console.log(teacher[0])}
                        <div className="teacher_name">{teacher[0] && teacher[0].teacherName}</div>
                        <div className="teacher_designation">Assistant Professor</div>
                        <div className="teacher_department">Department of CSE</div>
                    </div>
                </section>

                <section className="teacher_table panel">
                    <div className="teacher_heading">
                        <span className="teacher_code">Code</span>
                        <span className="teacher_subject">Subject Name</span>
                        <span className="teacher_semester">Sem</span>
                    </div>

                    {
                        myclasses.map(myclass => {
                            return (
                                <Link className="entry" to={`/myclasses/${myclass._id}`}>c
                                    <span className="code">{myclass.classCode}</span>
                                    <span className="subject">{myclass.className}</span>
                                    <span className="semester">1</span>
                                </Link>
                            )
                        })
                    }

                    {/* <a className="teacher_entry" href="../lecture_list/lecture_list.html">
                        <span className="teacher_code">CST102</span>
                        <span className="teacher_subject">Data Structure and Algorithms</span>
                        <span className="teacher_semester">2</span>
                    </a>
                    <a className="teacher_entry" href="../lecture_list/lecture_list.html">
                        <span className="teacher_code">ECT103</span>
                        <span className="teacher_subject">Circuit Theory</span>
                        <span className="teacher_semester">1</span>
                    </a>
                    <a className="teacher_entry" href="../lecture_list/lecture_list.html">
                        <span className="teacher_code">ECT101</span>
                        <span className="teacher_subject">Digital Design</span>
                        <span className="teacher_semester">1</span>
                    </a> */}
                </section>
            </section>
        </>
    )
}


export default DashBoard