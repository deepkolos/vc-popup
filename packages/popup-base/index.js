(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("vue")) : factory(root["vue"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(4)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup_controller_js__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__popup_controller_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup_register__ = __webpack_require__(38);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "popupRegister", function() { return __WEBPACK_IMPORTED_MODULE_1__popup_register__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "importVue", function() { return __WEBPACK_IMPORTED_MODULE_1__popup_register__["importVue"]; });




/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_components_popup_base__ = __webpack_require__(22);



const version = '0.0.6'
const install = function (Vue, config = {}) {
  if (install.installed) return

  __webpack_require__(22)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

/* harmony default export */ __webpack_exports__["default"] = ({
  install,
  version,
  popupRegister: __WEBPACK_IMPORTED_MODULE_0__src_components_popup_base__["popupRegister"]
});


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export PopUp */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__popup_conatiner_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popup_base_vue__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue__);





function top (arr) {
  return arr[arr.length - 1]
}

function prev (arr) {
  return arr[arr.length - 2]
}

let PopUpContainerConstructor = __WEBPACK_IMPORTED_MODULE_3_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_1__popup_conatiner_vue__["a" /* default */])
let PopUpBaseConstructor = __WEBPACK_IMPORTED_MODULE_3_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_2__popup_base_vue__["a" /* default */])
let vmPopUpContainer = new PopUpContainerConstructor({
  el: document.createElement('div')
})

let RouterIdToPopUp = {}
let RouterIdToTrigger = {}
let popUpIdQueue = []

document.body.appendChild(vmPopUpContainer.$el)
__WEBPACK_IMPORTED_MODULE_0__router_js__["a" /* default */].initialParam('popUp')

let PopUp = {
  fromUpdateRouter: false,
  fromHashChange: false,

  open (vmBase, routerId, domLoadCallback) {
    vmPopUpContainer.turnOn()
    vmBase.enter()
    popUpIdQueue.push(routerId)
    this.updateRouter(routerId)
    requestAnimationFrame(function () {
      //和那边的enter和enter的执行位置同步
      vmPopUpContainer.addPopUp(vmBase.$el)
      domLoadCallback && domLoadCallback()
      vmBase.afterDomLoad()
    })
  },

  close (routerId) {
    var vmPopUp = RouterIdToPopUp[routerId]

    vmPopUp && vmPopUp.leave(() => {
      this.destroyPopUp(routerId)
      popUpIdQueue.pop()
      if (popUpIdQueue.length === 0) {
        vmPopUpContainer.turnOff()
      }
    })
  },

  register (routerId, trigger) {
    RouterIdToTrigger[routerId] = trigger
  },

  createPopUp (config, routerId, e, runtimeConfig) {
    config = Object.assign({}, config)
    config.e = e
    config.routerId = routerId
    config.runtimeConfig = runtimeConfig

    RouterIdToPopUp[routerId] = new PopUpBaseConstructor({
      el: document.createElement('div'),
      propsData: config
    })

    return RouterIdToPopUp[routerId]
  },

  destroyPopUp (routerId) {
    vmPopUpContainer.removePopUp(RouterIdToPopUp[routerId].$el)
    RouterIdToPopUp[routerId].$destroy()
    RouterIdToPopUp[routerId] = null
  },

  updateRouter (popUpName) {
    if (this.fromHashChange) {
      this.fromHashChange = false
      return this.fromHashChange
    }

    var value = __WEBPACK_IMPORTED_MODULE_0__router_js__["a" /* default */].getParamValue('popUp')
    if (value && value.split('/').pop() !== popUpName) {
      value += '/' + popUpName
    } else {
      value = popUpName
    }

    this.fromUpdateRouter = true
    __WEBPACK_IMPORTED_MODULE_0__router_js__["a" /* default */].parseHashCommand('&popUp=' + value)
  }
}

__WEBPACK_IMPORTED_MODULE_0__router_js__["a" /* default */].listenParam('popUp', {
  onEnter (val) {
    if (PopUp.fromUpdateRouter) {
      PopUp.fromUpdateRouter = false
      return PopUp.fromUpdateRouter
    }

    var list = val ? val.split('/') : []
    var trigger = RouterIdToTrigger[top(list)]
    PopUp.fromHashChange = true
    trigger && trigger()
  },

  onLeave (val, oldVal) {
    var oldList = oldVal ? oldVal.split('/') : []
    var list = val ? val.split('/') : []
    var oldListTop = top(oldList)

    if (prev(list) !== oldListTop) {
      PopUp.fromUpdateRouter = false
      PopUp.fromHashChange = false
      PopUp.close(oldListTop)
    }
  },

  onBack (val) {

  }
})

/* harmony default export */ __webpack_exports__["a"] = (PopUp);



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Router */

function forEach (obj, func, context) {
  for (var p in obj) {
    if (context) {
      func.call(context, obj[p], p)
    } else {
      func(obj[p], p)
    }
  }
}

function arrToUrlArg (obj) {
  var arg = '?'
  for (var p in obj) {
    arg += p + '=' + obj[p] + '&'
  }
  return arg.slice(0, -1)
}

let Router = {
  history: [],
  listeners: {},
  created () {
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
    if (Object.keys(params).length > 0) {
      history.replaceState({}, null,
        this.getNoHashUrl() + this.getHashOfParams(params))
    } else {
      history.replaceState({}, null,
        this.getNoHashUrl())
    }
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
      for (var p in params) {
        currentParams[p] = params[p]
      }

      command = arrToUrlArg(currentParams)

      if (location.hash.indexOf('?') !== -1) {
        command = location.href.slice(0, location.href.indexOf('#')) +
          location.hash.slice(0, location.hash.indexOf('?')) +
          command
      } else if (location.href.indexOf('#') !== -1) {
        command = location.href.slice(0, location.href.indexOf('#')) +
        location.hash +
        command
      } else if (location.hash === '') {
        command = location.href + '#' + command
      }
    } else if (command[0] === '?') {
      if (location.hash.indexOf('?') !== -1) {
        command = location.href.slice(0, location.href.indexOf('#')) +
          location.hash.slice(0, location.hash.indexOf('?')) +
          command
      } else if (location.href.indexOf('#') !== -1) {
        command = location.href.slice(0, location.href.indexOf('#')) +
          location.hash +
          command
      } else if (location.hash === '') {
        command = location.href + '#' + command
      }
    }

    location.href = command
    return true
  },

  getParamValue (paramName) {
    return this.getUrlParams(location.hash)[paramName]
  },

  initialParam (paramName) {
    var params = this.getUrlParams(location.hash)

    delete params[paramName]

    this.setUrlParams(params)
  }
}

Router.created()

/* harmony default export */ __webpack_exports__["a"] = (Router);



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_popup_conatiner_vue__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_popup_conatiner_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_popup_conatiner_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_027d98cc_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_popup_conatiner_vue__ = __webpack_require__(32);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(27)
  __webpack_require__(29)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-027d98cc"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_popup_conatiner_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_027d98cc_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_popup_conatiner_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\popup-base\\popup-conatiner.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-027d98cc", Component.options)
  } else {
    hotAPI.reload("data-v-027d98cc", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("9190a8c8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-027d98cc\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./popup-conatiner.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-027d98cc\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./popup-conatiner.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-popup-conatiner[data-v-027d98cc] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: -1;\n}\n.vc-popup-conatiner.on[data-v-027d98cc] {\n    z-index: 0;\n}\n", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("2cb15f6f", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-027d98cc\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=1&bustCache!./popup-conatiner.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-027d98cc\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=1&bustCache!./popup-conatiner.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\nbody *:first-child{\r\n  position: relative;\r\n  z-index: 0;\n}\n* {\r\n  margin: 0;\r\n  padding: 0;\n}\r\n", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0}),exports.default={name:'vc-popup-conatiner',methods:{addPopUp:function addPopUp(a){this.$refs.container.appendChild(a)},removePopUp:function removePopUp(a){this.$refs.container.removeChild(a)},turnOn:function turnOn(){this.$el.classList.add('on')},turnOff:function turnOff(){this.$el.classList.remove('on')}}};

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "container", staticClass: "vc-popup-conatiner" })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-027d98cc", esExports)
  }
}

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_popup_base_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_popup_base_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_popup_base_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_76ca6e5c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_popup_base_vue__ = __webpack_require__(37);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(34)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-76ca6e5c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_popup_base_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_76ca6e5c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_popup_base_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\popup-base\\popup-base.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-76ca6e5c", Component.options)
  } else {
    hotAPI.reload("data-v-76ca6e5c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("54a182ec", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-76ca6e5c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./popup-base.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-76ca6e5c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./popup-base.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-popup-base[data-v-76ca6e5c] {\n  width: 100%;\n  height: 100%;\n  top: 0;\n}\n.vc-popup-slot[data-v-76ca6e5c] {\n  position: relative;\n  height: 0;\n}\n.vc-popup-mask[data-v-76ca6e5c] {\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  background-color: #000000;\n  -webkit-transition: opacity 350ms ease 0s;\n  transition: opacity 350ms ease 0s;\n  will-change: opacity;\n}\n", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _index=__webpack_require__(22),_index2=_interopRequireDefault(_index);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default={name:'vc-popup-base',props:{e:{default:null},routerId:{type:String,required:!0},maskDisable:{type:Boolean,default:!1},runtimeConfig:Object},data:function data(){return{status:null,afterEnterLocker:!1,afterLeaveLocker:!1,$animateDom:null,positionType:null}},methods:{enter:function enter(){this._beforeEnter(),this.status='on'},leave:function leave(a){this.status='off',this._beforeLeave(),this._afterLeaveCallback=a},afterDomLoad:function afterDomLoad(){this.vm_slot.event&&this.vm_slot.event.afterDomLoad&&this.vm_slot.event.afterDomLoad()},turnOffMask:function turnOffMask(){this.maskDisable||this.vm_slot._controller.close()},maskOpacity:function maskOpacity(a){this.$refs.mask.style.opacity=a},trunOffMaskTransition:function trunOffMaskTransition(){this.$refs.mask.style.transitionDuration='0ms'},trunOnMaskTransition:function trunOnMaskTransition(){this.$refs.mask.style.transitionDuration=null},maskClassAdd:function maskClassAdd(a){this.$refs.mask.classList.add(a)},maskClassRemove:function maskClassRemove(a){this.$refs.mask.classList.remove(a)},maskPreventScroll:function maskPreventScroll(a){this.runtimeConfig&&'absolute'===this.runtimeConfig.positionType||'on'===this.status&&a.preventDefault()},setAnimateDom:function setAnimateDom(a){this.$animateDom=a},getAnimateDom:function getAnimateDom(){return this.$animateDom||this.$refs.slot},_addAnimationEndListener:function _addAnimationEndListener(a,b){var c=this,d=this.$animateDom||this.$refs.slot;this[b]=!1;var e=function(f){if(f.target===d){if(c[b])return;c[b]=!0,d.removeEventListener('transitionend',e),d.removeEventListener('animationend',e),a instanceof Function&&a()}};d.addEventListener('transitionend',e),d.addEventListener('animationend',e)},_beforeEnter:function _beforeEnter(){var a=this;requestAnimationFrame(function(){a.$refs.slot.style.transitionDuration='0ms',a.maskOpacity(0),a._animation('in'),a.vm_slot.event&&a.vm_slot.event.beforeEnter instanceof Function&&a.vm_slot.event.beforeEnter(),a._addAnimationEndListener(a._afterEnter,'afterEnterLocker'),requestAnimationFrame(function(){a._animationNoneReday||(a.$refs.slot.style.transitionDuration=null),a.maskOpacity(0.25)})})},_afterEnter:function _afterEnter(){!0===this.animationendTriggered||(this._animation('in',!0),this.vm_slot.event&&this.vm_slot.event.afterEnter instanceof Function&&this.vm_slot.event.afterEnter(),!0===this.animationendTriggered)},_beforeLeave:function _beforeLeave(){var a=this;requestAnimationFrame(function(){a.maskOpacity(0),a._animation('out'),a.vm_slot.event&&a.vm_slot.event.beforeLeave instanceof Function&&a.vm_slot.event.beforeLeave(),a._freezeEvents(),setTimeout(function(){a._addAnimationEndListener(a._afterLeave,'afterLeaveLocker')},28)})},_afterLeave:function _afterLeave(){var a=this;this._animation('out',!0),this.vm_slot.event&&this.vm_slot.event.afterLeave instanceof Function&&this.vm_slot.event.afterLeave(),requestAnimationFrame(function(){a._afterLeaveCallback instanceof Function&&a._afterLeaveCallback()})},_freezeEvents:function _freezeEvents(){this.$refs.base.addEventListener('touchstart',this._stopPropagation,!0),this.$refs.base.addEventListener('touchmove',this._stopPropagation,!0),this.$refs.base.addEventListener('touchend',this._stopPropagation,!0)},_stopPropagation:function _stopPropagation(a){a.stopPropagation(),a.preventDefault()},_animation:function _animation(a){var b,c=1<arguments.length&&arguments[1]!==void 0&&arguments[1],d=this.vm_slot._controller.config.animation,e=this.getAnimateDom();d instanceof Object&&(b=d[a],b instanceof String?!1===c?e.classList.add(b):e.classList.remove(b):b instanceof Array?!1===c?b.forEach(function(a){return e.classList.add(a)}):b.forEach(function(a){return e.classList.remove(a)}):b instanceof Object&&'zoomFromDom'===b.effect&&this._triggerZoomFromDom(a,b,c)),d=null,e=null,b=null},_triggerZoomFromDom:function _triggerZoomFromDom(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=b.fromDom||(this.e?this.e.target:null),n=this.vm_slot.$el,o=2/3;m&&!c&&(this._animationNoneReday=!0,n.style.opacity=0,requestAnimationFrame(function(){d=m.getBoundingClientRect(),e=n.getBoundingClientRect(),b.offset!==void 0&&(o=b.offset),j=e.left+e.width/2,k=e.left+e.width/2,h=d.left+d.width/2,i=d.top+d.height/2,f=h-j,g=i-k,'in'===a?(l.$refs.slot.style.transitionDuration='0ms',n.style.opacity=0,n.style.transform='translate3d('+f*o+'px, '+g*o+'px,0) scale('+o+')',requestAnimationFrame(function(){n.style.transform=null,n.style.transitionDuration=null,l._animationNoneReday=null,n.style.opacity=null})):'out'===a&&(n.style.transform='translate3d('+f*o+'px, '+g*o+'px,0) scale('+o+')',n.style.opacity=0)}))}},destroyed:function destroyed(){this.$animateDom=null}};

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "base",
      staticClass: "vc-popup-base",
      style: { position: _vm.positionType },
      attrs: { routerId: _vm.routerId },
      on: {
        touchmove: _vm.maskPreventScroll,
        mousewheel: _vm.maskPreventScroll,
        DOMMouseScroll: _vm.maskPreventScroll
      }
    },
    [
      _c("div", {
        ref: "mask",
        staticClass: "vc-popup-mask",
        on: { click: _vm.turnOffMask }
      }),
      _vm._v(" "),
      _c("div", { ref: "slotContainer", staticClass: "vc-popup-slot" }, [
        _c("div", { ref: "slot", on: { touchmove: _vm._stopPropagation } })
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-76ca6e5c", esExports)
  }
}

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return popupRegister; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup_base__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);



function popupRegister (name, template, popUpConfig, defaultConfig) {
  var incrId = 0
  var instancesMap = {}

  // 首字母大写
  name = name[0].toUpperCase() + name.slice(1)

  function popupTemplate (constructConfig) {
    this.constructor = popupTemplate
    this.init(
      defaultConfig, constructConfig,
      popUpConfig, instancesMap,
      template, incrId++, __WEBPACK_IMPORTED_MODULE_1_vue___default.a
    )
    this.name = name
  }

  popupTemplate.prototype = __WEBPACK_IMPORTED_MODULE_0__popup_base__["a" /* default */]
  if (__WEBPACK_IMPORTED_MODULE_1_vue___default.a.prototype.$popup) {
    __WEBPACK_IMPORTED_MODULE_1_vue___default.a.prototype.$popup[name] = popupTemplate
  } else {
    __WEBPACK_IMPORTED_MODULE_1_vue___default.a.prototype.$popup = {
      [name]: popupTemplate
    }
  }

  return popupTemplate
}

/* unused harmony default export */ var _unused_webpack_default_export = (popupRegister);



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__popup_base_index_js__ = __webpack_require__(22);


let popUpBase = {
  init: function (
    defaultConfig, constructConfig, popUpConfig, instancesMap, template, id, Vue
  ) {
    this.constructConfig = Object.assign({}, defaultConfig, constructConfig)
    this.popUpConfig = popUpConfig
    this.instancesMap = instancesMap
    this.constructConfig.id = id
    this.config = this.constructConfig
    this.Factory = Vue.extend(template)
    this.instancesMap[this.getRouterId()] = this
    __WEBPACK_IMPORTED_MODULE_0__popup_base_index_js__["default"].register(this.getRouterId(), this.open.bind(this))
  },

  open: function (e, runtimeConfig) {
    var routerId = this.getRouterId()

    this.config = Object.assign({}, this.constructConfig, runtimeConfig)
    this.config.propsData = Object.assign({}, this.constructConfig.propsData, runtimeConfig ? runtimeConfig.propsData : {})
    this.config.e = this.config.propsData.e = e

    this.vm_popUp = __WEBPACK_IMPORTED_MODULE_0__popup_base_index_js__["default"].createPopUp(this.popUpConfig, routerId, e, this.config)
    this.vm_slot = new this.Factory({
      el: this.vm_popUp.$refs.slot,
      propsData: this.config.propsData
    })
    this.vm_popUp.$refs.slot = this.vm_slot.$el
    this.vm_popUp.vm_slot = this.vm_slot // 我觉得我的命名开始凌乱了...
    this.vm_slot._controller = this

    __WEBPACK_IMPORTED_MODULE_0__popup_base_index_js__["default"].open(this.vm_popUp, routerId, () => {
      this.configPosition(e)
    })
  },

  getRouterId: function () {
    if (this.config.name === undefined && !this.instancesMap.hasOwnProperty(name)) {
      return this.name + '_' + this.config.id
    } else if (typeof this.config.name === 'string' && this.config.name !== '') {
      return this.config.name
    } else {
      console.log('出现不合法的routerId~')
      return null
    }
  },

  close: function () {
    if (this.vm_popUp.status === 'on') {
      history.back()
    }
  },

  configPosition: function (e) {
    var config = this.config
    var $slot = this.vm_slot.$el
    var $slotContainer = this.vm_popUp.$refs.slotContainer
    var position = config.position

    // 公用
    var fromLeft, fromTop, originX, originY
    var fromFrameLeft, fromFrameTop
    var placeLeftOffset, placeRightOffset, placeBottomOffset, placeTopOffset
    var margins = []
    var frame = {}
    var dWidth = $slot.clientWidth
    var dHeight = $slot.clientHeight
    // clickRelative 需要的
    var clickX, clickY

    // domRelative 需要的
    var $refDom, refRect
    var refCorner, relativeToCorner

    this.vm_popUp.positionType = config.positionType || 'fixed'

    if (config.positionType === 'absolute') {
      $slotContainer.style.marginTop = window.scrollY + 'px'
      $slotContainer.style.marginLeft = window.scrollX + 'px'
    }

    if (position === 'center' || position === undefined) {
      position = {}
    }

    if (position instanceof Object) {
      frame.width = window.innerWidth
      frame.height = window.innerHeight

      var helper = function (one, another) {
        var tmp
        var frameOne = one === 'top' ? frame.height : frame.width
        var dOne = one === 'top' ? dHeight : dWidth

        one = position[one]
        another = position[another]

        if (one !== undefined) {
          // 百分比处理
          if (typeof one === 'string' && one.indexOf('%') !== -1) {
            tmp = parseFloat(one.slice(0, one.indexOf('%'))) * frameOne
          } else if (typeof one === 'string' || typeof one === 'number') {
            tmp = one
          } else {
            console.log('position.top的参数类型不对~')
          }
        } else if (another !== undefined) {
          // 百分比处理
          if (typeof another === 'string' && another.indexOf('%') !== -1) {
            tmp = (1 - parseFloat(another.slice(0, another.indexOf('%')))) * frameOne
          } else if (typeof another === 'string' || typeof another === 'number') {
            tmp = frameOne - parseFloat(another) - dOne
          } else {
            console.log('position.bottom的参数类型不对~')
          }
        } else { // 居中
          tmp = (frameOne - dOne) / 2
        }

        return tmp
      }

      fromTop = helper('top', 'bottom')
      fromLeft = helper('left', 'right')
      $slot.style.marginLeft = fromLeft + 'px'
      $slot.style.marginTop = fromTop + 'px'
    }

    if (position === 'clickRelative') {
      // region 点击坐标初始化
      if (e === undefined) return

      if (e.touches && e.touches[0]) {
        clickX = e.touches[0].clientX
        clickY = e.touches[0].clientY
      } else if (e.clientX) {
        clickX = e.clientX
        clickY = e.clientY
      }

      // endregion
      // region 外框 格式化 TODO 之后可以缓存这个,不过动态也是有好处的, 性能优化的时候在做吧
      if (config.frame instanceof Object) {
        frame.top = config.frame.top
        frame.left = config.frame.left
        frame.width = config.frame.width
        frame.height = config.frame.height
      } else if (config.frame instanceof HTMLElement) {
        var rect = config.frame.getBoundingClientRect()
        frame.top = rect.top
        frame.left = rect.left
        frame.width = rect.width
        frame.height = rect.height
      } else {
        frame.top = 0
        frame.left = 0
        frame.width = window.innerWidth
        frame.height = window.innerHeight
      }
      // endregion

      // region margin 导入
      if (typeof config.margin === 'number' || typeof config.margin === 'string') {
        margins[0] = margins[1] = margins[2] = margins[3] = config.margin
      } else if (config.margin instanceof Array) {
        if (config.margin.length === 2) {
          margins[0] = margins[2] = config.margins[0]
          margins[1] = margins[3] = config.margins[1]
        } else if (config.margin.length === 4) {
          margins[0] = config.margins[0]
          margins[1] = config.margins[1]
          margins[2] = config.margins[2]
          margins[3] = config.margins[3]
        }
      } else {
        margins[0] = margins[1] = margins[2] = margins[3] = 0
      }

      // margin 数值格式化
      var formatValue = function (val, base) {
        if (typeof val === 'string') {
          if (val[val.length - 1] === '%') {
            return parseInt(val.slice(0, val.length - 1)) * base
          } else if (val.indexOf('px') !== -1) {
            return parseInt(val.replace('px', ''))
          }
        } else if (typeof val === 'number') {
          return val
        }
      }
      margins[0] = formatValue(margins[0], frame.height)
      margins[1] = formatValue(margins[1], frame.width)
      margins[2] = formatValue(margins[2], frame.height)
      margins[3] = formatValue(margins[3], frame.width)

      //endregion

      fromFrameLeft = clickX - frame.left
      fromFrameTop = clickY - frame.top

      //region 左右
      //假设放在左右边的情况
      placeLeftOffset = frame.width - fromFrameLeft - dWidth - margins[1]
      placeRightOffset = fromFrameLeft - dWidth - margins[3]

      if (dWidth < frame.width) {
        if (placeLeftOffset < 0) {
          if (placeRightOffset > 0) {
            fromLeft = clickX - dWidth
            originX = 'right'
          } else {
            if (placeLeftOffset > placeRightOffset) {
              fromLeft = clickX + placeLeftOffset
              originX = 'left'
            } else {
              fromLeft = clickX - dWidth - placeRightOffset
              originX = 'left'
            }
          }
        } else {
          // 右边可以嵌入正常
          fromLeft = clickX
          originX = 'left'
        }
      } else {
        // 溢出的情况
        fromLeft = 0
        originX = 'left'
      }
      // endregion

      // region 上下
      // 假设放在上下边的情况
      placeBottomOffset = frame.height - fromFrameTop - dHeight - margins[2]
      placeTopOffset = fromFrameTop - dHeight - margins[0]

      if (dHeight < frame.height) {
        if (placeBottomOffset < 0) {
          if (placeTopOffset > 0) {
            fromTop = clickY - dHeight
            originY = 'bottom'
          } else {
            if (placeBottomOffset > placeTopOffset) {
              fromTop = clickY + placeBottomOffset
              originY = 'top'
            } else {
              fromTop = clickY - dHeight - placeTopOffset
              originY = 'bottom'
            }
          }
        } else {
          // 右边可以嵌入正常
          fromTop = clickY
          originY = 'top'
        }
      } else {
        // 溢出的情况
        fromTop = 0
        originY = 'top'
      }
      // endregion

      $slot.style.position = 'absolute'
      $slot.style.left = fromLeft + 'px'
      $slot.style.top = fromTop + 'px'
    }

    // region
    if (position === 'domRelative' && config.refDom instanceof HTMLElement) {
      $refDom = config.refDom
      refRect = $refDom.getBoundingClientRect()

      //解析参数
      refCorner = this.parseRefCorner(config.refCorner)
      relativeToCorner = this.parseRelativeToCorner(config.relativeToCorner)

      // 设定位置
      fromLeft = refRect.left
      fromTop = refRect.top

      if (refCorner[0] === 'bottom') {
        fromTop += refRect.height
      } else if (refCorner[0] === 'center') {
        fromTop += refRect.height / 2 - dHeight / 2
      }

      if (refCorner[1] === 'right') {
        fromLeft += refRect.width
      } else if (refCorner[1] === 'center') {
        fromLeft += refRect.width / 2 - dWidth / 2
      }

      if (relativeToCorner[0] === 'above' && refCorner[0] !== 'center') {
        fromTop -= dHeight
      }

      if (relativeToCorner[1] === 'before' && refCorner[1] !== 'center') {
        fromLeft -= dWidth
      }

      originY = refCorner[0] !== 'center'
                ? relativeToCorner[0] === 'above' ? 'bottom' : 'top'
                : 'center'

      originX = refCorner[1] !== 'center'
                ? relativeToCorner[1] === 'before' ? 'right' : 'left'
                : 'center'

      $slot.style.position = 'absolute'
      $slot.style.left = fromLeft + 'px'
      $slot.style.top = fromTop + 'px'
    }
    // endregion

    // 设置动画重心
    if (config.autoSetOrthocenter === true) {
      $slot.style['transform-origin'] = (originY + ' ' + originX)
    }
  },

  parseRefCorner: function (cRefCorner) {
    // 解析refCorner
    var refCorner
    var validVerticalRefCorner = ['top', 'bottom', 'center']
    var validHorizonalRefCorner = ['left', 'right', 'center']

    if (cRefCorner === undefined) {
      // 缺省默认
      refCorner = ['top', 'right']
    } else if (typeof cRefCorner === 'string') {
      refCorner = cRefCorner.split(' ')
      //检查参数是否合法
      if (
        refCorner.length !== 2 ||
        !validVerticalRefCorner.includes(refCorner[0]) || !validHorizonalRefCorner.includes(refCorner[1])
      ) {
        console.log('refCorner配置有误~')
      }
    } else {
      // 非法参数,或者不可解析的参数
      console.log('refCorner配置有误~')
    }
    return refCorner
  },

  parseRelativeToCorner: function (cRelativeToCorner) {
    // 解析refCorner
    var relativeToCorner
    var validVerticalRelativeToCorner = ['below', 'above']
    var validHorizonalRelativeToCorner = ['before', 'after']

    //解析relativeToCorner
    if (cRelativeToCorner === undefined) {
      // 缺省默认
      relativeToCorner = ['below', 'after']
    } else if (typeof cRelativeToCorner === 'string') {
      relativeToCorner = cRelativeToCorner.split(' ')
      //检查参数是否合法
      if (
        relativeToCorner.length !== 2 ||
        !validVerticalRelativeToCorner.includes(relativeToCorner[0]) || !validHorizonalRelativeToCorner.includes(relativeToCorner[1])
      ) {
        console.log('relativeToCorner配置有误~')
      }
    } else {
      // 非法参数,或者不可解析的参数
      console.log('relativeToCorner配置有误~')
    }
    return relativeToCorner
  }
}

/* harmony default export */ __webpack_exports__["a"] = (popUpBase);


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=index.js.map