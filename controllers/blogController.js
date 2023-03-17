const blogModel=require('../model/blogModel')

exports.getAllBlogController=async(req,res)=>{
    try {
        const blogs=await blogModel.find({})
        if(!blogs){
            return res.status(200).json({
                success:false,
                message:'No blog found'
            })
        }

        return res.status(200).json({
            success:true,
            message:'Successfully get alls blogs',
            blogs
        })
    } catch (error) {
        return res.status(500).json({
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
            return res.status(404).json({
                success:false,
                message:'Blog not found'
            })
        }

        return res.status(200).json({
            success:true,
            message:'Blog get successfully',
            blog
        })
    } catch (error) {
        return res.status(500).json({
            message:'Failed to get Blog',
            success:false,
            error
        })
    }

}

exports.createBlogController=async(req,res)=>{
    try {
        const {title,image,description}=req.body

        if(!title || !image || !description){
            return res.status(200).json({
                success:false,
                message:'Please provide all fields'
            })
        }

        const newBlog=new blogModel({title,description,image})
        await newBlog.save()
        return res.status(201).json({
            success:true,
            message:'Blog created successfully',
            newBlog
        })

    } catch (error) {
        return res.status(500).json({
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
        return res.status(201).json({
            success:true,
            message:'Successfully updated',
            blog
        })

    } catch (error) {
        return res.status(500).json({
            message:'Failed to update Blog',
            success:false,
            error
        })
    }

}

exports.deleteBlogController=async(req,res)=>{
    try {
        const {id}=req.params
        const blog=await blogModel.findByIdAndDelete(id)
        if(!blog){
            return res.status(404).json({
                success:false,
                message:'Blog dosent found'
            })
        }

        return res.status(200).json({
            success:true,
            message:'Successfully deleted'
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Failed to delete Blog',
            success:false,
            error
        })
    }

}