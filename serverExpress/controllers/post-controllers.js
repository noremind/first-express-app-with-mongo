const Post = require('../modules/post')
const createPathHtml = require('../helpers/createPath')

const handleError = (res, error) => {
	console.log(error)
	res.render(createPathHtml('error') , {title: 'Error'})
}



const getPost = (req, res) => {
		const title = 'Post';

		Post
		.findById(req.params.id)
		.then((post) => res.render(createPathHtml("post"), { post, title }))
		.catch((error) => handleError(res, error))
}

const deletePost = (req, res) => {
	Post
		.findByIdAndDelete(req.params.id)
		.then((result) => {
			res.sendStatus(200)
		})
		.catch((error) => handleError(res, error))
}

const getEditPost = (req, res) => {
	const title = 'Edit Post'
	Post
		.findById(req.params.id)
		.then(post => res.render(createPathHtml('edit-post'), {post , title}))
		.catch((error) => handleError(res, error))
}

const editPost = (req, res) => {
	const {title , author , text} = req.body
	const {id} = req.params
	Post
		.findByIdAndUpdate(req.params.id, {title, author, text})
		.then(result => res.redirect(`/posts/${id}`))
		.catch((error) => handleError(res, error))
}


const getPosts = (req, res) => {
	const title = 'Posts'
	Post
		.find()
		.sort({createdAt: -1})
		.then(posts => res.render(createPathHtml('posts'), {posts , title}))
		.catch((error) => handleError(res, error))
}


const getAddPost = (req, res) => {
	const title = 'Add Post'
	res.render(createPathHtml('add-post'), {title})
}


const addPost = (req, res) => {
	const {title , author , text} = req.body
	const post = new Post({title, author, text})
	post
		.save()
		.then(result => res.redirect('/posts'))
		.catch((error) => handleError(res, error))
}




module.exports = {
	getPost,
	deletePost, 
	getEditPost,
	editPost,
	getPosts,
	getAddPost,
	addPost
}