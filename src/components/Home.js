import React, { useEffect, useState } from 'react'
import { set, ref, onValue } from 'firebase/database';
import Navbar from './Navbar'
import './home.css'
import { auth, db } from '../firebase';
import { uid } from 'uid';
import { Navigate, useNavigate } from 'react-router-dom';

function Home() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()
  
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        onValue(ref(db, `/${auth.currentUser.uid}`), snapshot=>{
          setBlogs([]);
          const data = snapshot.val()
          if(data !== null){
            Object.values(data).map(bl=>{
              setBlogs(prev=>[...prev, bl.blogs])
              console.log(bl)
            })
          }
        })
      }else if(!user){
        navigate('/login')
      }
    })
    // setBlogs()
  },[])
  
  const createBlog = () => {
    // e.preventDefault()
    const uidd = uid();
    const date = new Date().toLocaleDateString();

    setBlogs(prev=>[...prev, {name, title, description, date}])

    set(ref(db, `/${auth.currentUser.uid}/${uidd}`),{
      blogs, 
      uid:uidd
    })
  }


  return (
    <div className='home'>
      <Navbar />
      <div className="home_head">
        <span>Blog App</span>
      </div>

      <div className="home_card">

        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name' required />

        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Blog title' required />

        <textarea cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Your Blog Description' required></textarea>

        <button onClick={createBlog}>Add Blog</button>

      </div>

      <h1>Your Blogs</h1>

      <div className="blog_list home_card">
        {blogs.length ? blogs.map((blog, index) => (
          <div key={index} className="blog">
            <h1>{blog.title}</h1>
            <p>By : {blog.name}</p>
            <p>Added On : {blog.date}</p>
            <p>{blog.description}</p>
            <div className="blog_btns">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        )) : <p>No Blogs Found</p>}
      </div>

    </div>
  )
}

export default Home
