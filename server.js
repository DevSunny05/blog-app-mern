const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const colors=require('colors')
const dotenv=require('dotenv')

// config
dotenv.config()

// rest object
const app=express()

// middleare
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.get('/',(req,res)=>{
    res.status(200).json({'message':"Node server"})
})


// port
const PORT=process.env.PORT || 8080

// listen
app.listen(8080,()=>{
    console.log(`srever running on port ${PORT} `.bgGreen.white)
})