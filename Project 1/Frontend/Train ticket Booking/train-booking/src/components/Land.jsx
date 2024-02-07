import React from 'react'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'

function Land() {

    const navigate = useNavigate()

    const handleAdmin = ()=>{
        localStorage.setItem('user','admin')
        navigate("/admin")
        window.location.reload()
    }
    const handleUser = ()=>{
        localStorage.setItem('user','user')
        navigate("/user")
        window.location.reload()
    }

  return (
    <div>
      <div className='land-btn' onClick={handleAdmin}>Admin Services</div>
      <div  className='land-btn' onClick={handleUser}>User Services</div>
    </div>
  )
}

export default Land