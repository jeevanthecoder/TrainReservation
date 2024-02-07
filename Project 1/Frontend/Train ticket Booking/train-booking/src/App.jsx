import React, { useState } from 'react'
import Login from './components/Login'
import "./style.css"
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Register from './components/Register'
import Addtrain from './components/Addtrain'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Updatetrain from './components/Updatetrain';
import UserLogin from './components/UserLogin'
import UserRegister from './components/UserRegister'
import UserHome from './components/UserHome';
import UserNavbar from './components/UserNavbar';
import Mytrains from './components/Mytrains';
import UserReservation from './components/UserReservation';
import Land from './components/Land';


function App() {

  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

    const [trainData, setTrainData] = useState('')
    const handleUpdate = (e,data) => {
      // Do something with the id, e.g., navigate to the update page
      setTrainData(data)
      console.log('Update button clicked for train id:', data);
    };
  
  return (
    <Router>
    <Navbar />
      <div className="container">
        <Routes>
        <Route path='/' element={<Land />}></Route>
        <Route path="/admin" element={<Home onUpdate={handleUpdate}/>} />
        <Route path="/admin/trainform" element={<Addtrain />} />
        <Route path="/admin/update" element={<Updatetrain trainData={trainData} />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/search" element={<Search />} />
          <Route path="/user" element={<UserHome/>} />
        <Route path="/user/reserve" element={<UserReservation />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/mytrains" element={<Mytrains />} />
          <Route path="*" element={<Navigate to="/user/login" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App