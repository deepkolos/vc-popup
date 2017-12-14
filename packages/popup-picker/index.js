(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vc-popup-base"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vc-popup-base", "vue"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("vc-popup-base"), require("vue")) : factory(root["vc-popup-base"], root["vue"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 157);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
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

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("5682bac4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-42554e8c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-42554e8c\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-picker-body[data-v-42554e8c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  background-color: #fff;\n  height: 238px;\n  overflow: hidden;\n}\n", ""]);

// exports


/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _pickerSlot=__webpack_require__(13),_pickerSlot2=_interopRequireDefault(_pickerSlot);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default={name:'vc-picker-view',components:{VcPickerSlot:_pickerSlot2.default},props:{slots:{type:Array,required:!0},defaultValues:Array,showItemNum:{type:Number,default:7,validator:function validator(a){return 0!=a%2&&1<a}},showItemHeight:{type:Number,default:34},valueKey:String,onChange:Function},computed:{values:function(){var a=this.slots||[],b=[];return a.forEach(function(a){a.divider||b.push(a.value)}),b},slotCount:function slotCount(){var a=this.slots||[],b=0;return a.forEach(function(a){a.divider||b++}),b}},created:function created(){var a=this;this.$on('slotValueChange',this.slotValueChange);var b=this.slots||[],c=this.values,d=0;b.forEach(function(b){b.divider||(b.valueIndex=d++,c[b.valueIndex]=(b.values||[])[b.defaultIndex||0],a.slotValueChange())}),this.defaultValues instanceof Array&&this.setValues(this.defaultValues),7<this.showItemNum&&(this.showItemNum=7)},mounted:function mounted(){this.$refs.body.style.height=this.showItemHeight*this.showItemNum+'px'},methods:{slotValueChange:function slotValueChange(){this.onChange instanceof Function&&this.onChange(this,this.values)},getSlot:function getSlot(a){var b,c=this.slots||[],d=0,e=this.$children;return e=e.filter(function(a){return'vc-picker-slot'===a.$options.name}),c.forEach(function(c,f){c.divider||(a===d&&(b=e[f]),d++)}),b},getSlotValue:function getSlotValue(a){var b=this.getSlot(a);return b?b.value:null},setSlotValue:function setSlotValue(a,b,c){var d=this;this.$nextTick(function(){var e=d.getSlot(a);e&&(e.currentValue=b,0<c.length&&e.$nextTick(c.shift()))})},getSlotValues:function getSlotValues(a){var b=this.getSlot(a);return b?b.mutatingValues:null},setSlotValues:function setSlotValues(a,b){var c=this;this.$nextTick(function(){var d,e=c.getSlot(a);e&&(d=e.currentValue,e.mutatingValues=b,e.$nextTick(function(){d!==void 0&&null!==d&&e.doOnValueChange(d),d=null}))})},getValues:function getValues(){return this.values},setValues:function setValues(a){var b=this;if(a=a||[],this.slotCount!==a.length)throw new Error('values length is not equal slot count.');var c=[];a.forEach(function(a,d){0!==d&&c.push(function(){b.setSlotValue(d,a,c)})}),this.setSlotValue(0,a[0],c)}}};

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_picker_slot_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_picker_slot_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_picker_slot_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f7de245_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_picker_slot_vue__ = __webpack_require__(20);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(14)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7f7de245"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_picker_slot_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f7de245_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_picker_slot_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\picker-view\\picker-slot.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f7de245", Component.options)
  } else {
    hotAPI.reload("data-v-7f7de245", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("143f47c9", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f7de245\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./picker-slot.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f7de245\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./picker-slot.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-picker-group[data-v-7f7de245] {\n  z-index: 0;\n  overflow: hidden;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n      flex: 1;\n  position: relative;\n  height: 100%;\n}\n.vc-picker-mask[data-v-7f7de245] {\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  background: -webkit-gradient(linear, left top, left bottom, from(rgba(255, 255, 255, 0.95)), to(rgba(255, 255, 255, 0.6))), -webkit-gradient(linear, left bottom, left top, from(rgba(255, 255, 255, 0.95)), to(rgba(255, 255, 255, 0.6)));\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\n  background-position: top,bottom;\n  background-size: 100% 102px;\n  background-repeat: no-repeat;\n}\n.vc-picker-indicator[data-v-7f7de245] {\n  z-index: 3;\n  height: 34px;\n}\n.vc-picker-indicator[data-v-7f7de245]:after, .vc-picker-indicator[data-v-7f7de245]:before {\n    content: \" \";\n    position: absolute;\n    left: 0;\n    right: 0;\n    height: 1px;\n    color: #e5e5e5;\n}\n.vc-picker-indicator[data-v-7f7de245]:before {\n    top: 0;\n    border-top: 1px solid #e5e5e5;\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    -webkit-transform: scaleY(0.5);\n    transform: scaleY(0.5);\n}\n.vc-picker-indicator[data-v-7f7de245]:after {\n    bottom: 0;\n    border-bottom: 1px solid #e5e5e5;\n    -webkit-transform-origin: 0 100%;\n    transform-origin: 0 100%;\n    -webkit-transform: scaleY(0.5);\n    transform: scaleY(0.5);\n}\n.vc-picker-content[data-v-7f7de245] {\n  z-index: 1;\n  top: 0;\n}\n.vc-picker-item[data-v-7f7de245] {\n  padding: 0;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  color: #000;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.vc-picker-indicator[data-v-7f7de245],\n.vc-picker-mask[data-v-7f7de245],\n.vc-picker-content[data-v-7f7de245] {\n  position: absolute;\n  left: 0;\n  width: 100%;\n}\n.vc-picker-slot-divider[data-v-7f7de245] {\n  -webkit-transform: translateY(106px);\n          transform: translateY(106px);\n}\n", ""]);

// exports


/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

const version = '0.0.2'
const install = function (Vue, config = {}) {
  if (install.installed) return
  Vue.use(__webpack_require__(3))
  __webpack_require__(158)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

/* harmony default export */ __webpack_exports__["default"] = ({
  install,
  version
});


/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vc_popup_base__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vc_popup_base___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vc_popup_base__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_vue__ = __webpack_require__(159);



var popUpConfig = {
}

var defaultConfig = {
  autoSetOrthocenter: true,
  position: 'domRelative'
}

/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_0_vc_popup_base__["popupRegister"])('picker', __WEBPACK_IMPORTED_MODULE_1__index_vue__["a" /* default */], popUpConfig, defaultConfig));


/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3e3388f5_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__ = __webpack_require__(163);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(160)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3e3388f5"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3e3388f5_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\popup-picker\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e3388f5", Component.options)
  } else {
    hotAPI.reload("data-v-3e3388f5", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _draggable=__webpack_require__(17),_draggable2=_interopRequireDefault(_draggable),_css3transform=__webpack_require__(18),_css3transform2=_interopRequireDefault(_css3transform),_emitter=__webpack_require__(19),_emitter2=_interopRequireDefault(_emitter);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default={name:'vc-picker-slot',mixins:[_emitter2.default],props:{values:{type:Array,default:function _default(){return[]}},value:{},labelKey:String,defaultIndex:{type:Number,default:0},divider:{type:Boolean,default:!1},showItemNum:Number,showItemHeight:Number,content:{}},created:function created(){this.dragState={}},data:function data(){return{currentValue:this.value,mutatingValues:this.values}},computed:{minTranslateY:function minTranslateY(){return this.showItemHeight*(Math.ceil(this.showItemNum/2)-this.mutatingValues.length)},maxTranslateY:function maxTranslateY(){return this.showItemHeight*Math.floor(this.showItemNum/2)},valueIndex:function valueIndex(){var a=this.labelKey;if(this.currentValue instanceof Object){for(var b=0,c=this.mutatingValues.length;b<c;b++)if(this.currentValue[a]===this.mutatingValues[b][a])return b;return-1}return this.mutatingValues.indexOf(this.currentValue)}},mounted:function mounted(){var a=this;if(this.ready=!0,this.currentValue=this.value,this.$emit('input',this.currentValue),!this.divider){var b=this.$refs.listWrapper,c=this.$refs.indicator,d=this.$refs.mask;(0,_css3transform2.default)(b,!0),c.style.top=(this.showItemHeight*this.showItemNum-34)/2+'px',d.style.backgroundSize='100% '+this.showItemHeight*(this.showItemNum-1)/2+'px',this.doOnValueChange(),(0,_draggable2.default)(this.$el,{start:function start(c){var d=a.dragState;d.start=new Date,d.startPositionY=c.clientY,d.startTranslateY=b.translateY,b.style.transition=null},drag:function drag(c){var d=a.dragState,e=c.clientY-d.startPositionY;b.translateY=d.startTranslateY+e,d.currentPosifionY=c.clientY,d.currentTranslateY=b.translateY,d.velocityTranslate=d.currentTranslateY-d.prevTranslateY,d.prevTranslateY=d.currentTranslateY},end:function end(d){var e,f,g=a.dragState,h=b.translateY,i=new Date-g.start,j=Math.abs(g.startTranslateY-h);6>j&&(e=c.getBoundingClientRect(),f=Math.floor((d.clientY-e.top)/a.showItemHeight)*a.showItemHeight,f>a.maxTranslateY&&(f=a.maxTranslateY),g.velocityTranslate=0,h-=f);var k;300>i&&(k=h+g.velocityTranslate*7),b.style.transition='all 200ms ease',a.$nextTick(function(){var c=Math.round,d=void 0;d=k?c(k/a.showItemHeight)*a.showItemHeight:c(h/a.showItemHeight)*a.showItemHeight,d=Math.max(Math.min(d,a.maxTranslateY),a.minTranslateY),b.translateY=d,a.currentValue=a.translate2value(d)}),a.dragState={}}})}},methods:{value2translate:function value2translate(){var a=this.valueIndex,b=Math.floor(this.showItemNum/2);if(-1!==a)return(a-b)*-this.showItemHeight},translate2value:function translate2value(a){var b=Math.floor;a=b(a/this.showItemHeight)*this.showItemHeight;var c=-(a-b(this.showItemNum/2)*this.showItemHeight)/this.showItemHeight;return this.mutatingValues[c]},doOnValueChange:function doOnValueChange(a){var b=a||this.currentValue,c=this.$refs.listWrapper;this.divider||(c.translateY=this.value2translate(b))},nearby:function nearby(a,b){var c,d,e,f=Math.abs;if(!1!==Array.isArray(b))return(d=0,'number'==typeof a)?(c=f(b[0]-a),b.forEach(function(b,g){e=f(b-a),e<c&&(d=g,c=e)}),b[d]):a instanceof Object&&'number'==typeof a.value?(c=f(b[0].value-a.value),b.forEach(function(b,g){e=f(b.value-a.value),e<c&&(d=g,c=e)}),b[d]):b[0]}},watch:{values:function values(a){this.mutatingValues=a},mutatingValues:function mutatingValues(a){-1===this.valueIndex&&(this.currentValue=this.nearby(this.currentValue,a))},currentValue:function currentValue(a){this.doOnValueChange(),this.$emit('input',a),this.dispatch('vc-picker-view','slotValueChange',this)}}};

/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(161);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("b152a5c6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e3388f5\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"minimize\":false,\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e3388f5\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vc-picker[data-v-3e3388f5] {\n  will-change: opacity, transform;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100vw;\n  height: auto;\n  -webkit-transition: all 250ms ease 0s;\n  transition: all 250ms ease 0s;\n  border-top: 1px solid #e3e3e3;\n}\n.vc-picker.inital[data-v-3e3388f5] {\n    opacity: 0.3;\n    -webkit-transform: translateY(100%) translateZ(0);\n            transform: translateY(100%) translateZ(0);\n}\n.vc-picker.inAnimation[data-v-3e3388f5] {\n    opacity: 1;\n    -webkit-transform: translateY(0%) translateZ(0);\n            transform: translateY(0%) translateZ(0);\n}\n.vc-picker.outAnimation[data-v-3e3388f5] {\n    opacity: 0;\n    -webkit-transform: translateY(100%) translateZ(0);\n            transform: translateY(100%) translateZ(0);\n    -webkit-transition-duration: 280ms;\n            transition-duration: 280ms;\n}\n.vc-picker-head[data-v-3e3388f5] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 9px 15px;\n  background-color: #fff;\n  position: relative;\n  text-align: center;\n  font-size: 17px;\n}\n.vc-picker-head[data-v-3e3388f5]:after {\n    content: \" \";\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    height: 1px;\n    border-bottom: 1px solid #e5e5e5;\n    color: #e5e5e5;\n    -webkit-transform-origin: 0 100%;\n    transform-origin: 0 100%;\n    -webkit-transform: scaleY(0.5);\n    transform: scaleY(0.5);\n}\n.vc-picker-action[data-v-3e3388f5] {\n  display: block;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n      flex: 1;\n  color: #1aad19;\n}\n.vc-picker-action[data-v-3e3388f5]:first-child {\n    text-align: left;\n    color: #888;\n}\n.vc-picker-action.noExpand[data-v-3e3388f5] {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    padding: 0 5px;\n    -webkit-transition: all 40ms linear 0ms;\n    transition: all 40ms linear 0ms;\n}\n.vc-picker-action.noExpand[data-v-3e3388f5]:active {\n      background: #ececec;\n}\n", ""]);

// exports


/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});var _pickerView=__webpack_require__(8),_pickerView2=_interopRequireDefault(_pickerView);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var fixZero=function(a){return 10>a&&(a='0'+a),a};exports.default={name:'vc-picker',props:{slots:Array,showItemNum:Number,showItemHeight:Number,defaultValues:Array,valueKey:String,onChange:Function,confirmText:{type:String,default:'\u786E\u5B9A'},cancelText:{type:String,default:'\u53D6\u6D88'},onConfirm:Function,onCancel:Function},components:{VcPickerView:_pickerView2.default},created:function created(){var a=this;this.event={beforeEnter:function beforeEnter(){var b=a.$el;b.classList.add('inital'),requestAnimationFrame(function(){var a=this;setTimeout(function(){b.classList.remove('inital'),b.classList.add('inAnimation'),a.onOpen instanceof Function&&a.onOpen()},50)}.bind(a))},beforeLeave:function beforeLeave(){var b=a.$el;b.classList.add('outAnimation'),requestAnimationFrame(function(){b.classList.remove('inAnimation'),this.onClose instanceof Function&&this.onClose()}.bind(a))}}},methods:{_cancel:function _cancel(){this.onCancel instanceof Function&&this.onCancel(this.$refs.picker),this._controller.close()},_confirm:function _confirm(){this.onConfirm instanceof Function&&this.onConfirm(this.$refs.picker),this._controller.close()}}};

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "vc-picker" },
    [
      _c("div", { staticClass: "vc-picker-head" }, [
        _c("a", {
          staticClass: "vc-picker-action noExpand",
          domProps: { textContent: _vm._s(_vm.cancelText) },
          on: { click: _vm._cancel }
        }),
        _vm._v(" "),
        _c("a", { staticClass: "vc-picker-action" }),
        _vm._v(" "),
        _c("a", {
          staticClass: "vc-picker-action noExpand",
          domProps: { textContent: _vm._s(_vm.confirmText) },
          on: { click: _vm._confirm }
        })
      ]),
      _vm._v(" "),
      _c("vc-picker-view", {
        ref: "picker",
        attrs: {
          slots: _vm.slots,
          onChange: _vm.onChange,
          defaultValues: _vm.defaultValues,
          valueKey: _vm.valueKey,
          showItemNum: _vm.showItemNum,
          showItemHeight: _vm.showItemHeight
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3e3388f5", esExports)
  }
}

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);

let isDragging = false
const supportTouch = !__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$isServer && 'ontouchstart' in window

/* harmony default export */ __webpack_exports__["default"] = (function (element, options) {
  const moveFn = function (event) {
    if (options.drag) {
      options.drag(supportTouch ? event.changedTouches[0] || event.touches[0] : event)
    }
  }

  const endFn = function (event) {
    if (!supportTouch) {
      document.removeEventListener('mousemove', moveFn)
      document.removeEventListener('mouseup', endFn)
    }
    document.onselectstart = null
    document.ondragstart = null

    isDragging = false

    if (options.end) {
      options.end(supportTouch ? event.changedTouches[0] || event.touches[0] : event)
    }
  }

  element.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function (event) {
    if (isDragging) return
    event.preventDefault()
    document.onselectstart = function () { return false }
    document.ondragstart = function () { return false }

    if (!supportTouch) {
      document.addEventListener('mousemove', moveFn)
      document.addEventListener('mouseup', endFn)
    }
    isDragging = true

    if (options.start) {
      options.start(supportTouch ? event.changedTouches[0] || event.touches[0] : event)
    }
  })

  if (supportTouch) {
    element.addEventListener('touchmove', moveFn)
    element.addEventListener('touchend', endFn)
    element.addEventListener('touchcancel', endFn)
  }
});;


/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

﻿/* transformjs 1.1.6
 * By dntzhang
 * Github: https://github.com/AlloyTeam/AlloyTouch/tree/master/transformjs
 */
; (function () {

    var DEG_TO_RAD =  0.017453292519943295;

    var Matrix3D = function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        this.elements = window.Float32Array ? new Float32Array(16) : [];
        var te = this.elements;
        te[0] = (n11 !== undefined) ? n11 : 1; te[4] = n12 || 0; te[8] = n13 || 0; te[12] = n14 || 0;
        te[1] = n21 || 0; te[5] = (n22 !== undefined) ? n22 : 1; te[9] = n23 || 0; te[13] = n24 || 0;
        te[2] = n31 || 0; te[6] = n32 || 0; te[10] = (n33 !== undefined) ? n33 : 1; te[14] = n34 || 0;
        te[3] = n41 || 0; te[7] = n42 || 0; te[11] = n43 || 0; te[15] = (n44 !== undefined) ? n44 : 1;
    };


    Matrix3D.prototype = {
        set: function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
            var te = this.elements;
            te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
            te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
            te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
            te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;
            return this;
        },
        identity: function () {
            this.set(
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );
            return this;
        },
        multiplyMatrices: function (a, be) {

            var ae = a.elements;
            var te = this.elements;
            var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
            var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
            var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
            var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

            var b11 = be[0], b12 = be[1], b13 = be[2], b14 = be[3];
            var b21 = be[4], b22 = be[5], b23 = be[6], b24 = be[7];
            var b31 = be[8], b32 = be[9], b33 = be[10], b34 = be[11];
            var b41 = be[12], b42 = be[13], b43 = be[14], b44 = be[15];

            te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
            te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
            te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
            te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

            te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
            te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
            te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
            te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

            te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
            te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
            te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
            te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

            te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
            te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
            te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
            te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

            return this;

        },
        // 解决角度为90的整数倍导致Math.cos得到极小的数，其实是0。导致不渲染
        _rounded: function (value, i) {
            i = Math.pow(10, i || 15);
            // default
            return Math.round(value * i) / i;
        },
        _arrayWrap: function (arr) {
            return window.Float32Array ? new Float32Array(arr) : arr;
        },
        appendTransform: function (x, y, z, scaleX, scaleY, scaleZ, rotateX, rotateY, rotateZ, skewX, skewY, originX, originY, originZ) {

            var rx = rotateX * DEG_TO_RAD;
            var cosx = this._rounded(Math.cos(rx));
            var sinx = this._rounded(Math.sin(rx));
            var ry = rotateY * DEG_TO_RAD;
            var cosy = this._rounded(Math.cos(ry));
            var siny = this._rounded(Math.sin(ry));
            var rz = rotateZ * DEG_TO_RAD;
            var cosz = this._rounded(Math.cos(rz * -1));
            var sinz = this._rounded(Math.sin(rz * -1));

            this.multiplyMatrices(this, this._arrayWrap([
                1, 0, 0, x,
                0, cosx, sinx, y,
                0, -sinx, cosx, z,
                0, 0, 0, 1
            ]));

            this.multiplyMatrices(this, this._arrayWrap([
                cosy, 0, siny, 0,
                0, 1, 0, 0,
                -siny, 0, cosy, 0,
                0, 0, 0, 1
            ]));

            this.multiplyMatrices(this, this._arrayWrap([
                cosz * scaleX, sinz * scaleY, 0, 0,
                -sinz * scaleX, cosz * scaleY, 0, 0,
                0, 0, 1 * scaleZ, 0,
                0, 0, 0, 1
            ]));

            if (skewX || skewY) {
                this.multiplyMatrices(this, this._arrayWrap([
                    this._rounded(Math.cos(skewX * DEG_TO_RAD)), this._rounded(Math.sin(skewX * DEG_TO_RAD)), 0, 0,
                    -1 * this._rounded(Math.sin(skewY * DEG_TO_RAD)), this._rounded(Math.cos(skewY * DEG_TO_RAD)), 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ]));
            }


            if (originX || originY || originZ) {
                this.elements[12] -= originX * this.elements[0] + originY * this.elements[4] + originZ * this.elements[8];
                this.elements[13] -= originX * this.elements[1] + originY * this.elements[5] + originZ * this.elements[9];
                this.elements[14] -= originX * this.elements[2] + originY * this.elements[6] + originZ * this.elements[10];
            }
            return this;
        }
    };

    var Matrix2D = function(a, b, c, d, tx, ty) {
        this.a = a == null ? 1 : a;
        this.b = b || 0;
        this.c = c || 0;
        this.d = d == null ? 1 : d;
        this.tx = tx || 0;
        this.ty = ty || 0;
        return this;
    };

    Matrix2D.prototype = {
        identity : function() {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
            return this;
        },
        appendTransform : function(x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY) {
            if (rotation % 360) {
                var r = rotation * DEG_TO_RAD;
                var cos = Math.cos(r);
                var sin = Math.sin(r);
            } else {
                cos = 1;
                sin = 0;
            }
            if (skewX || skewY) {
                skewX *= DEG_TO_RAD;
                skewY *= DEG_TO_RAD;
                this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
                this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
            } else {
                this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
            }
            if (originX || originY) {
                this.tx -= originX * this.a + originY * this.c;
                this.ty -= originX * this.b + originY * this.d;
            }
            return this;
        },
        append : function(a, b, c, d, tx, ty) {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            this.a = a * a1 + b * c1;
            this.b = a * b1 + b * d1;
            this.c = c * a1 + d * c1;
            this.d = c * b1 + d * d1;
            this.tx = tx * a1 + ty * c1 + this.tx;
            this.ty = tx * b1 + ty * d1 + this.ty;
            return this;
        },
        initialize : function(a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
            return this;
        },
        setValues : function(a, b, c, d, tx, ty) {
            this.a = a == null ? 1 : a;
            this.b = b || 0;
            this.c = c || 0;
            this.d = d == null ? 1 : d;
            this.tx = tx || 0;
            this.ty = ty || 0;
            return this;
        },
        copy : function(matrix) {
            return this.setValues(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
        }
    };

    function observe(target, props, callback) {
        for (var i = 0, len = props.length; i < len; i++) {
            var prop = props[i];
            watch(target, prop, callback);
        }
    }

    function watch(target, prop, callback) {
        Object.defineProperty(target, prop, {
            get: function () {
                return this["_" + prop];
            },
            set: function (value) {
                this["_" + prop] = value;
                callback();
            }
        });
    }

    function isElement(o) {
        return (
            typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
        );
    }

    function Transform(obj, notPerspective) {
        if(obj.___mixCSS3Transform) return;
        var observeProps = ["translateX", "translateY", "translateZ", "scaleX", "scaleY", "scaleZ", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "originX", "originY", "originZ"],
            objIsElement = isElement(obj);
        if (!notPerspective) {
            observeProps.push("perspective");
        }
        obj.___mixCSS3Transform = true
        observe(
            obj,
            observeProps,
            function () {
                var mtx = obj.matrix3d.identity().appendTransform(obj.translateX, obj.translateY, obj.translateZ, obj.scaleX, obj.scaleY, obj.scaleZ, obj.rotateX, obj.rotateY, obj.rotateZ, obj.skewX, obj.skewY, obj.originX, obj.originY, obj.originZ);
                var transform = (notPerspective ? "" : "perspective(" + obj.perspective + "px) ") + "matrix3d(" + Array.prototype.slice.call(mtx.elements).join(",") + ")";
                if (objIsElement) {
                    obj.style.transform = obj.style.msTransform = obj.style.OTransform = obj.style.MozTransform = obj.style.webkitTransform = transform;
                } else {
                    obj.transform = transform;
                }
            });

        obj.matrix3d = new Matrix3D();
        if (!notPerspective) {
            obj.perspective = 500;
        }
        obj.scaleX = obj.scaleY = obj.scaleZ = 1;
        //由于image自带了x\y\z，所有加上translate前缀
        obj.translateX = obj.translateY = obj.translateZ = obj.rotateX = obj.rotateY = obj.rotateZ = obj.skewX = obj.skewY = obj.originX = obj.originY = obj.originZ = 0;
    }

    Transform.getMatrix3D = function (option) {
        var defaultOption = {
            translateX: 0,
            translateY: 0,
            translateZ: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            skewX: 0,
            skewY: 0,
            originX: 0,
            originY: 0,
            originZ: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1
        };
        for (var key in option) {
            if (option.hasOwnProperty(key)) {
                defaultOption[key] = option[key];
            }
        }
        return new Matrix3D().identity().appendTransform(defaultOption.translateX, defaultOption.translateY, defaultOption.translateZ, defaultOption.scaleX, defaultOption.scaleY, defaultOption.scaleZ, defaultOption.rotateX, defaultOption.rotateY, defaultOption.rotateZ, defaultOption.skewX, defaultOption.skewY, defaultOption.originX, defaultOption.originY, defaultOption.originZ).elements;

    }

    Transform.getMatrix2D = function(option){
        var defaultOption = {
            translateX: 0,
            translateY: 0,
            rotation: 0,
            skewX: 0,
            skewY: 0,
            originX: 0,
            originY: 0,
            scaleX: 1,
            scaleY: 1
        };
        for (var key in option) {
            if (option.hasOwnProperty(key)) {
                defaultOption[key] = option[key];
            }
        }
        return new Matrix2D().identity().appendTransform(defaultOption.translateX, defaultOption.translateY, defaultOption.scaleX, defaultOption.scaleY, defaultOption.rotation, defaultOption.skewX, defaultOption.skewY, defaultOption.originX, defaultOption.originY);
    }

    if (true) {
        module.exports = Transform;
    }else {
        window.Transform = Transform;
    }
})();

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.name

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params))
    }
  })
}

/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    dispatch (componentName, eventName, params) {
      let parent = this.$parent
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast (componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
});


/***/ }),

/***/ 2:
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

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.divider
    ? _c("div", { staticClass: "vc-picker-group" }, [
        _c("div", { ref: "mask", staticClass: "vc-picker-mask" }),
        _vm._v(" "),
        _c("div", { ref: "indicator", staticClass: "vc-picker-indicator" }),
        _vm._v(" "),
        _c(
          "div",
          { ref: "listWrapper", staticClass: "vc-picker-content" },
          _vm._l(_vm.mutatingValues, function(item, key, index) {
            return _c(
              "div",
              {
                key: key,
                staticClass: "vc-picker-item",
                class: {
                  "vc-picker-item_disabled":
                    typeof item === "object" && item["disabled"]
                }
              },
              [
                _vm._v(
                  _vm._s(
                    typeof item === "object" && item[_vm.labelKey]
                      ? item[_vm.labelKey]
                      : item
                  )
                )
              ]
            )
          })
        )
      ])
    : _c("div", {
        staticClass: "vc-picker-slot-divider",
        domProps: { innerHTML: _vm._s(_vm.content) }
      })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7f7de245", esExports)
  }
}

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { ref: "body", staticClass: "vc-picker-body" },
    _vm._l(_vm.slots, function(slot, key, index) {
      return _c("vc-picker-slot", {
        key: key,
        attrs: {
          values: slot.values || [],
          labelKey: slot.labelKey,
          divider: slot.divider,
          showItemNum: _vm.showItemNum,
          showItemHeight: _vm.showItemHeight,
          content: slot.content
        },
        model: {
          value: _vm.values[slot.valueIndex],
          callback: function($$v) {
            _vm.$set(_vm.values, slot.valueIndex, $$v)
          },
          expression: "values[slot.valueIndex]"
        }
      })
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-42554e8c", esExports)
  }
}

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),

/***/ 4:
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

/***/ 5:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_vue__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__index_vue__["a"]; });



/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_42554e8c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__ = __webpack_require__(21);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(10)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-42554e8c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_42554e8c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\picker-view\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-42554e8c", Component.options)
  } else {
    hotAPI.reload("data-v-42554e8c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=index.js.map