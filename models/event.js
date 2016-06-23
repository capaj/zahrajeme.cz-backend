const proxdb = require('proxdb')
const {joi} = proxdb

const Event = proxdb.model('event', {
  location: proxdb.ref('location'),
  owner: proxdb.ref('user'),
	createdDate: joi.date().default(Date.now, 'time of creation'),
	date: joi.date().required(),
	elapses: joi.number().default(60),
	minPeople: joi.number().default(0),
	extraPeople: joi.number().required(),  // number of people usually attending(not in attendees)
	attendees: proxdb.arrayOfRefs('user'),
	reoccurs: joi.string().valid(['daily', 'weekly', 'monthly', 'yearly', 'custom']),
	customReoccurence: joi.object()  // moment date range
})

module.exports = Event
