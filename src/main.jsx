import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashBoard from './Components/DashBoard/Dashboard.jsx'
import Create from './Components/Create/Create.jsx'
import CreateClass from './Components/CreateClass/CreateClass.jsx'
import Login from './Components/Login/StudentLogin.jsx'
import TeacherLogin from './Components/Login/TeacherLogin.jsx'
import Class from './Components/Class/Class.jsx'
import Lecture from './Components/Lecture/Lecture.jsx'
import QRCodeReader from './Components/QRCodeReader/QRCodeReader.jsx'
import LandingPage from './Components/LandingPage/LandingPage.jsx'
import StudentLogin from './Components/Login/StudentLogin.jsx'
import StudentDashboard from './Components/DashBoard/StudentDashboard.jsx'
import Nav from './Components/Nav/Nav.jsx'
import AdminLogin from './Components/Login/AdminLogin.jsx'
import AdminDashBoard from './Components/DashBoard/AdminDashboard.jsx'
import CreateTeacher from './Components/CreateTeacher/CreateTeacher.jsx'
import AddStudentToClass from './Components/AssignStudentToClass/AssignStudentToClass.jsx'
import AssignTeacherToClass from './Components/AssignteacToClass/AssignTeacherToClass.jsx'
import CreateStudent from './Components/CreateStudent/CreateStudent.jsx'
import AboutUs from './Components/AboutUs/AboutUs.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav/>,
    children:[
      {
        path:'/myclasses/:classid',
        element:<Class/>,
    
      }
      , 
      {
        path: '/myclasses/:classid/lectures/:lectureid',
        element:<Lecture/>
      },
      {
        path:'/reader',
        element:<QRCodeReader/>
      }
      ,{
        index:true,
        element: <StudentLogin/>
      },
      {
        path:'/teacherlogin',
        element:<TeacherLogin/>
      },
      {
        path:'/studdashboard/:studid',
        element:<StudentDashboard/>
      },
      {
        path:'/adminlogin',
        element:<AdminLogin/>
      }, {
        path:'/admindashboard',
        element:<AdminDashBoard/>
      }

      ,{
        path:'/admin/createclass',
        element:<CreateClass/>
      },
      {
        path:'/admin/createteacher',
        element:<CreateTeacher/>
      },
      {
        path:'/admin/assignstudenttoclass',
        element:<AddStudentToClass/>
      },
      {
        path:'/admin/assignteachertoclass',
        element:<AssignTeacherToClass/>
      },
      {
        path:'/admin/createstudent',
        element:<CreateStudent/>
      },
      {
        path:'/aboutus',
        element:<AboutUs/>
      }
    ]
  },

  // {
  //   path:'/dashboard/:id',
  //   element:<DashBoard/>
  // },

  // {
  //   path:'/myclasses/:classid',
  //   element:<Class/>,

  // }
  // , 
  // {
  //   path: '/myclasses/:classid/lectures/:lectureid',
  //   element:<Lecture/>
  // },
  // {
  //   path:'/reader',
  //   element:<QRCodeReader/>
  // }
  // ,{
  //   path:'/studentlogin',
  //   element: <StudentLogin/>
  // },
  // {
  //   path:'/teacherlogin',
  //   element:<TeacherLogin/>
  // },
  // {
  //   path:'/studdashboard/:studid',
  //   element:<StudentDashboard/>
  // }
  
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
