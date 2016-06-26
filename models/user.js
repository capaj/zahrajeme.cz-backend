const proxdb = require('proxdb')
const {joi} = proxdb
let sports = require('../enums/sports-enum')
sports = sports.map(function (sport){
  return sport.id;
})

const User = proxdb.model('user', {
  fb: joi.object({	//we use these fields even for people who don't authenticate with facebook
  		id: joi.string(),
  		first_name: joi.string(),
  		last_name: joi.string(),
  		gender: joi.string(),
  		username: joi.string(),
  		verified:  joi.boolean(),
  		birthday: joi.date(),
  		email: joi.string().email(),
  		location: joi.string(),
  		hometown: joi.string()
  	}).unknown(),
  	creation_date: joi.date().default(Date.now, 'time of creation'),
    page_limit: joi.number().default(50),
    fb_publish: joi.boolean().default(true),
    lookingFor: joi.array().items(joi.string().valid(sports))
})

module.exports = User
