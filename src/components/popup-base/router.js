import {forEach, arrToUrlArg} from '../../utils/utils'

var Router = {
  history: [],
  listeners: {},
  init () {
    Object.defineProperty(this.history, 'top', {
      get: function () {
        return this[this.length - 1]
      }
    })
    Object.defineProperty(this.history, 'prev', {
      get: function () {
        return this[this.length - 2]
      }
    })

    if (window) {
      window.addEventListener('popstate', () => {
        var hash = location.hash
        var params, lastParams

        // 返回
        if (this.history.prev === hash) {
          lastParams = this.getUrlParams(this.history.pop())
          params = this.getUrlParams(this.history.top)

          forEach(this.listeners, function (config, name) {
            if (params.hasOwnProperty(name)) {
              config.onBack(params[name], lastParams[name])
            }
            if (lastParams.hasOwnProperty(name)) {
              config.onLeave(params[name], lastParams[name])
            }
          })

        // 前进
        } else if (this.history.top !== hash) {
          params = this.getUrlParams(hash)
          lastParams = this.getUrlParams(this.history.top)

          this.history.push(hash)

          forEach(this.listeners, function (config, name) {
            if (params.hasOwnProperty(name)) {
              config.onEnter(params[name], lastParams[name])
            }
            if (lastParams.hasOwnProperty(name)) {
              config.onLeave(params[name], lastParams[name])
            }
          })
        }
      })

      this.history.push(location.hash)
    }
  },

  getUrlParams (url) {
    var params = {}
    if (url.indexOf('?') !== -1) {
      url = url.slice(url.indexOf('?'))
      var str = url.substr(1)
      var strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        params[strs[i].split('=')[0]] = (strs[i].split('=')[1])
      }
    }
    return params
  },

  setUrlParams (params) {
    history.replaceState({}, null,
      this.getNoHashUrl() + this.getHashOfParams(params))
  },

  getNoHashUrl () {
    return location.href.replace(location.hash, '')
  },

  getHashOfParams (params) {
    // 保存非params部分
    var hash = location.hash

    if (hash.indexOf('#') === -1) {
      hash = '#'
    } else if (hash.indexOf('?') !== -1) {
      hash = hash.slice(0, hash.indexOf('?', 0))
    }

    // 生成params部分
    hash += '?'
    for (var p in params) {
      hash += `${p}=${params}&`
    }

    return hash.slice(0, hash.length - 1)
  },

  listenParam (paramName, config) {
    this.listeners[paramName] = config
  },

  unListenParam (paramName) {
    this.listeners[paramName] = undefined
  },

  parseHashCommand (command) {
    if (command === '#back') {
      history.back()
      return
    }
    if (command === '#void') {
      return
    }

    if (command[0] === '&') {
      var currentParams = this.getUrlParams(location.hash)
      var params = this.getUrlParams('?' + command.slice(1))
      var href = location.href
      var hash = location.hash
      for (var p in params) {
        currentParams[p] = params[p]
      }

      command = arrToUrlArg(currentParams)

      if (hash.indexOf('?') !== -1) {
        command = href.slice(0, href.indexOf('#')) + hash.slice(0, hash.indexOf('?')) + command
      } else if (href.indexOf('#') !== -1) {
        command = href.slice(0, href.indexOf('#')) + (hash || '#') + command
      } else if (hash === '') {
        command = href + '#' + command
      }
    } else if (command[0] === '?') {
      if (hash.indexOf('?') !== -1) {
        command = href.slice(0, href.indexOf('#')) + hash.slice(0, hash.indexOf('?')) + command
      } else if (href.indexOf('#') !== -1) {
        command = href.slice(0, href.indexOf('#')) + hash + command
      } else if (hash === '') {
        command = href + '#' + command
      }
    }

    location.href = command
    // window.history.replaceState({}, null, command)
    return true
  },

  getParamValue (paramName) {
    return this.getUrlParams(location.hash)[paramName]
  },

  initialParam (paramName) {
    // 修复显示两个##问题
    if (location.href.indexOf('#') !== 1 && location.hash === '')
      return

    var params = this.getUrlParams(location.hash)

    delete params[paramName]

    this.setUrlParams(params)
  }
}

Router.init()

export { Router }
export default Router
