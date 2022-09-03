import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword,} from 'firebase/auth'
import { auth } from '../firebase'


function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

const handleSubmit = (e)=>{
  e.preventDefault();
  if(password === confirmPassword){
    return createUserWithEmailAndPassword(auth, email, password)
    .then(()=>navigate('/'))
    .catch(err=>alert(err.message))
  }
  else{
    alert('Passwords do not match')
  }
}

  return (
      <div className='loginPage'>
      <form onSubmit={handleSubmit} className="login_card">
        <span className='login_head'>Sign Up</span>

        <label htmlFor="email">Enter your Email</label>

        <input id='email' className='login_input' type="text" required value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' />        

        <label htmlFor="password"> Enter Your Password</label>

        <input id='password' className='login_input' required value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder='Password' />

        <label htmlFor="confirmPass"> Re-Enter Your Password</label>

        <input id='confirmPass' className='login_input' required value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password' />

        <button className='login_btn'>Sign Up</button>
      </form>
      <span>Already have an account ? <Link to={'/login'}>Log In</Link> </span>
    </div>
  )
}

export default SignUp
