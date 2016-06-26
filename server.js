const app = require('koa')()
const log = require('debug')('zahrajeme:main')
const proxdb = require('proxdb')
proxdb.init('./db')
// const router = require('koa-router')
const config = require('config')
const RPC = require('socket.io-rpc')
const request = require('request-promise')
const server = require('http').Server(app.callback())
const makeCRUD = require('./lib/make-crud')
const sioRPCServer = RPC(server)
const User = require('./models/user')

const handlers = {
  hello: function () {
    console.log('hello')
  },
  auth: function* (token) {
    let res = yield request('https://graph.facebook.com/me?access_token=' + token + '&fields=id,name,email,gender,installed,verified,location,hometown')
    res =  JSON.parse(res)
    let existing = User.all().find((u) => u.fb.id === res.id)
    if (!existing) {
      log('created new user, ', res.id, res.name)
      existing = new User({
        fb: res,
        lookingFor: []
      })
    }
    this.user = existing
    return existing
  },
  unauth: function () {
    delete this.user
  },
  getUser: function* () {
    return this.fbUser
  }
}

Object.assign(handlers, makeCRUD(require('./models/user')))
Object.assign(handlers, makeCRUD(require('./models/location')))
Object.assign(handlers, makeCRUD(require('./models/event')))

sioRPCServer.expose(handlers)

// Start the server
server.listen(config.port)
console.info('Now running on: ', config.port)
