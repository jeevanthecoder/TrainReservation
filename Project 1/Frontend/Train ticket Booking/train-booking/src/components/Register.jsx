import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {

        const navigate = useNavigate()
        const [isLogin, setIsLogin] = useState(true)

        const [adminDetails, setAdminDetails] = useState({
          adminId:'',
          adminName:'',
          adminPassword:'',
          adminEmail:'',
          Organization:''
        });
     

        const handleChange = (e) => {
          const { name, value } = e.target;
          setAdminDetails({
            ...adminDetails,
            [name]: value,
          });
        };

      
        const handleRegister = async (e) => {
          e.preventDefault();
          console.log('Admin Details:', adminDetails);
          axios.post('http://localhost:7002/auth/create-admin', adminDetails, 
          )
            .then(response => {
              // Handle the response
              console.log(response.data);
              navigate('/admin/login')
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
          value={adminDetails.adminId}
          name='adminId'
          onChange={handleChange}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          value={adminDetails.adminName}
          name='adminName'
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={adminDetails.adminEmail}
          name='adminEmail'
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={adminDetails.adminPassword}
          name='adminPassword'
          onChange={handleChange}
        />
      </label>
      <label>
        Organization:
        <input
          type="text"
          value={adminDetails.Organization}
          name='Organization'
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

export default Register