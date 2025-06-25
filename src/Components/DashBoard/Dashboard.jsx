import { Outlet, useParams } from "react-router";
import Nav from "../Nav/Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./teacher_dashboard.css";
import profilePic from "./images/temp.png";

function DashBoard() {
  const [myclasses, setMyClasses] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const baseurl = `${import.meta.env.VITE_API_URL}/api/class/${id}`;

  const myHeaders = {
    "Content-Type": "application/json", // Adjust the content type based on your API requirements
    Authorization: `Bearer ${localStorage.token || ""}`, // Add any other headers as needed
  };
  useEffect(() => {
    async function request() {
      try {
        setLoading(true);
        const response = await axios.get(baseurl, {
          headers: myHeaders,
        });
        setLoading(false);
        console.log(response.data);
        setMyClasses(response.data.classes);
        setTeacher(response.data.teacher);
      } catch (error) {
        console.error("An error occurred:", error);
        // Handle the error here, such as setting an error state
      }
    }
    request();
  }, []);

  if (loading) {
    return (
      <div className="TD_WRAPPER">
        <h1 className="loading_screen">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      {/* <h1>My Classes</h1>
            <ul>{
                myclasses.map(myclass => <li key={myclass._id}><Link to={`/myclasses/${myclass._id}`}>{myclass.className}</Link></li>)
            }
            </ul> */}
      <div className="TD_WRAPPER">
        <section className="TD_mainPage">
          <section className="TD_profile">
            <img
              className="TD_profilePic"
              src={profilePic}
              alt="Your Profile Pic"
            />
            <div className="TD_profileText">
              <div className="TD_name">
                {teacher[0] && teacher[0].teacherName}
              </div>
              <div className="TD_designation">Assistant Professor</div>
              {/* <div className="TD_department">Department of CSE</div> */}
            </div>
          </section>

          <section className="TD_table">
            <div className="TD_heading">
              <span className="TD_code">Code</span>
              <span className="TD_subject">Subject Name</span>
              {/* <span className="TD_semester">Sem</span> */}
            </div>
            {myclasses.map((myclass) => {
              return (
                <Link className="TD_entry" to={`/myclasses/${myclass._id}`}>
                  <span className="TD_code">{myclass.classCode}</span>
                  <span className="TD_subject">{myclass.className}</span>
                  {/* <span className="TD_semester">1</span> */}
                </Link>
              );
            })}
          </section>
        </section>
      </div>
      {/* <section className="teacher_mainPage">
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
                    } */}

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
      {/* </section>
        </section > */}
    </>
  );
}

{
  /* <section className="TD_mainPage">
            <section className="TD_profile">
                <img className="TD_profilePic" src={profilePic} alt="Your Profile Pic" />
                <div className="TD_profileText">
                    <div className="TD_name">{teacher[0] && teacher[0].teacherName}</div>
                    <div className="TD_designation">Assistant Professor</div>
                    <div className="TD_department">Department of CSE</div>
                </div>
            </section>

            <section className="TD_table">
                <div className="TD_heading">
                    <span className="TD_code">Code</span>
                    <span className="TD_subject">Subject Name</span>
                    <span className="TD_semester">Sem</span>
                </div>
                {
                        myclasses.map(myclass => {
                            return (
                               <Link className="TD_entry" to={`/myclasses/${myclass._id}`}>
                    <span className="TD_code">{myclass.classCode}</span>
                    <span className="TD_subject">{myclass.className}</span>
                    <span className="TD_semester">1</span>
                </Link>
                            )
                        })
                    }
               
                <a className="TD_entry" href="../lecture_list/lecture_list.html">
                    <span className="TD_code">CST102</span>
                    <span className="TD_subject">Data Structure and Algorithms</span>
                    <span className="TD_semester">2</span>
                </a>
                <a className="TD_entry" href="../lecture_list/lecture_list.html">
                    <span className="TD_code">ECT103</span>
                    <span className="TD_subject">Circuit Theory</span>
                    <span className="TD_semester">1</span>
                </a>
                <a className="TD_entry" href="../lecture_list/lecture_list.html">
                    <span className="TD_code">ECT101</span>
                    <span className="TD_subject">Digital Design</span>
                    <span className="TD_semester">1</span>
                </a>
                </section>
                <Link className="entry" to={`/myclasses/${myclass._id}`}>c
                <span className="code">{myclass.classCode}</span>
                <span className="subject">{myclass.className}</span>
                <span className="semester">1</span>
                </Link>
            </section> */
}

export default DashBoard;

