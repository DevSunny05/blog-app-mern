const express=require('express')
const { getAllBlogController, createBlogController, updateBlogController, deleteBlogController, getSinglrBlogController, userBlogController } = require('../controllers/blogController')
const router=express.Router()
// GET || ALL Blogs
router.get("/all-blogs",getAllBlogController)

// get  || get single blog
router.get('/get-blog/:id',getSinglrBlogController)

// post || create blog
router.post('/create-blog',createBlogController)

// put || update blog
router.put('/update-blog/:id',updateBlogController)

// delete || delete blog

router.delete('/delete-blog/:id',deleteBlogController)

// get || user blog
router.get('/user-blog/:id',userBlogController)


module.exports=router