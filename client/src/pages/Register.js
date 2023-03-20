import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const navigate=useNavigate()
    const [inputs,setInputs]=useState({
        name:'',
        email:'',
        password:''
    })

    const handleChanage=(e)=>{
        setInputs(prevState=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const {data}=await axios.post('/api/v1/user/register',{username:inputs.name,
            email:inputs.email,password:inputs.password
            })
            
            if(data.success){
                alert('User Register successfully')
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <Box maxWidth={450} height={450} display='flex' flexDirection={'column'} alignItems='center' justifyContent={'center'} margin={'auto'} marginTop={10}  boxShadow='0px 0px 5px 2px #ccc ' borderRadius={1}  >
            <Typography variant='h4' padding={3} textAlign='center'>Register</Typography>
            <TextField  value={inputs.name} onChange={handleChanage} sx={{width:'350px'}} placeholder='Name' name='name' margin='normal' type={'text'} required />
            <TextField  value={inputs.email} onChange={handleChanage} sx={{width:'350px'}} placeholder='Email' name='email' margin='normal' type={'email'} required />
            <TextField  value={inputs.password} onChange={handleChanage} sx={{width:'350px'}} placeholder='Password' name='password' margin='normal' type={'password'} required />
           <Box display={'flex'} marginTop={2}>
                <Button type='submit' variant='contained' color='primary' sx={{borderRadius:2, margin:1}}>Submit</Button>
                <Button  type='submit' color='primary' onClick={()=>navigate('/login')} sx={{borderRadius:1,margin:1,fontSize:14,marginRight:2}}>Already registerd ? Login</Button>
           </Box>
        </Box> 
    </form>
    </>
  )
}

export default Register