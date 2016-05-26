import test from 'ava'
import rpcClient from 'socket.io-rpc-client'
import config from '../config/default'

const backend = rpcClient('http://localhost:' + config.port)

test('can create an event', t => {
  return backend('hello')()
})
