const proxdb = require('proxdb')
const {joi} = proxdb
let sports = require('../enums/sports-enum')
sports = sports.map(function (sport){
  return sport.id;
})

const Location = proxdb.model('location', {
  name: joi.string(),
  owner: proxdb.ref('user'),
  geo: joi.object().required(),
	offers: joi.array().items(joi.string().valid(sports)),	//which sports one can play at that location
	link: joi.string().uri(),
	phone: joi.string(),
	streetAddress: joi.string(),
	mail: joi.string().email(),
	createdDate: joi.date().default(Date.now, 'time of creation')
})

module.exports = Location
