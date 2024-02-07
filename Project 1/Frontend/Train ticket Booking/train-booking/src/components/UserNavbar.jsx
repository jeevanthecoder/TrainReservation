import React, { useState } from 'react';
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';

const UserNavbar = () => {

    const navigate = useNavigate()
    const [token] = useState(localStorage.getItem('authUserToken') || null);
    const [username] = useState(localStorage.getItem('currentUserName')||null)

    const handleUserLogout = ()=>{
        localStorage.removeItem("authUserToken")
        localStorage.removeItem("currentUserName")
        navigate('/user/login')
        window.location.reload()
    }

    

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link className='nav' to={'/user'}>Home</Link></li>
        <li className="nav-item"><Link className='nav' to={'/user/reserve'}>Reservation</Link></li>
        <li className="nav-item"><Link className='nav' to={'/user/mytrains'}>My trains</Link></li>
      {!token?<li className="nav-item"><Link className='nav' to={'/user/login'}>Login</Link></li>:null} 
      {!token?<li className="nav-item"><Link className='nav' to={'/user/register'}>Register</Link></li>:null} 
        {token&&<li className="nav-item" onClick={handleUserLogout}>Logout</li>}
        <p className='username'>{username}</p>
      </ul>
     
    </nav>
  );
};

export default UserNavbar;
