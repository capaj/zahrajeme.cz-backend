const d = require('debug')('zahrajeme:crud')
const _ = require('lodash')

module.exports = (model) => {
  const ro = {}
  const methods = {}
  ro[model.name] = methods
  methods.find = function (q) {
    return _.filter(model.all(), q)
  }
  methods.insidePolygon = (prop, poly) => {
    return _.filter(model.all(), (doc) => {
      const polygon = turf.polygon(poly)
      const point = turf.point(doc[prop])
      return turf.inside(point, polygon);
    })
  }
  methods.near = (prop, point, distance) => {
    return _.filter(model.all(), (doc) => {
      const nearToPoint = turf.point(point)
      const docPoint = turf.point(doc[prop])
      return turf.distance(nearToPoint, docPoint) <= distance;
    })
  }
  methods.findOne = function (q) {
    return _.find(model.all(), q)
  }
  methods.count = function () {
    return model.map.size
  }
  methods.create = function (data) {
    if(!this.user){
      throw new Error('not authorized')
    }
    data.owner = this.user
    const created = new model(data)
    d(`created ${mode.name}`, created)
    return created.id
  }
  methods.remove = function (id) {
    const toRemove = model.map.get(id)
    if (!toRemove) {
      throw new Error(`id ${id} not found`)
    }
    if (toRemove.owner !== this.user) {
      throw new Error('you are not authorized')
    }
    d(`removed ${mode.name}`, toRemove)
    return model.remove(id)
  }
  methods.update = function (id, data) {
    const toUpdate = model.map.get(id)
    if (!toUpdate) {
      throw new Error(`id ${id} not found`)
    }
    if (toUpdate.owner !== this.user) {
      throw new Error('you are not authorized')
    }
    Object.assign(toUpdate, data)
    d(`updated ${mode.name}`, toUpdate)
  }
  return ro
}
