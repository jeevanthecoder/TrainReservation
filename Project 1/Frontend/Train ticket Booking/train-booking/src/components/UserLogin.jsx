import React, { useEffect, useState } from 'react'
import "../style.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function UserLogin() {

    const [token, setToken] = useState(localStorage.getItem('authUserToken') || null);
    const [isLogin, setIsLogin] = useState(true)
    const navigate = useNavigate()

    const [loginDetails, setLoginDetails] = useState({
      userName:"",
      userPassword:""
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
     
      axios.post('http://localhost:7001/auth/login', loginDetails, 
     
      )
        .then(response => {
          // Handle the response
          console.log(JSON.stringify(response.data));
          const stringData = JSON.stringify(response.data)
          const data = JSON.parse(stringData)
          if (data !== "Credentials Invalid !!") {
            localStorage.setItem('authUserToken', data.jwtToken);
            setToken(localStorage.getItem('authUserToken'))
            localStorage.setItem('currentUserName', data.userName);
            navigate('/user')
            window.location.reload()
          }
          else{
            setIsLogin(false)
          }
         
        })
        .catch(error => {
          // Handle errors
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
          name="userName"
          value={loginDetails.userName}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={loginDetails.userPassword}
          name='userPassword'
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

export default UserLogin