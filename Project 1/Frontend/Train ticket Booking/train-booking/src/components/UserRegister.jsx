import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UserRegister() {

        const navigate = useNavigate()
        const [isLogin, setIsLogin] = useState(true)

        const [userDetails, setUserDetails] = useState({
          userName:"",
          userPassword:"",
          UserId:"",
          email:"",
          age:"",
          firstName:"",
          lastName:"",
          phoneNum:""
        });
     

        const handleChange = (e) => {
          const { name, value } = e.target;
          setUserDetails({
            ...userDetails,
            [name]: value,
          });
        };

      
        const handleRegister = async (e) => {
          e.preventDefault();
          const formatedDetails = {
          userName:userDetails.userName,
          userPassword:userDetails.userPassword,
          UserId:userDetails.UserId,
          email:userDetails.email,
          age:Number(userDetails.age),
          firstName:userDetails.firstName,
          lastName:userDetails.lastName,
          phoneNum:userDetails.phoneNum
          }
          console.log('Admin Details:', formatedDetails);
          axios.post('http://localhost:7001/auth/create-user', formatedDetails, 
          )
            .then(response => {
              // Handle the response
              console.log(response.data);
              navigate('/user/login')
            })
            .catch(error => {
              // Handle errors
              setIsLogin(false)
              console.error('Error:', error);
            });
        };


  return (
    <div className="register-container">
    <h2>Register</h2>
    {!isLogin&&<div className='wrong'>you already have an account</div>}
    <form>
    <label>
        UserId:
        <input
          type="text"
          value={userDetails.UserId}
          name='UserId'
          onChange={handleChange}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={userDetails.userName}
          name='userName'
          onChange={handleChange}
        />
      </label>
       <label>
        First Name:
        <input
          type="text"
          value={userDetails.firstName}
          name='firstName'
          onChange={handleChange}
        />
      </label>
       <label>
        Last Name:
        <input
          type="text"
          value={userDetails.lastName}
          name='lastName'
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={userDetails.email}
          name='email'
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={userDetails.userPassword}
          name='userPassword'
          onChange={handleChange}
        />
      </label>
      <label>
       Age
        <input
          type="number"
          value={userDetails.age}
          name='age'
          onChange={handleChange}
        />
      </label>
       <label>
       Phone Number
        <input
          type="number"
          value={userDetails.phoneNum}
          name='phoneNum'
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </form>
  </div>
  )
}

export default UserRegister