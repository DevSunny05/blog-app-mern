import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { login } from '../redux/authSlice'
import toast from 'react-hot-toast'

const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const [inputs,setInputs]=useState({
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
            const {data}=await axios.post('/api/v1/user/login',{
            email:inputs.email,password:inputs.password
            })
            
            if(data.success){
              localStorage.setItem('userId',data?.user._id)
              dispatch(login())
              toast.success('Login Successfull')
                navigate('/blogs')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={450} height={450} display='flex' flexDirection={'column'} alignItems='center' justifyContent={'center'} margin={'auto'} marginTop={10}  boxShadow='0px 0px 5px 2px #ccc ' borderRadius={1}  >
            <Typography variant='h4' padding={3} textAlign='center'>Login</Typography>
            <TextField  value={inputs.email} onChange={handleChanage} sx={{width:'350px'}} placeholder='Email' name='email' margin='normal' type={'email'} required />
            <TextField  value={inputs.password} onChange={handleChanage} sx={{width:'350px'}} placeholder='Password' name='password' margin='normal' type={'password'} required />
           <Box display={'flex'} marginTop={3}>
                <Button type='submit' variant='contained' color='primary' sx={{borderRadius:2, margin:1}}>Submit</Button>
                <Button  type='submit' color='primary' onClick={()=>navigate('/register')} sx={{borderRadius:1,margin:1,fontSize:14,marginRight:2}}>New User ? Register</Button>
           </Box>
        </Box> 
      </form>
    </>
  )
}

export default Login