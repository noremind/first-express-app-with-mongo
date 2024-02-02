const express = require('express')
const {
	getPost,
	deletePost,
	editPost,
	getPosts,
	addPost
} = require('../controllers/api-post-controllers')

const router = express.Router()

// Get All Posts
router.get('/api/posts', getPosts)
// Add new Post
router.post('/api/post', addPost)
// Get Post by ID
router.get('/api/post/:id', getPost)
// Delete Post by ID
router.delete('/api/post/:id', deletePost)
//Update
router.put('/api/post/:id', editPost)


module.exports = router
