import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'

const Blog = () => {
  const [blogs,setBlogs]=useState([])

  const getAllBlogs=async()=>{
    try {
      const {data}=await axios.get("/api/v1/blog/all-blogs")
      
  if(data?.success){
    setBlogs(data.blogs)
  }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    // eslint-disable-next-line
    getAllBlogs()
  }, [])
  
  return (
    <>
    {
      blogs && blogs.map((blog)=>(
        <BlogCard 
        title={blog.title}
         description={blog.description}
          image={blog.image}
          username={blog.user.username}
          time={blog.createdAt}
          />
      ))
    }
      
    </>
  )
}

export default Blog