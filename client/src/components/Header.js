import React, { useState } from 'react'
import {Box,AppBar,Toolbar,Button, Typography, Tabs, Tab} from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const [value,setValue]=useState()
    const isLogin=useSelector((state)=>state.auth.isLogin)
    
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
                            <Button sx={{margin:1,color:'white'}} >Logout</Button>
                        )
                    }
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Header