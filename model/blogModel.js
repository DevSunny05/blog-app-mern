const mongoose=require('mongoose')

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        require:[true,'title is require']
    },
    description:{
        type:String,
        require:[true,'description is require']
    },
    image:{
        type:String,
        require:[true,'image is require']
    },
},{timestamps:true})

const blogModel=mongoose.model('Blog',blogSchema)

module.exports=blogModel 