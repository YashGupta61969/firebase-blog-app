import React from 'react'
import {signOut} from 'firebase/auth'
import { auth } from '../firebase'
import './navbar.css'
import {useNavigate} from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    const handleLogout=()=>{
        signOut(auth)
        .then(()=>navigate('/login'))
        .catch(err=>alert(err.message))
    }

  return (
    <nav className='navbar'>
        <strong>Todo App</strong>
        <button onClick={handleLogout}>Log Out</button>
    </nav>
  )
}

export default Navbar
