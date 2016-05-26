const app = require('koa')()
// const router = require('koa-router')
const config = require('config')
const RPC = require('socket.io-rpc')

const server = require('http').Server(app.callback())

const sioRPCServer = RPC(server)

sioRPCServer.expose({
  hello: function () {
    console.log('hello')
  }
})

// Start the server
server.listen(config.port)
console.info('Now running on: ', config.port)
