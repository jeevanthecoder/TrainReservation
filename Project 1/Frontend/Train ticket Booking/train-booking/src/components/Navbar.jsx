import React, { useEffect, useState } from 'react';
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [adminToken] = useState(localStorage.getItem('authToken') || null);
    const [userToken] = useState(localStorage.getItem('authUserToken') || null);
    const [adminname] = useState(localStorage.getItem('currentUser')||null)
    const [username] = useState(localStorage.getItem('currentUserName')||null)
    const [user] = useState(localStorage.getItem('user')||null)



    const navigate = useNavigate()

    const handleLogout = ()=>{
        localStorage.removeItem("authToken")
        localStorage.removeItem("currentUser")
        navigate('/')
        window.location.reload()
    }


    const handleUserLogout = ()=>{
      localStorage.removeItem("authUserToken")
      localStorage.removeItem("currentUserName")
      navigate('/')
      window.location.reload()
  }

  return (
    <nav className="navbar">
    {user === 'admin'?
    <ul className="nav-list">
        <li className="nav-item"><Link className='nav' to={'/admin'}>Home</Link></li>
        <li className="nav-item"><Link className='nav' to={'/admin/trainform'}>Add Train</Link></li>
        <li className="nav-item"><Link className='nav' to={'/admin/search'}>Search</Link></li>
      {!adminToken?<li className="nav-item"><Link className='nav' to={'/admin/login'}>Login</Link></li>:null} 
      {!adminToken?<li className="nav-item"><Link className='nav' to={'/admin/register'}>Register</Link></li>:null} 
        {adminToken&&<li className="nav-item" onClick={handleLogout}>Logout</li>}
        <p className='username'>{adminname}</p>
      </ul>:
      <ul className="nav-list">
        <li className="nav-item"><Link className='nav' to={'/user'}>Home</Link></li>
        <li className="nav-item"><Link className='nav' to={'/user/reserve'}>Reservation</Link></li>
        <li className="nav-item"><Link className='nav' to={'/user/mytrains'}>My trains</Link></li>
      {!userToken?<li className="nav-item"><Link className='nav' to={'/user/login'}>Login</Link></li>:null} 
      {!userToken?<li className="nav-item"><Link className='nav' to={'/user/register'}>Register</Link></li>:null} 
        {userToken&&<li className="nav-item" onClick={handleUserLogout}>Logout</li>}
        <p className='username'>{username}</p>
      </ul>
    }
    </nav>
  );
};

export default Navbar;
