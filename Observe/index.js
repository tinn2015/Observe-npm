class Observe {
  constructor () {
    this.message = {}
  }
  $on (type, fn) {
    if (typeof this.message[type] === 'undefined') {
      this.message[type] === [fn]
    } else {
      this.message[type].push(fn)
    }
  }
  $emit (type, args) {
    let runArr = this.message[type]
    if (!runArr.length) return
    let events = {
      type: type,
      args: args || {}
    }
    for (let i = 0; i < runArr.length; i++) {
      runArr[i].call(this, events)
    }
  }
  $off (type, fn) {
    if (this.message[type] instanceof Array) {
      let runArr = this.message[type]
      let i = runArr.length - 1
      for (; i >= 0; i--) {
        runArr[i] === fn && runArr.splice(i, 1)
      }
    }
  }
}

export default new Observe()