const app = require('koa')()
// const router = require('koa-router')
const config = require('config')
const RPC = require('socket.io-rpc')
const request = require('request-promise')
const server = require('http').Server(app.callback())

const sioRPCServer = RPC(server)

sioRPCServer.expose({
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
})

// Start the server
server.listen(config.port)
console.info('Now running on: ', config.port)
