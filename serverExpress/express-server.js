const express = require("express");

// const chalk = require('chalk') // Not work

const path = require("path");
const morgan = require('morgan') //Preference
const mongoose = require('mongoose') //Mongo Db

const postRouter = require('./routes/post-routes')
const contactRouter = require('./routes/contact-routes')

const createPathHtml = require('./helpers/createPath')

const methodOverride = require('method-override')//Package

const postApiRoutes = require('./routes/api-post-routes') // API

require('dotenv').config() //Enviroment 

mongoose
	.connect(process.env.MONGO_URL)
	.then((res) => console.log('Connect to DB'))
	.catch((error) => console.log(error))

const app = express();

app.set('view engine', 'ejs') //Package



app.use((req, res, next) => { //Middleware next()
	console.log(`path: ${req.path}`)
	console.log(`mathod: ${req.method}`)

	next()
})

// Package catcher 
app.use(methodOverride('_method'))

//Listen host
app.listen(process.env.PORT, (err) => {
	err ? console.log(err) : console.log(`Express server listening port ${process.env.PORT}`);
});

//Show Performance in terminal
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

 //Parsing data in Input html tag
app.use(express.urlencoded({extended: false}))





const stylesPath = path.join(__dirname, 'styles')
app.use('/assets' , express.static(stylesPath)) //Worked "/assets"


//Main
app.get("/", (req, res) => {
	const title = 'Home'
	// res.send('<h1>Hello Nyrum</h1>')//Equal res.write and res.end. Auto setHeader
	res.render(createPathHtml("main"), { title });
});


app.use(postRouter)
app.use(contactRouter)

app.use(postApiRoutes) // API

//About Us (Redirect)
app.get("/about-us", (req, res) => {//redirect
	res.redirect("./contacts");
});


//Error
app.use((req, res) => {//We dont know what accept user that's why sendFile error.html /// Middleware
	// res.statusCode = 404
	const title = 'Error Page'

	res
		.status(404)
		.render(createPathHtml("error"), { title });
});






// //Listen host
// app.listen(port, (err) => {
// 	err ? console.log(err) : console.log(`Express server listening port ${port}`);
// });
