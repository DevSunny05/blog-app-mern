const userModel=require('../model/userModel')
const bcrypt=require('bcrypt')

// register user
exports.registerUser=async(req,res)=>{
    try {

        const {username,email,password}=req.body

        if(!username || !email || !password){
            return res.status(400).json({
                success:false,
                message:'Please fill all the fields'
            })
        }

        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:'User already exist'
            })
        }
        const hashedPassword=await bcrypt.hash(password,10)
        

        const user=new userModel({username,email,password:hashedPassword})
        await user.save()
        return res.status(201).json({
            success:true,
            message:'New user created',
            user
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Error in register',
            success:false,
            error
        })
    }
}

// login user
exports.loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please fill all the fields'
            })
        }

        const user=await userModel.findOne({email})
        if(!user){
            return res.status(200).json({
                success:false,
                message:'Email is not registerd'
            })
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:'Invalid email and password '
            })
        }

        return res.status(200).json({
            success:true,
            message:'Login successfully',
            user
        })
    } catch (error) {
        return res.status(500).json({
            message:'Failed to login',
            success:false,
            error
        })
    }
}

// get all users
exports.getAllUsers=async(req,res)=>{
    try {
        const users=await userModel.find({})
        return res.status(200).json({
            success:true,
            message:'Get All users data',
            users
        })
    } catch (error) {
        return res.status(500).json({
            message:'Error in geting users',
            success:false,
            error
        })
    }

}





