import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './home.css'
import { auth, db} from '../firebase';
import { uid } from 'uid';
import { useNavigate } from 'react-router-dom';
import {onValue, ref, remove,update,  set} from 'firebase/database'

function Home() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [blogs, setBlogs] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [tempId, setTempId] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    onValue(ref(db), snapshot=>{
      const data = snapshot.val()
      if(data !== null){
      setBlogs(Object.values(data))  
      }
    })

    auth.onAuthStateChanged(user=>{
      if(!user){
        navigate('/login')
      }
    })
    // eslint-disable-next-line
  },[])
    
    const createBlog = ()=>{
      const uidd = uid()
        const date = new Date().toLocaleDateString();
      set(ref(db,`/${uidd}`),{
        name, 
        title, 
        description, 
        date,
        uidd
      })

      setName('')
      setDescription('')
      setTitle('')
    }
    
    
    const deleteBlog = id =>{
    remove(ref(db, `/${id}`))
  }

  const handleUpdate = (blog)=>{
    setIsEdit(true);
    setTempId(blog.uidd)
    setDescription(blog.description)
    setName(blog.name)
    setTitle(blog.title)
  }

  const submitChange = ()=>{
    update(ref(db, `/${tempId}`),{
      name,
      title,
      description,
      date:new Date().toLocaleDateString(),
      uidd:tempId
    });
    setDescription('')
    setName('')
    setTitle('')
  }

  return (
    <div className='home'>
      <Navbar />
      <div className="home_head">
        <span>Blog App</span>
      </div>

      <div className="home_card">

        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Blog title' required />

        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name' required />

        <textarea cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Your Blog Description' required></textarea>

       {isEdit ?<button onClick={submitChange}>Update Blog</button> : <button onClick={createBlog}>Add Blog</button>}

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
              <button onClick={()=>{handleUpdate(blog)}}>Update</button>
              <button onClick={()=>deleteBlog(blog.uidd)}>Delete</button>
            </div>
          </div>
        )) : <p>No Blogs Found</p>}
      </div>

    </div>
  )
}

export default Home
