let shameStorage = {}
function Storage(nameSpace, type) {
  const _this = this
  _this.nameSpace = (nameSpace || 'cill') + '_'
  type = type || 'localStorage'
  try {
    _this._st = window[type] && window[type]
  } catch (e) {
    _this._st = shameStorage
  }
}

Storage.prototype = {
  constructor: Storage,

  get: function (key) {
    const _this = this
    let ret
    try {
      ret = JSON.parse(_this._st[_this.nameSpace + key])
    } catch (e) {}

    return ret || null
  },

  set: function (key, value) {
    const _this = this
    try {
      _this._st[_this.nameSpace + key] = JSON.stringify(value)
    } catch (e) {
      try {
        _this._st.clear()
      } catch (e) {}
    }
  },

  remove: function (key) {
    const _this = this

    if (_this._st === shameStorage) {
      delete shameStorage[key]
      return
    }
    try {
      _this._st.removeItem(key)
    } catch (e) {
    }
  },

  clear: function () {
    const _this = this

    let key
    try {
      for (key in _this._st) {
        if (_this._st.hasOwnProperty(key) && key.indexOf(_this.nameSpace) === 0) {
          _this.remove(key)
        }
      }
    } catch (e) {
    }
  }
}

Storage.enabled = (() => {
  if (!navigator.cookieEnabled) {
    return false
  }

  try {
    localStorage._ = 0 // 真实localStoage返回字符串 '0'，布尔值为真，防止全局有叫localStorage的对象
    return !!localStorage._
  } catch (e) {
    return false
  }
})()

export default Storage
