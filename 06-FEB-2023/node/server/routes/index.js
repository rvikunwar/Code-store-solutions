const express = require('express');
const router = express.Router();

const blogController = require('../controllers');

//get blogs
router.get('', blogController.getBlogs);

//post blogs
router.post('/createBlog', blogController.postBlog);

//update blog
router.put("/updateBlog/:id", blogController.updateBlog)

//delete blog
router.delete("/deleteBlog/:id", blogController.deleteBlog)

module.exports = router;