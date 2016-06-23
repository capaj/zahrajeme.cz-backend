module.exports = (model) => {
  const ro = {}
  const methods = {}
  ro[model.name] = methods
  methods.filter = function (q) {
    return _.filter(model.all(), q)
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
  }
  return ro
}
