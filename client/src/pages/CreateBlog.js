
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateBlog = () => {
    const navigate=useNavigate()
    const id =localStorage.getItem('userId')
    const [inputs,setInputs]=useState({title:'',description:'',image:''})


    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const {data}=await axios.post('/api/v1/blog/create-blog',{
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
            <Typography variant='h4' sx={{textAlign:'center',fontWeight:'bold',padding:'10px',color:'gray'}}>Create a New Post</Typography>
            <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>Title</InputLabel>
            <TextField name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' required/>

            <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>Description</InputLabel>
            <TextField name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' required/>

            <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>Image</InputLabel>
            <TextField name='image' value={inputs.image} onChange={handleChange} margin='normal' variant='outlined' required/>

            <Button sx={{marginTop:'20px'}} type='submit' color='primary' variant='contained'>Submit</Button>
        </Box>
    </form>
    
    </>
  )
}

export default CreateBlog