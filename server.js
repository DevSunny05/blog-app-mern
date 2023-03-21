const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const colors=require('colors')
const dotenv=require('dotenv')
const connectDB = require('./config/db')

// config
dotenv.config()

// connectdb
connectDB()

// rest object
const app=express()

// middleare
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/user',require('./routes/userRoutes'))
app.use("/api/v1/blog",require("./routes/blogRoutes"))


// port
const PORT=process.env.PORT || 8080

// listen
app.listen(8080,()=>{
    console.log(`srever running on port ${PORT} `.bgGreen.white)
})