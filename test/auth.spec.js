import test from 'ava'
import rpcClient from 'socket.io-rpc-client'
import config from '../config/default'

const backend = rpcClient('http://localhost:' + config.port)

test('auth with expired token', async t => {
  // expired open graph test user's token
  await backend('auth')("EAAEbR0ZAGqQcBAMQgaShhg1KdC190RPfmZCGwaRq6mZBY1YgcLxtu4n0oHH1ZBIe2jrMp09cN67XZASlA9lEQLGbV2LXR5vMqZBie46hi4LGbltmvwPmMutXcAhz8ZBNnX3Anl3gezKmuIVfriPDBfj178LThJhU4IyaC9imoE8asdqmVmuHZCsg")
  const usr = await backend('getUser')()
  t.deepEqual(usr, {
    "id": "1709935319273719",
    "name": "Open Graph Test User",
    "gender": "male",
    "installed": true,
    "verified": false
  })
})
