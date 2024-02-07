import React, { useEffect, useState } from 'react'
import "../style.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {

    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [isLogin, setIsLogin] = useState(true)
    const navigate = useNavigate()

    const [loginDetails, setLoginDetails] = useState({
      adminEmail:"",
      adminPassword:""
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setLoginDetails({
        ...loginDetails,
        [name]: value,
      });
    };
  
    const handleLogin = async (e) => {
     
      console.log('Login Details', loginDetails);
     
      axios.post('http://localhost:7002/auth/login-admin', loginDetails, 
     
      )
        .then(response => {
          // Handle the response
          console.log(JSON.stringify(response.data));
          const stringData = JSON.stringify(response.data)
          const data = JSON.parse(stringData)
          if (data !== "Credentials Invalid !!") {
            console.log(data)
            localStorage.setItem('authToken', data.jwtToken);
            setToken(localStorage.getItem('authToken'))
            localStorage.setItem('currentUser', data.admin_Email);
            navigate('/admin')
            window.location.reload()
          }
          else{
            setIsLogin(false)
          }
           
        })
        .catch(error => {
        
          setIsLogin(false)
          console.error('Error:', error);
        });
        
       
    };


    

  return (
    <div className="login-container">
    <h2>Login</h2>
    {!isLogin&&<div className='wrong'>incorrect username or password</div>}
    <form>
      <label>
        Username:
        <input
          type="text"
          name="adminEmail"
          value={loginDetails.adminEmail}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={loginDetails.adminpassword}
          name='adminPassword'
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </form>
  </div>
  )
}

export default Login