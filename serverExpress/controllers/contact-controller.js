const Contact = require('../modules/contact.js')
const createPathHtml = require('../helpers/createPath')

const getContacts = (req , res) => {
	const title = 'Contacts'

	Contact
		.find()
		.then((contacts) => res.render(createPathHtml("contacts"), { contacts, title }))
		.catch((error) => {
			console.log(error)
			res.render(createPathHtml('error') , {title: 'Error'})
	})
}

module.exports = getContacts
