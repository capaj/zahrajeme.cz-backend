import test from 'ava'
import rpcClient from 'socket.io-rpc-client'
import config from '../config/default'
import turf from 'turf'

const backend = rpcClient('http://localhost:' + config.port)

test('can create an event', t => {
  return backend('event.create')({
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [0, 0]
    },
    "properties": {
      "hasRoof": true
    }
  })
})
