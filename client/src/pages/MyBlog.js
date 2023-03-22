import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'

const MyBlog = () => {
    const [blogs,setBlogs]=useState([])

    const getUserBlog=async()=>{
        try {
            const id=localStorage.getItem('userId')
            const {data}=await axios.get(`/api/v1/blog/user-blog/${id}`)

            if(data?.success){
                setBlogs(data?.userBlog.blogs)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUserBlog()
        
    },[])
    console.log(blogs)
  return (
    <>
         {
      blogs && blogs.length>0 ?(blogs.map((blog)=>(
        <BlogCard 
        id={blog._id}
        isUser={true}
        title={blog.title}
         description={blog.description}
          image={blog.image}
          username={blog.user.username}
          time={blog.createdAt}
          />
      ))):(<h1 style={{margin:'auto',textAlign:'center',marginTop:'200px'}}>Youe Havent Created Blogs</h1>)
       
    }
    </>
  )
}

export default MyBlog