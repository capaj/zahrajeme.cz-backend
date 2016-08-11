const glob = require('glob')
const contentPath = './content/'
const log = require('debug')('zahrajeme:photos')
const files = glob.sync(contentPath + '*')

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))

const imageNumbers = files.map(function (name) {
  return parseInt(name.substr(contentPath.length))
})
imageNumbers.sort(function numOrdA (a, b) {
  return (a - b)
})

module.exports = function (server) {
  server.expose({
    /**
     * @param {String} data base64 encoded image
     * @returns {Promise<Number>} id of the image saved on HDD
     */
    savePhoto: function (data) {
      if (!this.user) {
        throw new Error('You are not authorized')
      }
      const id = Math.max.apply(imageNumbers, imageNumbers) + 1
      if (!Number.isFinite(id)) {
        id = 0
      }
      return fs.writeFileAsync(contentPath + id + '.jpg', new Buffer(data, 'base64')).then(function () {
        log('image saved ', id)
        imageNumbers.push(id)
        return id
      })
    }
  })
}
