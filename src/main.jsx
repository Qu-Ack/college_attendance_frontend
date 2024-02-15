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
const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav/>,
    children:[
      {
        index:true,
        element:<LandingPage/>
      },
      {
        path:'/dashboard/:id',
        element:<DashBoard/>
      },
    
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
        path:'/studentlogin',
        element: <StudentLogin/>
      },
      {
        path:'/teacherlogin',
        element:<TeacherLogin/>
      },
      {
        path:'/studdashboard/:studid',
        element:<StudentDashboard/>
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
