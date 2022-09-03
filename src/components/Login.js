import React,{useState, useEffect} from 'react'
import './login.css'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase'
import {Link, useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(()=>{
    auth.onAuthStateChanged((loggedIn)=>{
      if(loggedIn){
        navigate('/')
      }
    })
  })

    const handleSubmit = (e)=>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then(()=>navigate('/'))
        .catch(err=>alert(err.message))
    }

  return (
    <div className='loginPage'>
      <form onSubmit={handleSubmit} className="login_card">
        <span className='login_head'>Log In</span>
        <label htmlFor="email">Email</label>

        <input className='login_input' type="text" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' />   

        <label htmlFor="password">Password</label>
        
        <input className='login_input' type="password" value={password} required onChange={(e)=>setPassword(e.target.value)}placeholder='Password' />
        <button className='login_btn'>Log In</button>
      </form>
      <span>Don't have an account ? <Link to={'/signup'}> SIgn Up</Link></span>
    </div>
  )
}

export default Login
