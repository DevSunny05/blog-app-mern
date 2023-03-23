import React, { useState } from 'react'
import {Box,AppBar,Toolbar,Button, Typography, Tabs, Tab} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import  toast  from 'react-hot-toast'

const Header = () => {
    const [value,setValue]=useState()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    let isLogin=useSelector((state)=>state.auth.isLogin)
    isLogin= isLogin || localStorage.getItem('userId')
    const handleLogout=()=>{
       try {
        dispatch(logout())
        localStorage.clear()
        navigate('/login')
        toast.success('Logout successfully')
        
        
       } catch (error) {
        console.log(error)
       }
    }
  return (
    <>
        <AppBar position='sticky'>
            <Toolbar>
                <Typography variant='h4' flex={1}>
                    Blog App
                </Typography>
               {
                isLogin && 
                (
                     <Box display={'flex'} marginLeft='auto'  >
                        <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
                            <Tab label='Blogs' LinkComponent={Link} to='/blogs'/>
                            <Tab label='My Blogs'  LinkComponent={Link} to='/my-blogs'/>
                            <Tab label='Create'  LinkComponent={Link} to='/create-blog'/>
                        </Tabs>
                    </Box>
                )
               }
                <Box display={'flex'} marginLeft='auto'>
                    {
                        !isLogin && (
                            <>
                                <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to='/login'>Login</Button>
                                <Button sx={{margin:1,color:'white'}} LinkComponent={Link} to='/register'>Register</Button>
                            </>
                        )
                    }
                    
                    {
                        isLogin && (
                            <Button onClick={handleLogout} sx={{margin:1,color:'white'}} >Logout</Button>
                        )
                    }
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Header