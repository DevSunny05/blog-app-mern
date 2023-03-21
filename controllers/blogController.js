const mongoose = require('mongoose')
const blogModel=require('../model/blogModel')
const userModel = require('../model/userModel')

exports.getAllBlogController=async(req,res)=>{
    try {
        const blogs=await blogModel.find({}).populate('user')
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:'No blog found'
            })
        }

        return res.status(200).send({
            success:true,
            message:'Successfully get alls blogs',
            blogs
        })
    } catch (error) {
        return res.status(500).send({
            message:'Failed to get Blogs',
            success:false,
            error
        })
    }
}

exports.getSinglrBlogController=async(req,res)=>{
    try {
        const {id}=req.params
        const blog=await blogModel.findById(id)
        if(!blog){
            return res.status(404).send({
                success:false,
                message:'Blog not found'
            })
        }

        return res.status(200).send({
            success:true,
            message:'Blog get successfully',
            blog
        })
    } catch (error) {
        return res.status(500).send({
            message:'Failed to get Blog',
            success:false,
            error
        })
    }

}

exports.createBlogController=async(req,res)=>{
    try {
        const {title,description,image,user}=req.body

        if(!title || !image || !description || !user){
            return res.status(200).send({
                success:false,
                message:'Please provide all fields'
            })
        }

        const existingUser=await userModel.findById(user)
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:'Unable to find user'
            })
        }
        const newBlog=new blogModel({title,description,image,user})
        const session=await mongoose.startSession()

        session.startTransaction()
        await newBlog.save({session})
        existingUser.blogs.push(newBlog)
        await existingUser.save({session})
        await session.commitTransaction()

        await newBlog.save()
        return res.status(201).send({
            success:true,
            message:'Blog created successfully',
            newBlog
        })

    } catch (error) {
        return res.status(500).send({
            message:'Failed to create Blog',
            success:false,
            error
        })
    }

}

exports.updateBlogController=async(req,res)=>{
    try {
        const {id}=req.params
        const {title,description,image}=req.body
        const blog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(201).send({
            success:true,
            message:'Successfully updated',
            blog
        })

    } catch (error) {
        return res.status(500).send({
            message:'Failed to update Blog',
            success:false,
            error
        })
    }

}

exports.deleteBlogController=async(req,res)=>{
    try {
        const {id}=req.params
        const blog=await blogModel.findByIdAndDelete(id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        if(!blog){
            return res.status(404).send({
                success:false,
                message:'Blog dosent found'
            })
        }

        return res.status(200).send({
            success:true,
            message:'Successfully deleted'
        })
        
    } catch (error) {
        return res.status(500).send({
            message:'Failed to delete Blog',
            success:false,
            error
        })
    }

}

exports.userBlogController=async(req,res)=>{
    try {
        const {id}=req.params
        const userBlog=await userModel.findById(id).populate('blogs')
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:'blogs are not available'
        })
        }

        return res.status(200).send({
            success:true,
            message:'Blogs get successfully',
            userBlog
    })
    } catch (error) {
        return res.status(500).send({
            message:'Failed to get user Blog',
            success:false,
            error
        })
    }
}