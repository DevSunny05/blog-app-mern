import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'

const BlockDetails = () => {
    
    const [blog,setBlog]=useState({})
    const [inputs,setInputs]=useState({})

    const id=useParams().id
    const navigate=useNavigate()

    const getBlogDetails=async()=>{
        try {
            const {data}=await axios.get(`/api/v1/blog/get-blog/${id}`)
            if(data?.success){
                setBlog(data?.blog)
                setInputs({
                    title:data?.blog.title,
                    description:data?.blog.description,
                    image:data?.blog.image
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getBlogDetails()
    },[id])
    
    


    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const {data}=await axios.put(`/api/v1/blog/update-blog/${id}`,{
                title:inputs.title,
                description:inputs.description,
                image:inputs.image,
                user:id
            })

            if(data?.success){
                navigate('/my-blogs')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange=(e)=>{
        setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value}))
    }
  return (
    <>
         <form onSubmit={handleSubmit}>
        <Box width={'50%'}  borderRadius={2} padding={5} margin={'auto'} boxShadow={'0px 0px 10px 2px #ccc'} marginTop={'30px'} display={'flex'} flexDirection={'column'} >
            <Typography variant='h4' sx={{textAlign:'center',fontWeight:'bold',padding:'10px',color:'gray'}}>Update Post</Typography>
            <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>Title</InputLabel>
            <TextField name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' required/>

            <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>Description</InputLabel>
            <TextField name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' required/>

            <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>Image</InputLabel>
            <TextField name='image' value={inputs.image} onChange={handleChange} margin='normal' variant='outlined' required/>

            <Button sx={{marginTop:'20px'}} type='submit' color='warning' variant='contained'>Update</Button>
        </Box>
    </form>
    
    </>
  )
}

export default BlockDetails