var example =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 182);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(34);
var toPrimitive = __webpack_require__(26);
var dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(68);
var defined = __webpack_require__(17);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(24)('wks');
var uid = __webpack_require__(15);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var ctx = __webpack_require__(30);
var hide = __webpack_require__(8);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(2);
var createDesc = __webpack_require__(12);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(11);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(40);
var enumBugKeys = __webpack_require__(18);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(9);
var dPs = __webpack_require__(74);
var enumBugKeys = __webpack_require__(18);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(33)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(67).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(2).f;
var has = __webpack_require__(4);
var TAG = __webpack_require__(6)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(24)('keys');
var uid = __webpack_require__(15);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(11);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(19);
var wksExt = __webpack_require__(28);
var defineProperty = __webpack_require__(2).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(6);


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(63);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(17);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(56);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(55);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(11);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(10)(function () {
  return Object.defineProperty(__webpack_require__(33)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(19);
var $export = __webpack_require__(7);
var redefine = __webpack_require__(41);
var hide = __webpack_require__(8);
var has = __webpack_require__(4);
var Iterators = __webpack_require__(16);
var $iterCreate = __webpack_require__(70);
var setToStringTag = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(39);
var ITERATOR = __webpack_require__(6)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(21);
var createDesc = __webpack_require__(12);
var toIObject = __webpack_require__(5);
var toPrimitive = __webpack_require__(26);
var has = __webpack_require__(4);
var IE8_DOM_DEFINE = __webpack_require__(34);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(40);
var hiddenKeys = __webpack_require__(18).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(4);
var toObject = __webpack_require__(31);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(4);
var toIObject = __webpack_require__(5);
var arrayIndexOf = __webpack_require__(65)(false);
var IE_PROTO = __webpack_require__(23)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(59), __esModule: true };

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(53);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(54);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(52);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(25);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(78)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(35)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = ReactHighcharts;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactPrism = __webpack_require__(96);

exports.default = function (_ref) {
  var name = _ref.name,
      children = _ref.children;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "pre",
      null,
      React.createElement(
        _reactPrism.PrismCode,
        { className: "language-jsx" },
        children
      )
    ),
    React.createElement(
      "a",
      { href: "https://github.com/whawker/react-jsx-highcharts/blob/gh-pages/examples/" + name + "/App.js", className: "btn btn-link" },
      "See full example code"
    )
  );
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(81);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
__webpack_require__(85);
__webpack_require__(87);
__webpack_require__(88);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
__webpack_require__(89);
module.exports = __webpack_require__(28).f('iterator');


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(5);
var toLength = __webpack_require__(48);
var toAbsoluteIndex = __webpack_require__(79);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(14);
var gOPS = __webpack_require__(38);
var pIE = __webpack_require__(21);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(29);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(29);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(20);
var descriptor = __webpack_require__(12);
var setToStringTag = __webpack_require__(22);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(8)(IteratorPrototype, __webpack_require__(6)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(14);
var toIObject = __webpack_require__(5);
module.exports = function (object, el) {
  var O = toIObject(object);
  var keys = getKeys(O);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) if (O[key = keys[index++]] === el) return key;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(15)('meta');
var isObject = __webpack_require__(11);
var has = __webpack_require__(4);
var setDesc = __webpack_require__(2).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(10)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(2);
var anObject = __webpack_require__(9);
var getKeys = __webpack_require__(14);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(5);
var gOPN = __webpack_require__(37).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(7);
var core = __webpack_require__(0);
var fails = __webpack_require__(10);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(11);
var anObject = __webpack_require__(9);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(30)(Function.call, __webpack_require__(36).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var defined = __webpack_require__(17);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(64);
var step = __webpack_require__(71);
var Iterators = __webpack_require__(16);
var toIObject = __webpack_require__(5);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(35)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(20) });


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', { defineProperty: __webpack_require__(2).f });


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(31);
var $getPrototypeOf = __webpack_require__(39);

__webpack_require__(76)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(7);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(77).set });


/***/ }),
/* 85 */
/***/ (function(module, exports) {



/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(4);
var DESCRIPTORS = __webpack_require__(3);
var $export = __webpack_require__(7);
var redefine = __webpack_require__(41);
var META = __webpack_require__(73).KEY;
var $fails = __webpack_require__(10);
var shared = __webpack_require__(24);
var setToStringTag = __webpack_require__(22);
var uid = __webpack_require__(15);
var wks = __webpack_require__(6);
var wksExt = __webpack_require__(28);
var wksDefine = __webpack_require__(27);
var keyOf = __webpack_require__(72);
var enumKeys = __webpack_require__(66);
var isArray = __webpack_require__(69);
var anObject = __webpack_require__(9);
var toIObject = __webpack_require__(5);
var toPrimitive = __webpack_require__(26);
var createDesc = __webpack_require__(12);
var _create = __webpack_require__(20);
var gOPNExt = __webpack_require__(75);
var $GOPD = __webpack_require__(36);
var $DP = __webpack_require__(2);
var $keys = __webpack_require__(14);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(21).f = $propertyIsEnumerable;
  __webpack_require__(38).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(19)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key) {
    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(8)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('asyncIterator');


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('observable');


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
var global = __webpack_require__(1);
var hide = __webpack_require__(8);
var Iterators = __webpack_require__(16);
var TO_STRING_TAG = __webpack_require__(6)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(90);
var invariant = __webpack_require__(91);
var ReactPropTypesSecret = __webpack_require__(94);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(92)();
}


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(13);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(93);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global Prism */

var PrismCode = function (_PureComponent) {
  _inherits(PrismCode, _PureComponent);

  function PrismCode() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PrismCode);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PrismCode.__proto__ || Object.getPrototypeOf(PrismCode)).call.apply(_ref, [this].concat(args))), _this), _this._handleRefMount = function (domNode) {
      _this._domNode = domNode;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PrismCode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._hightlight();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._hightlight();
    }
  }, {
    key: "_hightlight",
    value: function _hightlight() {
      Prism.highlightElement(this._domNode, this.props.async);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          Wrapper = _props.component,
          children = _props.children;


      return _react2.default.createElement(
        Wrapper,
        {
          ref: this._handleRefMount,
          className: className
        },
        children
      );
    }
  }]);

  return PrismCode;
}(_react.PureComponent);

PrismCode.propTypes = {
  async: _propTypes.PropTypes.bool,
  className: _propTypes.PropTypes.string,
  children: _propTypes.PropTypes.any,
  component: _propTypes.PropTypes.node
};
PrismCode.defaultProps = {
  component: "code"
};
exports.default = PrismCode;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PrismCode = __webpack_require__(95);

Object.defineProperty(exports, "PrismCode", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PrismCode).default;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PrismCode).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(43);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(44);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(45);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(47);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(46);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(13);

var _react2 = _interopRequireDefault(_react);

var _reactJsxHighcharts = __webpack_require__(50);

var _ExampleCode = __webpack_require__(51);

var _ExampleCode2 = _interopRequireDefault(_ExampleCode);

var _exampleCode = __webpack_require__(181);

var _exampleCode2 = _interopRequireDefault(_exampleCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = {
    'South-East Asia': {
        'Sri Lanka': {
            'Communicable & other Group I': '75.5',
            'Injuries': '89.0',
            'Noncommunicable diseases': '501.2'
        },
        'Bangladesh': {
            'Noncommunicable diseases': '548.9',
            'Injuries': '64.0',
            'Communicable & other Group I': '234.6'
        },
        'Myanmar': {
            'Communicable & other Group I': '316.4',
            'Injuries': '102.0',
            'Noncommunicable diseases': '708.7'
        },
        'Maldives': {
            'Injuries': '35.0',
            'Noncommunicable diseases': '487.2',
            'Communicable & other Group I': '59.2'
        },
        'Democratic People\'s Republic of Korea': {
            'Injuries': '91.9',
            'Noncommunicable diseases': '751.4',
            'Communicable & other Group I': '117.3'
        },
        'Bhutan': {
            'Injuries': '142.2',
            'Noncommunicable diseases': '572.8',
            'Communicable & other Group I': '186.9'
        },
        'Thailand': {
            'Injuries': '72.8',
            'Communicable & other Group I': '123.3',
            'Noncommunicable diseases': '449.1'
        },
        'Nepal': {
            'Noncommunicable diseases': '678.1',
            'Injuries': '88.7',
            'Communicable & other Group I': '251.8'
        },
        'Timor-Leste': {
            'Injuries': '69.2',
            'Noncommunicable diseases': '670.5',
            'Communicable & other Group I': '343.5'
        },
        'India': {
            'Communicable & other Group I': '253.0',
            'Injuries': '115.9',
            'Noncommunicable diseases': '682.3'
        },
        'Indonesia': {
            'Injuries': '49.3',
            'Noncommunicable diseases': '680.1',
            'Communicable & other Group I': '162.4'
        }
    },
    'Europe': {
        'Hungary': {
            'Communicable & other Group I': '16.8',
            'Noncommunicable diseases': '602.8',
            'Injuries': '44.3'
        },
        'Poland': {
            'Communicable & other Group I': '22.6',
            'Noncommunicable diseases': '494.5',
            'Injuries': '48.9'
        },
        'Israel': {
            'Communicable & other Group I': '31.2',
            'Noncommunicable diseases': '311.2',
            'Injuries': '20.8'
        },
        'France': {
            'Communicable & other Group I': '21.4',
            'Noncommunicable diseases': '313.2',
            'Injuries': '34.6'
        },
        'Turkey': {
            'Injuries': '39.1',
            'Communicable & other Group I': '43.9',
            'Noncommunicable diseases': '555.2'
        },
        'Kyrgyzstan': {
            'Communicable & other Group I': '65.8',
            'Injuries': '65.1',
            'Noncommunicable diseases': '835.4'
        },
        'Croatia': {
            'Communicable & other Group I': '12.2',
            'Noncommunicable diseases': '495.8',
            'Injuries': '40.1'
        },
        'Portugal': {
            'Injuries': '25.2',
            'Communicable & other Group I': '39.9',
            'Noncommunicable diseases': '343.3'
        },
        'Greece': {
            'Injuries': '26.5',
            'Noncommunicable diseases': '365.0',
            'Communicable & other Group I': '24.1'
        },
        'Italy': {
            'Injuries': '20.1',
            'Communicable & other Group I': '15.5',
            'Noncommunicable diseases': '303.6'
        },
        'Belgium': {
            'Communicable & other Group I': '27.8',
            'Injuries': '38.9',
            'Noncommunicable diseases': '356.8'
        },
        'Lithuania': {
            'Noncommunicable diseases': '580.6',
            'Communicable & other Group I': '25.5',
            'Injuries': '76.4'
        },
        'Uzbekistan': {
            'Communicable & other Group I': '85.8',
            'Injuries': '47.4',
            'Noncommunicable diseases': '810.9'
        },
        'Serbia': {
            'Communicable & other Group I': '19.4',
            'Injuries': '32.0',
            'Noncommunicable diseases': '657.7'
        },
        'Austria': {
            'Noncommunicable diseases': '359.5',
            'Injuries': '30.6',
            'Communicable & other Group I': '12.6'
        },
        'Bosnia and Herzegovina': {
            'Injuries': '42.4',
            'Noncommunicable diseases': '512.5',
            'Communicable & other Group I': '20.0'
        },
        'Slovakia': {
            'Injuries': '39.1',
            'Communicable & other Group I': '35.3',
            'Noncommunicable diseases': '532.5'
        },
        'The former Yugoslav republic of Macedonia': {
            'Injuries': '24.0',
            'Communicable & other Group I': '16.9',
            'Noncommunicable diseases': '636.5'
        },
        'Sweden': {
            'Communicable & other Group I': '19.3',
            'Noncommunicable diseases': '333.5',
            'Injuries': '26.1'
        },
        'Russian Federation': {
            'Noncommunicable diseases': '790.3',
            'Communicable & other Group I': '73.8',
            'Injuries': '102.8'
        },
        'Republic of Moldova': {
            'Noncommunicable diseases': '787.6',
            'Injuries': '75.7',
            'Communicable & other Group I': '44.5'
        },
        'Ireland': {
            'Injuries': '31.8',
            'Communicable & other Group I': '21.5',
            'Noncommunicable diseases': '343.9'
        },
        'Estonia': {
            'Injuries': '47.0',
            'Communicable & other Group I': '18.5',
            'Noncommunicable diseases': '510.7'
        },
        'Cyprus': {
            'Noncommunicable diseases': '333.0',
            'Injuries': '26.6',
            'Communicable & other Group I': '16.2'
        },
        'Kazakhstan': {
            'Noncommunicable diseases': '949.7',
            'Injuries': '101.6',
            'Communicable & other Group I': '55.3'
        },
        'Netherlands': {
            'Noncommunicable diseases': '355.2',
            'Injuries': '22.3',
            'Communicable & other Group I': '25.5'
        },
        'Finland': {
            'Noncommunicable diseases': '366.6',
            'Injuries': '38.7',
            'Communicable & other Group I': '9.0'
        },
        'Romania': {
            'Noncommunicable diseases': '612.2',
            'Injuries': '40.7',
            'Communicable & other Group I': '38.5'
        },
        'Albania': {
            'Noncommunicable diseases': '671.6',
            'Injuries': '48.0',
            'Communicable & other Group I': '46.5'
        },
        'Iceland': {
            'Injuries': '29.0',
            'Noncommunicable diseases': '311.7',
            'Communicable & other Group I': '14.0'
        },
        'Azerbaijan': {
            'Noncommunicable diseases': '664.3',
            'Injuries': '33.6',
            'Communicable & other Group I': '70.8'
        },
        'Tajikistan': {
            'Injuries': '51.6',
            'Communicable & other Group I': '147.7',
            'Noncommunicable diseases': '752.6'
        },
        'Bulgaria': {
            'Communicable & other Group I': '33.4',
            'Injuries': '36.4',
            'Noncommunicable diseases': '638.2'
        },
        'United Kingdom of Great Britain and Northern Ireland': {
            'Communicable & other Group I': '28.5',
            'Injuries': '21.5',
            'Noncommunicable diseases': '358.8'
        },
        'Spain': {
            'Communicable & other Group I': '19.1',
            'Injuries': '17.8',
            'Noncommunicable diseases': '323.1'
        },
        'Ukraine': {
            'Communicable & other Group I': '69.3',
            'Injuries': '67.3',
            'Noncommunicable diseases': '749.0'
        },
        'Norway': {
            'Noncommunicable diseases': '336.6',
            'Communicable & other Group I': '25.2',
            'Injuries': '25.6'
        },
        'Denmark': {
            'Injuries': '22.5',
            'Communicable & other Group I': '29.5',
            'Noncommunicable diseases': '406.1'
        },
        'Belarus': {
            'Noncommunicable diseases': '682.5',
            'Communicable & other Group I': '28.3',
            'Injuries': '91.3'
        },
        'Malta': {
            'Noncommunicable diseases': '364.5',
            'Injuries': '19.0',
            'Communicable & other Group I': '23.6'
        },
        'Latvia': {
            'Noncommunicable diseases': '623.7',
            'Injuries': '54.5',
            'Communicable & other Group I': '26.0'
        },
        'Turkmenistan': {
            'Injuries': '93.0',
            'Communicable & other Group I': '115.8',
            'Noncommunicable diseases': '1025.1'
        },
        'Switzerland': {
            'Communicable & other Group I': '14.5',
            'Noncommunicable diseases': '291.6',
            'Injuries': '25.4'
        },
        'Luxembourg': {
            'Injuries': '31.1',
            'Noncommunicable diseases': '317.8',
            'Communicable & other Group I': '20.5'
        },
        'Georgia': {
            'Injuries': '32.2',
            'Communicable & other Group I': '39.3',
            'Noncommunicable diseases': '615.2'
        },
        'Slovenia': {
            'Noncommunicable diseases': '369.2',
            'Communicable & other Group I': '15.4',
            'Injuries': '44.2'
        },
        'Montenegro': {
            'Communicable & other Group I': '18.7',
            'Noncommunicable diseases': '571.5',
            'Injuries': '41.2'
        },
        'Armenia': {
            'Noncommunicable diseases': '847.5',
            'Communicable & other Group I': '45.0',
            'Injuries': '49.2'
        },
        'Germany': {
            'Injuries': '23.0',
            'Communicable & other Group I': '21.6',
            'Noncommunicable diseases': '365.1'
        },
        'Czech Republic': {
            'Injuries': '39.1',
            'Noncommunicable diseases': '460.7',
            'Communicable & other Group I': '27.0'
        }
    },
    'Africa': {
        'Equatorial Guinea': {
            'Communicable & other Group I': '756.8',
            'Injuries': '133.6',
            'Noncommunicable diseases': '729.0'
        },
        'Madagascar': {
            'Noncommunicable diseases': '648.6',
            'Communicable & other Group I': '429.9',
            'Injuries': '89.0'
        },
        'Swaziland': {
            'Communicable & other Group I': '884.3',
            'Injuries': '119.5',
            'Noncommunicable diseases': '702.4'
        },
        'Congo': {
            'Noncommunicable diseases': '632.3',
            'Communicable & other Group I': '666.9',
            'Injuries': '89.0'
        },
        'Burkina Faso': {
            'Communicable & other Group I': '648.2',
            'Noncommunicable diseases': '784.0',
            'Injuries': '119.3'
        },
        'Guinea-Bissau': {
            'Communicable & other Group I': '869.8',
            'Noncommunicable diseases': '764.7',
            'Injuries': '111.6'
        },
        'Democratic Republic of the Congo': {
            'Noncommunicable diseases': '724.4',
            'Injuries': '137.1',
            'Communicable & other Group I': '920.7'
        },
        'Mozambique': {
            'Injuries': '175.3',
            'Noncommunicable diseases': '593.7',
            'Communicable & other Group I': '998.1'
        },
        'Central African Republic': {
            'Communicable & other Group I': '1212.1',
            'Injuries': '107.9',
            'Noncommunicable diseases': '550.8'
        },
        'United Republic of Tanzania': {
            'Noncommunicable diseases': '569.8',
            'Communicable & other Group I': '584.2',
            'Injuries': '129.2'
        },
        'Cameroon': {
            'Communicable & other Group I': '768.8',
            'Injuries': '106.0',
            'Noncommunicable diseases': '675.2'
        },
        'Togo': {
            'Noncommunicable diseases': '679.0',
            'Communicable & other Group I': '681.8',
            'Injuries': '93.0'
        },
        'Eritrea': {
            'Injuries': '118.7',
            'Communicable & other Group I': '506.0',
            'Noncommunicable diseases': '671.9'
        },
        'Namibia': {
            'Injuries': '76.4',
            'Noncommunicable diseases': '580.2',
            'Communicable & other Group I': '356.6'
        },
        'Senegal': {
            'Noncommunicable diseases': '558.1',
            'Injuries': '89.3',
            'Communicable & other Group I': '587.7'
        },
        'Chad': {
            'Communicable & other Group I': '1070.9',
            'Injuries': '114.5',
            'Noncommunicable diseases': '712.6'
        },
        'Benin': {
            'Injuries': '98.0',
            'Noncommunicable diseases': '761.5',
            'Communicable & other Group I': '577.3'
        },
        'Zimbabwe': {
            'Communicable & other Group I': '711.3',
            'Injuries': '82.5',
            'Noncommunicable diseases': '598.9'
        },
        'Rwanda': {
            'Noncommunicable diseases': '585.3',
            'Injuries': '106.3',
            'Communicable & other Group I': '401.7'
        },
        'Zambia': {
            'Noncommunicable diseases': '587.4',
            'Injuries': '156.4',
            'Communicable & other Group I': '764.3'
        },
        'Mali': {
            'Injuries': '119.5',
            'Communicable & other Group I': '588.3',
            'Noncommunicable diseases': '866.1'
        },
        'Ethiopia': {
            'Injuries': '94.5',
            'Communicable & other Group I': '558.9',
            'Noncommunicable diseases': '476.3'
        },
        'South Africa': {
            'Communicable & other Group I': '611.6',
            'Injuries': '103.5',
            'Noncommunicable diseases': '710.9'
        },
        'Burundi': {
            'Injuries': '146.6',
            'Communicable & other Group I': '704.8',
            'Noncommunicable diseases': '729.5'
        },
        'Cabo Verde': {
            'Injuries': '54.4',
            'Noncommunicable diseases': '482.1',
            'Communicable & other Group I': '141.9'
        },
        'Liberia': {
            'Noncommunicable diseases': '656.9',
            'Injuries': '83.3',
            'Communicable & other Group I': '609.1'
        },
        'Uganda': {
            'Noncommunicable diseases': '664.4',
            'Communicable & other Group I': '696.7',
            'Injuries': '166.8'
        },
        'Mauritius': {
            'Noncommunicable diseases': '576.5',
            'Injuries': '44.1',
            'Communicable & other Group I': '61.8'
        },
        'Algeria': {
            'Noncommunicable diseases': '710.4',
            'Injuries': '53.8',
            'Communicable & other Group I': '97.8'
        },
        'C\xF4te d\'Ivoire': {
            'Noncommunicable diseases': '794.0',
            'Injuries': '124.0',
            'Communicable & other Group I': '861.3'
        },
        'Malawi': {
            'Injuries': '97.7',
            'Communicable & other Group I': '777.6',
            'Noncommunicable diseases': '655.0'
        },
        'Botswana': {
            'Injuries': '87.9',
            'Noncommunicable diseases': '612.2',
            'Communicable & other Group I': '555.3'
        },
        'Guinea': {
            'Injuries': '96.0',
            'Noncommunicable diseases': '681.1',
            'Communicable & other Group I': '679.6'
        },
        'Ghana': {
            'Injuries': '76.1',
            'Noncommunicable diseases': '669.9',
            'Communicable & other Group I': '476.0'
        },
        'Kenya': {
            'Noncommunicable diseases': '514.7',
            'Injuries': '101.1',
            'Communicable & other Group I': '657.5'
        },
        'Gambia': {
            'Noncommunicable diseases': '629.6',
            'Injuries': '96.0',
            'Communicable & other Group I': '590.5'
        },
        'Angola': {
            'Injuries': '137.8',
            'Noncommunicable diseases': '768.4',
            'Communicable & other Group I': '873.3'
        },
        'Sierra Leone': {
            'Communicable & other Group I': '1327.4',
            'Noncommunicable diseases': '963.5',
            'Injuries': '149.5'
        },
        'Mauritania': {
            'Communicable & other Group I': '619.1',
            'Injuries': '83.4',
            'Noncommunicable diseases': '555.1'
        },
        'Comoros': {
            'Communicable & other Group I': '494.6',
            'Injuries': '132.4',
            'Noncommunicable diseases': '695.5'
        },
        'Gabon': {
            'Noncommunicable diseases': '504.6',
            'Injuries': '77.4',
            'Communicable & other Group I': '589.4'
        },
        'Niger': {
            'Injuries': '97.6',
            'Communicable & other Group I': '740.0',
            'Noncommunicable diseases': '649.1'
        },
        'Lesotho': {
            'Communicable & other Group I': '1110.5',
            'Injuries': '142.5',
            'Noncommunicable diseases': '671.8'
        },
        'Nigeria': {
            'Noncommunicable diseases': '673.7',
            'Communicable & other Group I': '866.2',
            'Injuries': '145.6'
        }
    },
    'Americas': {
        'Canada': {
            'Noncommunicable diseases': '318.0',
            'Injuries': '31.3',
            'Communicable & other Group I': '22.6'
        },
        'Bolivia (Plurinational State of)': {
            'Communicable & other Group I': '226.2',
            'Noncommunicable diseases': '635.3',
            'Injuries': '100.0'
        },
        'Haiti': {
            'Communicable & other Group I': '405.4',
            'Noncommunicable diseases': '724.6',
            'Injuries': '89.3'
        },
        'Belize': {
            'Noncommunicable diseases': '470.7',
            'Injuries': '82.0',
            'Communicable & other Group I': '104.6'
        },
        'Suriname': {
            'Injuries': '70.5',
            'Communicable & other Group I': '83.7',
            'Noncommunicable diseases': '374.8'
        },
        'Argentina': {
            'Communicable & other Group I': '68.7',
            'Injuries': '50.7',
            'Noncommunicable diseases': '467.3'
        },
        'Mexico': {
            'Injuries': '63.2',
            'Communicable & other Group I': '57.0',
            'Noncommunicable diseases': '468.3'
        },
        'Jamaica': {
            'Injuries': '51.5',
            'Communicable & other Group I': '97.0',
            'Noncommunicable diseases': '519.1'
        },
        'Peru': {
            'Noncommunicable diseases': '363.5',
            'Injuries': '47.9',
            'Communicable & other Group I': '121.3'
        },
        'Brazil': {
            'Injuries': '80.2',
            'Communicable & other Group I': '92.8',
            'Noncommunicable diseases': '513.8'
        },
        'Venezuela (Bolivarian Republic of)': {
            'Communicable & other Group I': '58.2',
            'Injuries': '103.2',
            'Noncommunicable diseases': '410.6'
        },
        'Paraguay': {
            'Noncommunicable diseases': '485.5',
            'Communicable & other Group I': '77.3',
            'Injuries': '67.6'
        },
        'Chile': {
            'Noncommunicable diseases': '366.5',
            'Communicable & other Group I': '36.3',
            'Injuries': '41.2'
        },
        'Trinidad and Tobago': {
            'Noncommunicable diseases': '705.3',
            'Communicable & other Group I': '80.4',
            'Injuries': '98.4'
        },
        'Colombia': {
            'Noncommunicable diseases': '377.3',
            'Communicable & other Group I': '55.0',
            'Injuries': '72.6'
        },
        'Cuba': {
            'Injuries': '45.3',
            'Noncommunicable diseases': '421.8',
            'Communicable & other Group I': '33.2'
        },
        'El Salvador': {
            'Noncommunicable diseases': '474.9',
            'Injuries': '157.7',
            'Communicable & other Group I': '96.2'
        },
        'Honduras': {
            'Injuries': '80.8',
            'Communicable & other Group I': '117.5',
            'Noncommunicable diseases': '441.5'
        },
        'Ecuador': {
            'Noncommunicable diseases': '409.7',
            'Injuries': '83.7',
            'Communicable & other Group I': '97.3'
        },
        'Costa Rica': {
            'Communicable & other Group I': '30.5',
            'Noncommunicable diseases': '391.8',
            'Injuries': '46.5'
        },
        'Dominican Republic': {
            'Noncommunicable diseases': '396.0',
            'Injuries': '66.4',
            'Communicable & other Group I': '76.8'
        },
        'Nicaragua': {
            'Communicable & other Group I': '75.2',
            'Injuries': '64.4',
            'Noncommunicable diseases': '546.6'
        },
        'Barbados': {
            'Noncommunicable diseases': '404.5',
            'Injuries': '28.0',
            'Communicable & other Group I': '60.8'
        },
        'Uruguay': {
            'Noncommunicable diseases': '446.0',
            'Injuries': '53.8',
            'Communicable & other Group I': '46.2'
        },
        'Panama': {
            'Communicable & other Group I': '86.1',
            'Injuries': '67.4',
            'Noncommunicable diseases': '372.9'
        },
        'Bahamas': {
            'Noncommunicable diseases': '465.2',
            'Injuries': '45.7',
            'Communicable & other Group I': '122.0'
        },
        'Guyana': {
            'Communicable & other Group I': '177.2',
            'Noncommunicable diseases': '1024.2',
            'Injuries': '150.0'
        },
        'United States of America': {
            'Noncommunicable diseases': '412.8',
            'Injuries': '44.2',
            'Communicable & other Group I': '31.3'
        },
        'Guatemala': {
            'Communicable & other Group I': '212.7',
            'Noncommunicable diseases': '409.4',
            'Injuries': '111.0'
        }
    },
    'Eastern Mediterranean': {
        'Egypt': {
            'Communicable & other Group I': '74.3',
            'Noncommunicable diseases': '781.7',
            'Injuries': '33.5'
        },
        'South Sudan': {
            'Injuries': '143.4',
            'Communicable & other Group I': '831.3',
            'Noncommunicable diseases': '623.4'
        },
        'Sudan': {
            'Injuries': '133.6',
            'Noncommunicable diseases': '551.0',
            'Communicable & other Group I': '495.0'
        },
        'Libya': {
            'Injuries': '62.8',
            'Noncommunicable diseases': '550.0',
            'Communicable & other Group I': '52.6'
        },
        'Jordan': {
            'Noncommunicable diseases': '640.3',
            'Injuries': '53.5',
            'Communicable & other Group I': '52.5'
        },
        'Pakistan': {
            'Communicable & other Group I': '296.0',
            'Noncommunicable diseases': '669.3',
            'Injuries': '98.7'
        },
        'Djibouti': {
            'Noncommunicable diseases': '631.1',
            'Communicable & other Group I': '626.0',
            'Injuries': '106.0'
        },
        'Syrian Arab Republic': {
            'Communicable & other Group I': '41.0',
            'Injuries': '308.0',
            'Noncommunicable diseases': '572.7'
        },
        'Morocco': {
            'Noncommunicable diseases': '707.7',
            'Communicable & other Group I': '131.5',
            'Injuries': '47.0'
        },
        'Yemen': {
            'Communicable & other Group I': '515.0',
            'Noncommunicable diseases': '626.9',
            'Injuries': '84.3'
        },
        'Bahrain': {
            'Injuries': '33.5',
            'Noncommunicable diseases': '505.7',
            'Communicable & other Group I': '48.5'
        },
        'United Arab Emirates': {
            'Noncommunicable diseases': '546.8',
            'Injuries': '31.5',
            'Communicable & other Group I': '35.6'
        },
        'Lebanon': {
            'Noncommunicable diseases': '384.6',
            'Injuries': '40.6',
            'Communicable & other Group I': '30.5'
        },
        'Saudi Arabia': {
            'Noncommunicable diseases': '549.4',
            'Injuries': '41.1',
            'Communicable & other Group I': '71.3'
        },
        'Iran (Islamic Republic of)': {
            'Injuries': '74.9',
            'Communicable & other Group I': '56.2',
            'Noncommunicable diseases': '569.3'
        },
        'Iraq': {
            'Communicable & other Group I': '87.0',
            'Noncommunicable diseases': '715.5',
            'Injuries': '128.5'
        },
        'Qatar': {
            'Communicable & other Group I': '28.3',
            'Injuries': '41.0',
            'Noncommunicable diseases': '407.0'
        },
        'Afghanistan': {
            'Communicable & other Group I': '362.7',
            'Injuries': '169.2',
            'Noncommunicable diseases': '846.3'
        },
        'Somalia': {
            'Noncommunicable diseases': '550.7',
            'Communicable & other Group I': '927.2',
            'Injuries': '188.5'
        },
        'Kuwait': {
            'Communicable & other Group I': '82.5',
            'Injuries': '25.4',
            'Noncommunicable diseases': '406.3'
        },
        'Oman': {
            'Injuries': '52.8',
            'Noncommunicable diseases': '478.2',
            'Communicable & other Group I': '84.2'
        },
        'Tunisia': {
            'Noncommunicable diseases': '509.3',
            'Communicable & other Group I': '65.0',
            'Injuries': '39.1'
        }
    },
    'Western Pacific': {
        'Mongolia': {
            'Injuries': '69.4',
            'Noncommunicable diseases': '966.5',
            'Communicable & other Group I': '82.8'
        },
        'Cambodia': {
            'Injuries': '62.2',
            'Communicable & other Group I': '227.5',
            'Noncommunicable diseases': '394.0'
        },
        'Japan': {
            'Injuries': '40.5',
            'Noncommunicable diseases': '244.2',
            'Communicable & other Group I': '33.9'
        },
        'Brunei Darussalam': {
            'Injuries': '44.6',
            'Noncommunicable diseases': '475.3',
            'Communicable & other Group I': '56.1'
        },
        'Solomon Islands': {
            'Communicable & other Group I': '230.6',
            'Injuries': '75.1',
            'Noncommunicable diseases': '709.7'
        },
        'Viet Nam': {
            'Communicable & other Group I': '96.0',
            'Injuries': '59.0',
            'Noncommunicable diseases': '435.4'
        },
        'Lao People\'s Democratic Republic': {
            'Communicable & other Group I': '328.7',
            'Injuries': '75.2',
            'Noncommunicable diseases': '680.0'
        },
        'China': {
            'Communicable & other Group I': '41.4',
            'Noncommunicable diseases': '576.3',
            'Injuries': '50.4'
        },
        'New Zealand': {
            'Injuries': '32.9',
            'Noncommunicable diseases': '313.6',
            'Communicable & other Group I': '18.0'
        },
        'Papua New Guinea': {
            'Injuries': '100.1',
            'Communicable & other Group I': '554.3',
            'Noncommunicable diseases': '693.2'
        },
        'Philippines': {
            'Communicable & other Group I': '226.4',
            'Noncommunicable diseases': '720.0',
            'Injuries': '53.8'
        },
        'Malaysia': {
            'Injuries': '62.8',
            'Noncommunicable diseases': '563.2',
            'Communicable & other Group I': '117.4'
        },
        'Australia': {
            'Communicable & other Group I': '13.7',
            'Noncommunicable diseases': '302.9',
            'Injuries': '28.2'
        },
        'Fiji': {
            'Noncommunicable diseases': '804.0',
            'Injuries': '64.0',
            'Communicable & other Group I': '105.2'
        },
        'Singapore': {
            'Communicable & other Group I': '66.2',
            'Noncommunicable diseases': '264.8',
            'Injuries': '17.5'
        },
        'Republic of Korea': {
            'Injuries': '53.1',
            'Communicable & other Group I': '33.8',
            'Noncommunicable diseases': '302.1'
        }
    }
},
    points = [],
    regionP,
    regionVal,
    regionI = 0,
    countryP,
    countryI,
    causeP,
    causeI,
    region,
    country,
    cause,
    causeName = {
    'Communicable & other Group I': 'Communicable diseases',
    'Noncommunicable diseases': 'Non-communicable diseases',
    'Injuries': 'Injuries'
};

for (region in data) {
    if (data.hasOwnProperty(region)) {
        regionVal = 0;
        regionP = {
            id: 'id_' + regionI,
            name: region,
            color: Highcharts.getOptions().colors[regionI]
        };
        countryI = 0;
        for (country in data[region]) {
            if (data[region].hasOwnProperty(country)) {
                countryP = {
                    id: regionP.id + '_' + countryI,
                    name: country,
                    parent: regionP.id
                };
                points.push(countryP);
                causeI = 0;
                for (cause in data[region][country]) {
                    if (data[region][country].hasOwnProperty(cause)) {
                        causeP = {
                            id: countryP.id + '_' + causeI,
                            name: causeName[cause],
                            parent: countryP.id,
                            value: Math.round(+data[region][country][cause])
                        };
                        regionVal += causeP.value;
                        points.push(causeP);
                        causeI = causeI + 1;
                    }
                }
                countryI = countryI + 1;
            }
        }
        regionP.value = Math.round(regionVal / countryI);
        points.push(regionP);
        regionI = regionI + 1;
    }
}

var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);

    function App() {
        (0, _classCallCheck3.default)(this, App);
        return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));
    }

    (0, _createClass3.default)(App, [{
        key: 'render',
        value: function render() {
            var levels = [{
                level: 1,
                dataLabels: {
                    enabled: true
                },
                borderWidth: 3
            }];
            var dataLabels = {
                enabled: false
            };
            var tooltipText = function tooltipText(e) {
                console.log(e, this);
                return this.key + ': ' + this.point.value;
            };

            return _react2.default.createElement(
                'div',
                { className: 'app' },
                _react2.default.createElement(
                    _reactJsxHighcharts.HighchartsChart,
                    null,
                    _react2.default.createElement(
                        _reactJsxHighcharts.Title,
                        null,
                        'Treemap'
                    ),
                    _react2.default.createElement(_reactJsxHighcharts.XAxis, null),
                    _react2.default.createElement(
                        _reactJsxHighcharts.YAxis,
                        { id: 'value' },
                        _react2.default.createElement(_reactJsxHighcharts.TreemapSeries, { data: points, layoutAlgorithm: 'squarified', allowDrillToNode: true, animationLimit: 1000, dataLabels: dataLabels, levelIsConstant: false, levels: levels })
                    ),
                    _react2.default.createElement(_reactJsxHighcharts.Tooltip, {
                        formatter: tooltipText
                    })
                ),
                _react2.default.createElement(
                    _ExampleCode2.default,
                    { name: 'Treemap' },
                    _exampleCode2.default
                )
            );
        }
    }]);
    return App;
}(_react.Component);

exports.default = App;

/***/ }),
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = "\n  render() {\n        var levels = [{\n            level: 1,\n            dataLabels: {\n                enabled: true\n            },\n            borderWidth: 3\n        }];\n        var dataLabels = {\n            enabled: false\n        };\n        var tooltipText = function (e) {\n            console.log(e, this);\n            return `${this.key}: ${this.point.value}`;\n        }\n\n\n        return (\n            <div className=\"app\">\n                <HighchartsChart>\n                    <Title>Treemap</Title>\n                    <XAxis />\n                    <YAxis id=\"value\">\n                        <TreemapSeries data={points} layoutAlgorithm='squarified' allowDrillToNode={true} animationLimit={1000} dataLabels={dataLabels} levelIsConstant={false} levels={levels} />\n                    </YAxis>\n                    <Tooltip\n                        formatter={tooltipText}\n                    />\n\n                </HighchartsChart>\n\n                <ExampleCode name=\"Treemap\">{code}</ExampleCode>\n            </div>\n        );\n    }\n}";

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(13);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(42);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(150);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('root'));

/***/ })
/******/ ]);