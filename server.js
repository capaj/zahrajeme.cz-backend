const app = require('koa')()
const proxdb = require('proxdb')
proxdb.init('./db')
// const router = require('koa-router')
const config = require('config')
const RPC = require('socket.io-rpc')
const request = require('request-promise')
const server = require('http').Server(app.callback())
const makeCRUD = require('./lib/make-crud')
const sioRPCServer = RPC(server)

const handlers = {
  hello: function () {
    console.log('hello')
  },
  auth: function* (token) {
    const res = yield request('https://graph.facebook.com/me?access_token=' + token + '&fields=id,name,email,gender,installed,verified,location,hometown')
    this.fbUser = JSON.parse(res)
  },
  getUser: function* () {
    return this.fbUser
  }
}

const events = makeCRUD(require('./models/event'))
// Object.assign(handlers, makeCRUD(require('./models/location')))
console.log(events)
Object.assign(handlers, events)

sioRPCServer.expose(handlers)

// Start the server
server.listen(config.port)
console.info('Now running on: ', config.port)
