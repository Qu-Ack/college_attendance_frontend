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

    const { id } = useParams();
    const baseurl = `https://collegeattendance-production.up.railway.app/api/class/${id}`


    const myHeaders = {
        'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        'Authorization': `Bearer ${localStorage.token || ''}`, // Add any other headers as needed
    };
    useEffect(() => {
        async function request() {
            try {
                const response = await axios.get(baseurl, {
                    headers: myHeaders
                });
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

    return (
        <>
            {/* <h1>My Classes</h1>
            <ul>{
                myclasses.map(myclass => <li key={myclass._id}><Link to={`/myclasses/${myclass._id}`}>{myclass.className}</Link></li>)
            }
            </ul> */}


            <section className="mainPage">
                <section className="profile panel">
                    <img className="profilePic" src={profilePic} alt="Your Profile Pic" />
                    <div className="profileText">
                        {console.log(teacher[0])}
                        <div className="name">{teacher[0] && teacher[0].teacherName}</div>
                        <div className="designation">Assistant Professor</div>
                        <div className="department">Department of CSE</div>
                    </div>
                </section>

                <section className="table panel">
                    <div className="heading">
                        <span className="code">Code</span>
                        <span className="subject">Subject Name</span>
                        <span className="semester">Sem</span>
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

                    {/* <a className="entry" href="../lecture_list/lecture_list.html">
                        <span className="code">CST102</span>
                        <span className="subject">Data Structure and Algorithms</span>
                        <span className="semester">2</span>
                    </a>
                    <a className="entry" href="../lecture_list/lecture_list.html">
                        <span className="code">ECT103</span>
                        <span className="subject">Circuit Theory</span>
                        <span className="semester">1</span>
                    </a>
                    <a className="entry" href="../lecture_list/lecture_list.html">
                        <span className="code">ECT101</span>
                        <span className="subject">Digital Design</span>
                        <span className="semester">1</span>
                    </a> */}
                </section>
            </section>
        </>
    )
}


export default DashBoard