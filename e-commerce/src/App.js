import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './components/Admin/admin'
import Admindashboard from './components/Admin/admincomponents/admindashboard'
import Addashboard from './components/Admin/admincomponents/addashboard'
import Adlayouts from './components/Admin/admincomponents/adlayouts'
import Adorders from './components/Admin/admincomponents/adorders'
import Home from './components/Home/home'
import Login from './components/Login/login'
import Signup from './components/Signup/signup'
import Dashboard from './components/Userdash/dashboard'

function App() {
  return (
    
    <div className='base'>
      









      <Routes>
      <Route path ='/' element={<Home/>}/>
      <Route path ='/dashboard' element={<Dashboard/>}/>
      <Route path ='/login2page' element={<Login/>}/>

      <Route path ='/signuppage' element={<Signup/>}/>







      {/* ADMIN ROUTE */}
      <Route path ='/adminlogin' element={<Admin/>}/>
      <Route path ='/admindashboard' element={<Admindashboard/>}/>
      <Route path ='/adlayouts' element={<Adlayouts/>}/>
      <Route path ='/adorders' element={<Adorders/>}/>


      




      </Routes> 
      

    


    </div>
  )
}

export default App
