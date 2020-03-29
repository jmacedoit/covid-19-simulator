// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":[function(require,module,exports) {
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;
},{}],"../node_modules/@babel/runtime/helpers/iterableToArray.js":[function(require,module,exports) {
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;
},{}],"../node_modules/@babel/runtime/helpers/nonIterableSpread.js":[function(require,module,exports) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;
},{}],"../node_modules/@babel/runtime/helpers/toConsumableArray.js":[function(require,module,exports) {
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":"../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js","./iterableToArray":"../node_modules/@babel/runtime/helpers/iterableToArray.js","./nonIterableSpread":"../node_modules/@babel/runtime/helpers/nonIterableSpread.js"}],"../node_modules/@babel/runtime/helpers/defineProperty.js":[function(require,module,exports) {
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{}],"../node_modules/@babel/runtime/helpers/objectSpread.js":[function(require,module,exports) {
var defineProperty = require("./defineProperty");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;
},{"./defineProperty":"../node_modules/@babel/runtime/helpers/defineProperty.js"}],"../node_modules/symbol-observable/es/ponyfill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = symbolObservablePonyfill;

function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}

;
},{}],"../node_modules/symbol-observable/es/index.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ponyfill = _interopRequireDefault(require("./ponyfill.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill.default)(root);
var _default = result;
exports.default = _default;
},{"./ponyfill.js":"../node_modules/symbol-observable/es/ponyfill.js"}],"../node_modules/is-observable/index.js":[function(require,module,exports) {
'use strict';

const symbolObservable = require('symbol-observable').default;

module.exports = value => Boolean(value && value[symbolObservable] && value === value[symbolObservable]());
},{"symbol-observable":"../node_modules/symbol-observable/es/index.js"}],"../node_modules/threads/dist/serializers.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extendSerializer(extend, implementation) {
    const fallbackDeserializer = extend.deserialize.bind(extend);
    const fallbackSerializer = extend.serialize.bind(extend);
    return {
        deserialize(message) {
            return implementation.deserialize(message, fallbackDeserializer);
        },
        serialize(input) {
            return implementation.serialize(input, fallbackSerializer);
        }
    };
}
exports.extendSerializer = extendSerializer;
const DefaultErrorSerializer = {
    deserialize(message) {
        return Object.assign(Error(message.message), {
            name: message.name,
            stack: message.stack
        });
    },
    serialize(error) {
        return {
            __error_marker: "$$error",
            message: error.message,
            name: error.name,
            stack: error.stack
        };
    }
};
const isSerializedError = (thing) => thing && typeof thing === "object" && "__error_marker" in thing && thing.__error_marker === "$$error";
exports.DefaultSerializer = {
    deserialize(message) {
        if (isSerializedError(message)) {
            return DefaultErrorSerializer.deserialize(message);
        }
        else {
            return message;
        }
    },
    serialize(input) {
        if (input instanceof Error) {
            return DefaultErrorSerializer.serialize(input);
        }
        else {
            return input;
        }
    }
};

},{}],"../node_modules/threads/dist/common.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serializers_1 = require("./serializers");
let registeredSerializer = serializers_1.DefaultSerializer;
function registerSerializer(serializer) {
    registeredSerializer = serializers_1.extendSerializer(registeredSerializer, serializer);
}
exports.registerSerializer = registerSerializer;
function deserialize(message) {
    return registeredSerializer.deserialize(message);
}
exports.deserialize = deserialize;
function serialize(input) {
    return registeredSerializer.serialize(input);
}
exports.serialize = serialize;

},{"./serializers":"../node_modules/threads/dist/serializers.js"}],"../node_modules/threads/dist/symbols.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$errors = Symbol("thread.errors");
exports.$events = Symbol("thread.events");
exports.$terminate = Symbol("thread.terminate");
exports.$transferable = Symbol("thread.transferable");
exports.$worker = Symbol("thread.worker");

},{}],"../node_modules/threads/dist/transferable.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("./symbols");
function isTransferable(thing) {
    if (!thing || typeof thing !== "object")
        return false;
    // Don't check too thoroughly, since the list of transferable things in JS might grow over time
    return true;
}
function isTransferDescriptor(thing) {
    return thing && typeof thing === "object" && thing[symbols_1.$transferable];
}
exports.isTransferDescriptor = isTransferDescriptor;
function Transfer(payload, transferables) {
    if (!transferables) {
        if (!isTransferable(payload))
            throw Error();
        transferables = [payload];
    }
    return {
        [symbols_1.$transferable]: true,
        send: payload,
        transferables
    };
}
exports.Transfer = Transfer;

},{"./symbols":"../node_modules/threads/dist/symbols.js"}],"../node_modules/threads/dist/types/messages.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////////////
// Messages sent by master:
var MasterMessageType;
(function (MasterMessageType) {
    MasterMessageType["run"] = "run";
})(MasterMessageType = exports.MasterMessageType || (exports.MasterMessageType = {}));
////////////////////////////
// Messages sent by worker:
var WorkerMessageType;
(function (WorkerMessageType) {
    WorkerMessageType["error"] = "error";
    WorkerMessageType["init"] = "init";
    WorkerMessageType["result"] = "result";
    WorkerMessageType["running"] = "running";
    WorkerMessageType["uncaughtError"] = "uncaughtError";
})(WorkerMessageType = exports.WorkerMessageType || (exports.WorkerMessageType = {}));

},{}],"../node_modules/threads/dist/worker/implementation.browser.js":[function(require,module,exports) {
"use strict";
/// <reference lib="dom" />
// tslint:disable no-shadowed-variable
Object.defineProperty(exports, "__esModule", { value: true });
const isWorkerRuntime = function isWorkerRuntime() {
    return typeof self !== "undefined" && self.postMessage ? true : false;
};
const postMessageToMaster = function postMessageToMaster(data, transferList) {
    self.postMessage(data, transferList);
};
const subscribeToMasterMessages = function subscribeToMasterMessages(onMessage) {
    const messageHandler = (messageEvent) => {
        onMessage(messageEvent.data);
    };
    const unsubscribe = () => {
        self.removeEventListener("message", messageHandler);
    };
    self.addEventListener("message", messageHandler);
    return unsubscribe;
};
exports.default = {
    isWorkerRuntime,
    postMessageToMaster,
    subscribeToMasterMessages
};

},{}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/threads/dist/worker/index.js":[function(require,module,exports) {
var process = require("process");
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_observable_1 = __importDefault(require("is-observable"));
const common_1 = require("../common");
const transferable_1 = require("../transferable");
const messages_1 = require("../types/messages");
const implementation_1 = __importDefault(require("./implementation"));
var common_2 = require("../common");
exports.registerSerializer = common_2.registerSerializer;
var transferable_2 = require("../transferable");
exports.Transfer = transferable_2.Transfer;
let exposeCalled = false;
const isMasterJobRunMessage = (thing) => thing && thing.type === messages_1.MasterMessageType.run;
/**
 * There are issues with `is-observable` not recognizing zen-observable's instances.
 * We are using `observable-fns`, but it's based on zen-observable, too.
 */
const isObservable = (thing) => is_observable_1.default(thing) || isZenObservable(thing);
function isZenObservable(thing) {
    return thing && typeof thing === "object" && typeof thing.subscribe === "function";
}
function deconstructTransfer(thing) {
    return transferable_1.isTransferDescriptor(thing)
        ? { payload: thing.send, transferables: thing.transferables }
        : { payload: thing, transferables: undefined };
}
function postFunctionInitMessage() {
    const initMessage = {
        type: messages_1.WorkerMessageType.init,
        exposed: {
            type: "function"
        }
    };
    implementation_1.default.postMessageToMaster(initMessage);
}
function postModuleInitMessage(methodNames) {
    const initMessage = {
        type: messages_1.WorkerMessageType.init,
        exposed: {
            type: "module",
            methods: methodNames
        }
    };
    implementation_1.default.postMessageToMaster(initMessage);
}
function postJobErrorMessage(uid, rawError) {
    const { payload: error, transferables } = deconstructTransfer(rawError);
    const errorMessage = {
        type: messages_1.WorkerMessageType.error,
        uid,
        error: common_1.serialize(error)
    };
    implementation_1.default.postMessageToMaster(errorMessage, transferables);
}
function postJobResultMessage(uid, completed, resultValue) {
    const { payload, transferables } = deconstructTransfer(resultValue);
    const resultMessage = {
        type: messages_1.WorkerMessageType.result,
        uid,
        complete: completed ? true : undefined,
        payload
    };
    implementation_1.default.postMessageToMaster(resultMessage, transferables);
}
function postJobStartMessage(uid, resultType) {
    const startMessage = {
        type: messages_1.WorkerMessageType.running,
        uid,
        resultType
    };
    implementation_1.default.postMessageToMaster(startMessage);
}
function postUncaughtErrorMessage(error) {
    try {
        const errorMessage = {
            type: messages_1.WorkerMessageType.uncaughtError,
            error: common_1.serialize(error)
        };
        implementation_1.default.postMessageToMaster(errorMessage);
    }
    catch (subError) {
        // tslint:disable-next-line no-console
        console.error("Not reporting uncaught error back to master thread as it occured while " +
            "reporting an uncaught error already. Latest error:", subError);
    }
}
function runFunction(jobUID, fn, args) {
    return __awaiter(this, void 0, void 0, function* () {
        let syncResult;
        try {
            syncResult = fn(...args);
        }
        catch (error) {
            return postJobErrorMessage(jobUID, error);
        }
        const resultType = isObservable(syncResult) ? "observable" : "promise";
        postJobStartMessage(jobUID, resultType);
        if (isObservable(syncResult)) {
            syncResult.subscribe(value => postJobResultMessage(jobUID, false, common_1.serialize(value)), error => postJobErrorMessage(jobUID, common_1.serialize(error)), () => postJobResultMessage(jobUID, true));
        }
        else {
            try {
                const result = yield syncResult;
                postJobResultMessage(jobUID, true, common_1.serialize(result));
            }
            catch (error) {
                postJobErrorMessage(jobUID, common_1.serialize(error));
            }
        }
    });
}
/**
 * Expose a function or a module (an object whose values are functions)
 * to the main thread. Must be called exactly once in every worker thread
 * to signal its API to the main thread.
 *
 * @param exposed Function or object whose values are functions
 */
function expose(exposed) {
    if (!implementation_1.default.isWorkerRuntime()) {
        throw Error("expose() called in the master thread.");
    }
    if (exposeCalled) {
        throw Error("expose() called more than once. This is not possible. Pass an object to expose() if you want to expose multiple functions.");
    }
    exposeCalled = true;
    if (typeof exposed === "function") {
        implementation_1.default.subscribeToMasterMessages(messageData => {
            if (isMasterJobRunMessage(messageData) && !messageData.method) {
                runFunction(messageData.uid, exposed, messageData.args.map(common_1.deserialize));
            }
        });
        postFunctionInitMessage();
    }
    else if (typeof exposed === "object" && exposed) {
        implementation_1.default.subscribeToMasterMessages(messageData => {
            if (isMasterJobRunMessage(messageData) && messageData.method) {
                runFunction(messageData.uid, exposed[messageData.method], messageData.args.map(common_1.deserialize));
            }
        });
        const methodNames = Object.keys(exposed).filter(key => typeof exposed[key] === "function");
        postModuleInitMessage(methodNames);
    }
    else {
        throw Error(`Invalid argument passed to expose(). Expected a function or an object, got: ${exposed}`);
    }
}
exports.expose = expose;
if (typeof self !== "undefined" && typeof self.addEventListener === "function" && implementation_1.default.isWorkerRuntime()) {
    self.addEventListener("error", event => {
        // Post with some delay, so the master had some time to subscribe to messages
        setTimeout(() => postUncaughtErrorMessage(event.error || event), 250);
    });
    self.addEventListener("unhandledrejection", event => {
        const error = event.reason;
        if (error && typeof error.message === "string") {
            // Post with some delay, so the master had some time to subscribe to messages
            setTimeout(() => postUncaughtErrorMessage(error), 250);
        }
    });
}
if (typeof process !== "undefined" && typeof process.on === "function" && implementation_1.default.isWorkerRuntime()) {
    process.on("uncaughtException", (error) => {
        // Post with some delay, so the master had some time to subscribe to messages
        setTimeout(() => postUncaughtErrorMessage(error), 250);
    });
    process.on("unhandledRejection", (error) => {
        if (error && typeof error.message === "string") {
            // Post with some delay, so the master had some time to subscribe to messages
            setTimeout(() => postUncaughtErrorMessage(error), 250);
        }
    });
}

},{"is-observable":"../node_modules/is-observable/index.js","../common":"../node_modules/threads/dist/common.js","../transferable":"../node_modules/threads/dist/transferable.js","../types/messages":"../node_modules/threads/dist/types/messages.js","./implementation":"../node_modules/threads/dist/worker/implementation.browser.js","process":"../node_modules/process/browser.js"}],"../node_modules/threads/worker.js":[function(require,module,exports) {
module.exports = require("./dist/worker/index")

},{"./dist/worker/index":"../node_modules/threads/dist/worker/index.js"}],"../node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"../node_modules/ieee754/index.js":[function(require,module,exports) {
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"../node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"../node_modules/base64-js/index.js","ieee754":"../node_modules/ieee754/index.js","isarray":"../node_modules/isarray/index.js","buffer":"../node_modules/buffer/index.js"}],"../node_modules/lodash/lodash.js":[function(require,module,exports) {
var global = arguments[3];
var Buffer = require("buffer").Buffer;
var define;
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '4.17.15';

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Error message constants. */
  var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
      FUNC_ERROR_TEXT = 'Expected a function';

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG = 4;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /** Used to compose bitmasks for function metadata. */
  var WRAP_BIND_FLAG = 1,
      WRAP_BIND_KEY_FLAG = 2,
      WRAP_CURRY_BOUND_FLAG = 4,
      WRAP_CURRY_FLAG = 8,
      WRAP_CURRY_RIGHT_FLAG = 16,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_PARTIAL_RIGHT_FLAG = 64,
      WRAP_ARY_FLAG = 128,
      WRAP_REARG_FLAG = 256,
      WRAP_FLIP_FLAG = 512;

  /** Used as default options for `_.truncate`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2,
      LAZY_WHILE_FLAG = 3;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;

  /** Used as references for the maximum length and index of an array. */
  var MAX_ARRAY_LENGTH = 4294967295,
      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

  /** Used to associate wrap methods with their bit flags. */
  var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['bind', WRAP_BIND_FLAG],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['partial', WRAP_PARTIAL_FLAG],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
  ];

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      asyncTag = '[object AsyncFunction]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      domExcTag = '[object DOMException]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      nullTag = '[object Null]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      proxyTag = '[object Proxy]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      undefinedTag = '[object Undefined]',
      weakMapTag = '[object WeakMap]',
      weakSetTag = '[object WeakSet]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match empty string literals in compiled template source. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match HTML entities and HTML characters. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
      reUnescapedHtml = /[&<>"']/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExpChar = RegExp(reRegExpChar.source);

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g,
      reTrimStart = /^\s+/,
      reTrimEnd = /\s+$/;

  /** Used to match wrap detail comments. */
  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
      reSplitDetails = /,? & /;

  /** Used to match words composed of alphanumeric characters. */
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Used to match
   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to match Latin Unicode letters (excluding mathematical operators). */
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsDingbatRange = '\\u2700-\\u27bf',
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = '\\u2000-\\u206f',
      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange = '\\ufe0e\\ufe0f',
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

  /** Used to compose unicode capture groups. */
  var rsApos = "['\u2019]",
      rsAstral = '[' + rsAstralRange + ']',
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo = '[' + rsComboRange + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ = '\\u200d';

  /** Used to compose unicode regexes. */
  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Used to match apostrophes. */
  var reApos = RegExp(rsApos, 'g');

  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */
  var reComboMark = RegExp(rsCombo, 'g');

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /** Used to match complex or compound words. */
  var reUnicodeWord = RegExp([
    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join('|'), 'g');

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

  /** Used to detect strings that need a more robust regexp to match words. */
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
  ];

  /** Used to make template sourceURLs easier to identify. */
  var templateCounter = -1;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  cloneableTags[boolTag] = cloneableTags[dateTag] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /** Used to map Latin Unicode letters to basic Latin letters. */
  var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
    '\u0134': 'J',  '\u0135': 'j',
    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
    '\u0174': 'W',  '\u0175': 'w',
    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
    '\u0132': 'IJ', '\u0133': 'ij',
    '\u0152': 'Oe', '\u0153': 'oe',
    '\u0149': "'n", '\u017f': 's'
  };

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Built-in method references without a dependency on `root`. */
  var freeParseFloat = parseFloat,
      freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
      nodeIsDate = nodeUtil && nodeUtil.isDate,
      nodeIsMap = nodeUtil && nodeUtil.isMap,
      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
      nodeIsSet = nodeUtil && nodeUtil.isSet,
      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /*--------------------------------------------------------------------------*/

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * A specialized version of `baseAggregator` for arrays.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      var value = array[index];
      setter(accumulator, value, iteratee(value), array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.forEachRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEachRight(array, iteratee) {
    var length = array == null ? 0 : array.length;

    while (length--) {
      if (iteratee(array[length], length, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.every` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */
  function arrayEvery(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false;
      }
    }
    return true;
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array == null ? 0 : array.length;

    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.reduceRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the last element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduceRight(array, iteratee, accumulator, initAccum) {
    var length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[--length];
    }
    while (length--) {
      accumulator = iteratee(accumulator, array[length], length, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Gets the size of an ASCII `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  var asciiSize = baseProperty('length');

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('');
  }

  /**
   * Splits an ASCII `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }

  /**
   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
   * without support for iteratee shorthands, which iterates over `collection`
   * using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the found element or its key, else `undefined`.
   */
  function baseFindKey(collection, predicate, eachFunc) {
    var result;
    eachFunc(collection, function(value, key, collection) {
      if (predicate(value, key, collection)) {
        result = key;
        return false;
      }
    });
    return result;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? strictIndexOf(array, value, fromIndex)
      : baseFindIndex(array, baseIsNaN, fromIndex);
  }

  /**
   * This function is like `baseIndexOf` except that it accepts a comparator.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOfWith(array, value, fromIndex, comparator) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (comparator(array[index], value)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array == null ? 0 : array.length;
    return length ? (baseSum(array, iteratee) / length) : NAN;
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initAccum Specify using the first or last element of
   *  `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function(value, index, collection) {
      accumulator = initAccum
        ? (initAccum = false, value)
        : iteratee(accumulator, value, index, collection);
    });
    return accumulator;
  }

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length;

    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }

  /**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(array, iteratee) {
    var result,
        index = -1,
        length = array.length;

    while (++index < length) {
      var current = iteratee(array[index]);
      if (current !== undefined) {
        result = result === undefined ? current : (result + current);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
   * of key-value pairs for `object` corresponding to the property names of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the key-value pairs.
   */
  function baseToPairs(object, props) {
    return arrayMap(props, function(key) {
      return [key, object[key]];
    });
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return arrayMap(props, function(key) {
      return object[key];
    });
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
        length = strSymbols.length;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length;

    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index;
  }

  /**
   * Gets the number of `placeholder` occurrences in `array`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} placeholder The placeholder to search for.
   * @returns {number} Returns the placeholder count.
   */
  function countHolders(array, placeholder) {
    var length = array.length,
        result = 0;

    while (length--) {
      if (array[length] === placeholder) {
        ++result;
      }
    }
    return result;
  }

  /**
   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
   * letters to basic Latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  var deburrLetter = basePropertyOf(deburredLetters);

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  var escapeHtmlChar = basePropertyOf(htmlEscapes);

  /**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }

  /**
   * Checks if `string` contains a word composed of Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a word is found, else `false`.
   */
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }

  /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */
  function iteratorToArray(iterator) {
    var data,
        result = [];

    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
      var value = array[index];
      if (value === placeholder || value === PLACEHOLDER) {
        array[index] = PLACEHOLDER;
        result[resIndex++] = index;
      }
    }
    return result;
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /**
   * Converts `set` to its value-value pairs.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the value-value pairs.
   */
  function setToPairs(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function(value) {
      result[++index] = [value, value];
    });
    return result;
  }

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * A specialized version of `_.lastIndexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictLastIndexOf(array, value, fromIndex) {
    var index = fromIndex + 1;
    while (index--) {
      if (array[index] === value) {
        return index;
      }
    }
    return index;
  }

  /**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */
  function stringSize(string) {
    return hasUnicode(string)
      ? unicodeSize(string)
      : asciiSize(string);
  }

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return hasUnicode(string)
      ? unicodeToArray(string)
      : asciiToArray(string);
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

  /**
   * Gets the size of a Unicode `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  function unicodeSize(string) {
    var result = reUnicode.lastIndex = 0;
    while (reUnicode.test(string)) {
      ++result;
    }
    return result;
  }

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  /**
   * Splits a Unicode `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new pristine `lodash` function using the `context` object.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Util
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // Create a suped-up `defer` in Node.js.
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  var runInContext = (function runInContext(context) {
    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

    /** Built-in constructor references. */
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = context['__core-js_shared__'];

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /** Used to restore the original `_` reference in `_.noConflict`. */
    var oldDash = root._;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Buffer = moduleExports ? context.Buffer : undefined,
        Symbol = context.Symbol,
        Uint8Array = context.Uint8Array,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
        symIterator = Symbol ? Symbol.iterator : undefined,
        symToStringTag = Symbol ? Symbol.toStringTag : undefined;

    var defineProperty = (function() {
      try {
        var func = getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    /** Mocked built-ins. */
    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
        ctxNow = Date && Date.now !== root.Date.now && Date.now,
        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil,
        nativeFloor = Math.floor,
        nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeIsFinite = context.isFinite,
        nativeJoin = arrayProto.join,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = Date.now,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random,
        nativeReverse = arrayProto.reverse;

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(context, 'DataView'),
        Map = getNative(context, 'Map'),
        Promise = getNative(context, 'Promise'),
        Set = getNative(context, 'Set'),
        WeakMap = getNative(context, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');

    /** Used to store function metadata. */
    var metaMap = WeakMap && new WeakMap;

    /** Used to lookup unminified function names. */
    var realNames = {};

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps `value` to enable implicit method
     * chain sequences. Methods that operate on and return arrays, collections,
     * and functions can be chained together. Methods that retrieve a single value
     * or may return a primitive value will automatically end the chain sequence
     * and return the unwrapped value. Otherwise, the value must be unwrapped
     * with `_#value`.
     *
     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
     * enabled using `_.chain`.
     *
     * The execution of chained methods is lazy, that is, it's deferred until
     * `_#value` is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion.
     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
     * the creation of intermediate arrays and can greatly reduce the number of
     * iteratee executions. Sections of a chain sequence qualify for shortcut
     * fusion if the section is applied to an array and iteratees accept only
     * one argument. The heuristic for whether a section qualifies for shortcut
     * fusion is subject to change.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
     * `zipObject`, `zipObjectDeep`, and `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
     * `upperFirst`, `value`, and `words`
     *
     * @name _
     * @constructor
     * @category Seq
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // Returns an unwrapped value.
     * wrapped.reduce(_.add);
     * // => 6
     *
     * // Returns a wrapped value.
     * var squares = wrapped.map(square);
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
      };
    }());

    /**
     * The function whose prototype chain sequence wrappers inherit from.
     *
     * @private
     */
    function baseLodash() {
      // No operation performed.
    }

    /**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable explicit method chain sequences.
     */
    function LodashWrapper(value, chainAll) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__chain__ = !!chainAll;
      this.__index__ = 0;
      this.__values__ = undefined;
    }

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
     * following template settings to use alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type {Object}
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type {string}
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type {Object}
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type {Function}
         */
        '_': lodash
      }
    };

    // Ensure wrappers are instances of `baseLodash`.
    lodash.prototype = baseLodash.prototype;
    lodash.prototype.constructor = lodash;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @constructor
     * @param {*} value The value to wrap.
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__dir__ = 1;
      this.__filtered__ = false;
      this.__iteratees__ = [];
      this.__takeCount__ = MAX_ARRAY_LENGTH;
      this.__views__ = [];
    }

    /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
    function lazyClone() {
      var result = new LazyWrapper(this.__wrapped__);
      result.__actions__ = copyArray(this.__actions__);
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = copyArray(this.__iteratees__);
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = copyArray(this.__views__);
      return result;
    }

    /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }

    /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
    function lazyValue() {
      var array = this.__wrapped__.value(),
          dir = this.__dir__,
          isArr = isArray(array),
          isRight = dir < 0,
          arrLength = isArr ? array.length : 0,
          view = getView(0, arrLength, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          iteratees = this.__iteratees__,
          iterLength = iteratees.length,
          resIndex = 0,
          takeCount = nativeMin(length, this.__takeCount__);

      if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
        return baseWrapperValue(array, this.__actions__);
      }
      var result = [];

      outer:
      while (length-- && resIndex < takeCount) {
        index += dir;

        var iterIndex = -1,
            value = array[index];

        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type,
              computed = iteratee(value);

          if (type == LAZY_MAP_FLAG) {
            value = computed;
          } else if (!computed) {
            if (type == LAZY_FILTER_FLAG) {
              continue outer;
            } else {
              break outer;
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }

    // Ensure `LazyWrapper` is an instance of `baseLodash`.
    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /*------------------------------------------------------------------------*/

    /**
     *
     * Creates an array cache object to store unique values.
     *
     * @private
     * @constructor
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var index = -1,
          length = values == null ? 0 : values.length;

      this.__data__ = new MapCache;
      while (++index < length) {
        this.add(values[index]);
      }
    }

    /**
     * Adds `value` to the array cache.
     *
     * @private
     * @name add
     * @memberOf SetCache
     * @alias push
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache instance.
     */
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }

    /**
     * Checks if `value` is in the array cache.
     *
     * @private
     * @name has
     * @memberOf SetCache
     * @param {*} value The value to search for.
     * @returns {number} Returns `true` if `value` is found, else `false`.
     */
    function setCacheHas(value) {
      return this.__data__.has(value);
    }

    // Add methods to `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /*------------------------------------------------------------------------*/

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
      this.size = 0;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
          isArg = !isArr && isArguments(value),
          isBuff = !isArr && !isArg && isBuffer(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.sample` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @returns {*} Returns the random element.
     */
    function arraySample(array) {
      var length = array.length;
      return length ? array[baseRandom(0, length - 1)] : undefined;
    }

    /**
     * A specialized version of `_.sampleSize` for arrays.
     *
     * @private
     * @param {Array} array The array to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function arraySampleSize(array, n) {
      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
    }

    /**
     * A specialized version of `_.shuffle` for arrays.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function arrayShuffle(array) {
      return shuffleSelf(copyArray(array));
    }

    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignMergeValue(object, key, value) {
      if ((value !== undefined && !eq(object[key], value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * Aggregates elements of `collection` on `accumulator` with keys transformed
     * by `iteratee` and values set by `setter`.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform keys.
     * @param {Object} accumulator The initial aggregated object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection) {
        setter(accumulator, value, iteratee(value), collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    /**
     * The base implementation of `_.assignIn` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssignIn(object, source) {
      return object && copyObject(source, keysIn(source), object);
    }

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && defineProperty) {
        defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    /**
     * The base implementation of `_.at` without support for individual paths.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {string[]} paths The property paths to pick.
     * @returns {Array} Returns the picked elements.
     */
    function baseAt(object, paths) {
      var index = -1,
          length = paths.length,
          result = Array(length),
          skip = object == null;

      while (++index < length) {
        result[index] = skip ? undefined : get(object, paths[index]);
      }
      return result;
    }

    /**
     * The base implementation of `_.clamp` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     */
    function baseClamp(number, lower, upper) {
      if (number === number) {
        if (upper !== undefined) {
          number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
          number = number >= lower ? number : lower;
        }
      }
      return number;
    }

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask & CLONE_DEEP_FLAG,
          isFlat = bitmask & CLONE_FLAT_FLAG,
          isFull = bitmask & CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? copySymbolsIn(value, baseAssignIn(result, value))
              : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (isSet(value)) {
        value.forEach(function(subValue) {
          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
      } else if (isMap(value)) {
        value.forEach(function(subValue, key) {
          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
      }

      var keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      var props = isArr ? undefined : keysFunc(value);
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }

    /**
     * The base implementation of `_.conforms` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     */
    function baseConforms(source) {
      var props = keys(source);
      return function(object) {
        return baseConformsTo(object, source, props);
      };
    }

    /**
     * The base implementation of `_.conformsTo` which accepts `props` to check.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     */
    function baseConformsTo(object, source, props) {
      var length = props.length;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (length--) {
        var key = props[length],
            predicate = source[key],
            value = object[key];

        if ((value === undefined && !(key in object)) || !predicate(value)) {
          return false;
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.delay` and `_.defer` which accepts `args`
     * to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Array} args The arguments to provide to `func`.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * The base implementation of methods like `_.difference` without support
     * for excluding multiple arrays or iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          isCommon = true,
          length = array.length,
          result = [],
          valuesLength = values.length;

      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      }
      else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee == null ? value : iteratee(value);

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === computed) {
              continue outer;
            }
          }
          result.push(value);
        }
        else if (!includes(values, computed, comparator)) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.forEach` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * The base implementation of `_.every` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }

    /**
     * The base implementation of methods like `_.max` and `_.min` which accepts a
     * `comparator` to determine the extremum value.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The iteratee invoked per iteration.
     * @param {Function} comparator The comparator used to compare values.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(array, iteratee, comparator) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        var value = array[index],
            current = iteratee(value);

        if (current != null && (computed === undefined
              ? (current === current && !isSymbol(current))
              : comparator(current, computed)
            )) {
          var computed = current,
              result = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
    function baseFill(array, value, start, end) {
      var length = array.length;

      start = toInteger(start);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : toInteger(end);
      if (end < 0) {
        end += length;
      }
      end = start > end ? 0 : toLength(end);
      while (start < end) {
        array[start++] = value;
      }
      return array;
    }

    /**
     * The base implementation of `_.filter` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.flatten` with support for restricting flattening.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {number} depth The maximum recursion depth.
     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;

      predicate || (predicate = isFlattenable);
      result || (result = []);

      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseForRight = createBaseFor(true);

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwnRight(object, iteratee) {
      return object && baseForRight(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from `props`.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the function names.
     */
    function baseFunctions(object, props) {
      return arrayFilter(props, function(key) {
        return isFunction(object[key]);
      });
    }

    /**
     * The base implementation of `_.get` without support for default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path) {
      path = castPath(path, object);

      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * The base implementation of `_.gt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     */
    function baseGt(value, other) {
      return value > other;
    }

    /**
     * The base implementation of `_.has` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHas(object, key) {
      return object != null && hasOwnProperty.call(object, key);
    }

    /**
     * The base implementation of `_.hasIn` without support for deep paths.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {Array|string} key The key to check.
     * @returns {boolean} Returns `true` if `key` exists, else `false`.
     */
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }

    /**
     * The base implementation of `_.inRange` which doesn't coerce arguments.
     *
     * @private
     * @param {number} number The number to check.
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     */
    function baseInRange(number, start, end) {
      return number >= nativeMin(start, end) && number < nativeMax(start, end);
    }

    /**
     * The base implementation of methods like `_.intersection`, without support
     * for iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of shared values.
     */
    function baseIntersection(arrays, iteratee, comparator) {
      var includes = comparator ? arrayIncludesWith : arrayIncludes,
          length = arrays[0].length,
          othLength = arrays.length,
          othIndex = othLength,
          caches = Array(othLength),
          maxLength = Infinity,
          result = [];

      while (othIndex--) {
        var array = arrays[othIndex];
        if (othIndex && iteratee) {
          array = arrayMap(array, baseUnary(iteratee));
        }
        maxLength = nativeMin(array.length, maxLength);
        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
          ? new SetCache(othIndex && array)
          : undefined;
      }
      array = arrays[0];

      var index = -1,
          seen = caches[0];

      outer:
      while (++index < length && result.length < maxLength) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (!(seen
              ? cacheHas(seen, computed)
              : includes(result, computed, comparator)
            )) {
          othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if (!(cache
                  ? cacheHas(cache, computed)
                  : includes(arrays[othIndex], computed, comparator))
                ) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.invert` and `_.invertBy` which inverts
     * `object` with values transformed by `iteratee` and set by `setter`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform values.
     * @param {Object} accumulator The initial inverted object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseInverter(object, setter, iteratee, accumulator) {
      baseForOwn(object, function(value, key, object) {
        setter(accumulator, iteratee(value), key, object);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.invoke` without support for individual
     * method arguments.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
    function baseInvoke(object, path, args) {
      path = castPath(path, object);
      object = parent(object, path);
      var func = object == null ? object : object[toKey(last(path))];
      return func == null ? undefined : apply(func, object, args);
    }

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }

    /**
     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     */
    function baseIsArrayBuffer(value) {
      return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
    }

    /**
     * The base implementation of `_.isDate` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     */
    function baseIsDate(value) {
      return isObjectLike(value) && baseGetTag(value) == dateTag;
    }

    /**
     * The base implementation of `_.isEqual` which supports partial comparisons
     * and tracks traversed objects.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Unordered comparison
     *  2 - Partial comparison
     * @param {Function} [customizer] The function to customize comparisons.
     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = objIsArr ? arrayTag : getTag(object),
          othTag = othIsArr ? arrayTag : getTag(other);

      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;

      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;

          stack || (stack = new Stack);
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack);
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }

    /**
     * The base implementation of `_.isMap` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     */
    function baseIsMap(value) {
      return isObjectLike(value) && getTag(value) == mapTag;
    }

    /**
     * The base implementation of `_.isMatch` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Array} matchData The property names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack;
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === undefined
                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
                : result
              )) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.isRegExp` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     */
    function baseIsRegExp(value) {
      return isObjectLike(value) && baseGetTag(value) == regexpTag;
    }

    /**
     * The base implementation of `_.isSet` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     */
    function baseIsSet(value) {
      return isObjectLike(value) && getTag(value) == setTag;
    }

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }

    /**
     * The base implementation of `_.iteratee`.
     *
     * @private
     * @param {*} [value=_.identity] The value to convert to an iteratee.
     * @returns {Function} Returns the iteratee.
     */
    function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == 'object') {
        return isArray(value)
          ? baseMatchesProperty(value[0], value[1])
          : baseMatches(value);
      }
      return property(value);
    }

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.lt` which doesn't coerce arguments.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     */
    function baseLt(value, other) {
      return value < other;
    }

    /**
     * The base implementation of `_.map` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * The base implementation of `_.matches` which doesn't clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }

    /**
     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return (objValue === undefined && objValue === srcValue)
          ? hasIn(object, path)
          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }

    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack);
        if (isObject(srcValue)) {
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
          var newValue = customizer
            ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
            : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      }, keysIn);
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object, key),
          srcValue = safeGet(source, key),
          stacked = stack.get(srcValue);

      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined;

      var isCommon = newValue === undefined;

      if (isCommon) {
        var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          }
          else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          }
          else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          }
          else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          }
          else {
            newValue = [];
          }
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          }
          else if (!isObject(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        }
        else {
          isCommon = false;
        }
      }
      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }

    /**
     * The base implementation of `_.nth` which doesn't coerce arguments.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {number} n The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     */
    function baseNth(array, n) {
      var length = array.length;
      if (!length) {
        return;
      }
      n += n < 0 ? length : 0;
      return isIndex(n, length) ? array[n] : undefined;
    }

    /**
     * The base implementation of `_.orderBy` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {string[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseOrderBy(collection, iteratees, orders) {
      var index = -1;
      iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(getIteratee()));

      var result = baseMap(collection, function(value, key, collection) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.pick` without support for individual
     * property identifiers.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @returns {Object} Returns the new object.
     */
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path) {
        return hasIn(object, path);
      });
    }

    /**
     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} paths The property paths to pick.
     * @param {Function} predicate The function invoked per property.
     * @returns {Object} Returns the new object.
     */
    function basePickBy(object, paths, predicate) {
      var index = -1,
          length = paths.length,
          result = {};

      while (++index < length) {
        var path = paths[index],
            value = baseGet(object, path);

        if (predicate(value, path)) {
          baseSet(result, castPath(path, object), value);
        }
      }
      return result;
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }

    /**
     * The base implementation of `_.pullAllBy` without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     */
    function basePullAll(array, values, iteratee, comparator) {
      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
          index = -1,
          length = values.length,
          seen = array;

      if (array === values) {
        values = copyArray(values);
      }
      if (iteratee) {
        seen = arrayMap(array, baseUnary(iteratee));
      }
      while (++index < length) {
        var fromIndex = 0,
            value = values[index],
            computed = iteratee ? iteratee(value) : value;

        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
          if (seen !== array) {
            splice.call(seen, fromIndex, 1);
          }
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.pullAt` without support for individual
     * indexes or capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0,
          lastIndex = length - 1;

      while (length--) {
        var index = indexes[length];
        if (length == lastIndex || index !== previous) {
          var previous = index;
          if (isIndex(index)) {
            splice.call(array, index, 1);
          } else {
            baseUnset(array, index);
          }
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.random` without support for returning
     * floating-point numbers.
     *
     * @private
     * @param {number} lower The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the random number.
     */
    function baseRandom(lower, upper) {
      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
    }

    /**
     * The base implementation of `_.range` and `_.rangeRight` which doesn't
     * coerce arguments.
     *
     * @private
     * @param {number} start The start of the range.
     * @param {number} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the range of numbers.
     */
    function baseRange(start, end, step, fromRight) {
      var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (length--) {
        result[fromRight ? length : ++index] = start;
        start += step;
      }
      return result;
    }

    /**
     * The base implementation of `_.repeat` which doesn't coerce arguments.
     *
     * @private
     * @param {string} string The string to repeat.
     * @param {number} n The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     */
    function baseRepeat(string, n) {
      var result = '';
      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        if (n) {
          string += string;
        }
      } while (n);

      return result;
    }

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    /**
     * The base implementation of `_.sample`.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     */
    function baseSample(collection) {
      return arraySample(values(collection));
    }

    /**
     * The base implementation of `_.sampleSize` without param guards.
     *
     * @private
     * @param {Array|Object} collection The collection to sample.
     * @param {number} n The number of elements to sample.
     * @returns {Array} Returns the random elements.
     */
    function baseSampleSize(collection, n) {
      var array = values(collection);
      return shuffleSelf(array, baseClamp(n, 0, array.length));
    }

    /**
     * The base implementation of `_.set`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = toKey(path[index]),
            newValue = value;

        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : undefined;
          if (newValue === undefined) {
            newValue = isObject(objValue)
              ? objValue
              : (isIndex(path[index + 1]) ? [] : {});
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }

    /**
     * The base implementation of `setData` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant(string),
        'writable': true
      });
    };

    /**
     * The base implementation of `_.shuffle`.
     *
     * @private
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     */
    function baseShuffle(collection) {
      return shuffleSelf(values(collection));
    }

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.some` without support for iteratee shorthands.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function baseSome(collection, predicate) {
      var result;

      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }

    /**
     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
     * performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndex(array, value, retHighest) {
      var low = 0,
          high = array == null ? low : array.length;

      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];

          if (computed !== null && !isSymbol(computed) &&
              (retHighest ? (computed <= value) : (computed < value))) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return baseSortedIndexBy(array, value, identity, retHighest);
    }

    /**
     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
     * which invokes `iteratee` for `value` and each element of `array` to compute
     * their sort ranking. The iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The iteratee invoked per element.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function baseSortedIndexBy(array, value, iteratee, retHighest) {
      value = iteratee(value);

      var low = 0,
          high = array == null ? 0 : array.length,
          valIsNaN = value !== value,
          valIsNull = value === null,
          valIsSymbol = isSymbol(value),
          valIsUndefined = value === undefined;

      while (low < high) {
        var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            othIsDefined = computed !== undefined,
            othIsNull = computed === null,
            othIsReflexive = computed === computed,
            othIsSymbol = isSymbol(computed);

        if (valIsNaN) {
          var setLow = retHighest || othIsReflexive;
        } else if (valIsUndefined) {
          setLow = othIsReflexive && (retHighest || othIsDefined);
        } else if (valIsNull) {
          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
        } else if (valIsSymbol) {
          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
        } else if (othIsNull || othIsSymbol) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }

    /**
     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
     * support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseSortedUniq(array, iteratee) {
      var index = -1,
          length = array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        if (!index || !eq(computed, seen)) {
          var seen = computed;
          result[resIndex++] = value === 0 ? 0 : value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.toNumber` which doesn't ensure correct
     * conversions of binary, hexadecimal, or octal string values.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     */
    function baseToNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      return +value;
    }

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return arrayMap(value, baseToString) + '';
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     */
    function baseUniq(array, iteratee, comparator) {
      var index = -1,
          includes = arrayIncludes,
          length = array.length,
          isCommon = true,
          result = [],
          seen = result;

      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      }
      else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : createSet(array);
        if (set) {
          return setToArray(set);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache;
      }
      else {
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value) : value;

        value = (comparator || value !== 0) ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.unset`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The property path to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     */
    function baseUnset(object, path) {
      path = castPath(path, object);
      object = parent(object, path);
      return object == null || delete object[toKey(last(path))];
    }

    /**
     * The base implementation of `_.update`.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to update.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize path creation.
     * @returns {Object} Returns `object`.
     */
    function baseUpdate(object, path, updater, customizer) {
      return baseSet(object, path, updater(baseGet(object, path)), customizer);
    }

    /**
     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
     * without support for iteratee shorthands.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length) &&
        predicate(array[index], index, array)) {}

      return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }

    /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to perform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      return arrayReduce(actions, function(result, action) {
        return action.func.apply(action.thisArg, arrayPush([result], action.args));
      }, result);
    }

    /**
     * The base implementation of methods like `_.xor`, without support for
     * iteratee shorthands, that accepts an array of arrays to inspect.
     *
     * @private
     * @param {Array} arrays The arrays to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of values.
     */
    function baseXor(arrays, iteratee, comparator) {
      var length = arrays.length;
      if (length < 2) {
        return length ? baseUniq(arrays[0]) : [];
      }
      var index = -1,
          result = Array(length);

      while (++index < length) {
        var array = arrays[index],
            othIndex = -1;

        while (++othIndex < length) {
          if (othIndex != index) {
            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
          }
        }
      }
      return baseUniq(baseFlatten(result, 1), iteratee, comparator);
    }

    /**
     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
     *
     * @private
     * @param {Array} props The property identifiers.
     * @param {Array} values The property values.
     * @param {Function} assignFunc The function to assign values.
     * @returns {Object} Returns the new object.
     */
    function baseZipObject(props, values, assignFunc) {
      var index = -1,
          length = props.length,
          valsLength = values.length,
          result = {};

      while (++index < length) {
        var value = index < valsLength ? values[index] : undefined;
        assignFunc(result, props[index], value);
      }
      return result;
    }

    /**
     * Casts `value` to an empty array if it's not an array like object.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Array|Object} Returns the cast array-like object.
     */
    function castArrayLikeObject(value) {
      return isArrayLikeObject(value) ? value : [];
    }

    /**
     * Casts `value` to `identity` if it's not a function.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {Function} Returns cast function.
     */
    function castFunction(value) {
      return typeof value == 'function' ? value : identity;
    }

    /**
     * Casts `value` to a path array if it's not one.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {Object} [object] The object to query keys on.
     * @returns {Array} Returns the cast property path array.
     */
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }

    /**
     * A `baseRest` alias which can be replaced with `identity` by module
     * replacement plugins.
     *
     * @private
     * @type {Function}
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    var castRest = baseRest;

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : baseSlice(array, start, end);
    }

    /**
     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
     *
     * @private
     * @param {number|Object} id The timer id or timeout object of the timer to clear.
     */
    var clearTimeout = ctxClearTimeout || function(id) {
      return root.clearTimeout(id);
    };

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /**
     * Compares values to sort them in ascending order.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {number} Returns the sort order indicator for `value`.
     */
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== undefined,
            valIsNull = value === null,
            valIsReflexive = value === value,
            valIsSymbol = isSymbol(value);

        var othIsDefined = other !== undefined,
            othIsNull = other === null,
            othIsReflexive = other === other,
            othIsSymbol = isSymbol(other);

        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
            (valIsNull && othIsDefined && othIsReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
          return 1;
        }
        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }

    /**
     * Used by `_.orderBy` to compare multiple properties of a value to another
     * and stable sort them.
     *
     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
     * specify an order of "desc" for descending or "asc" for ascending sort order
     * of corresponding values.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {boolean[]|string[]} orders The order to sort by for each property.
     * @returns {number} Returns the sort order indicator for `object`.
     */
    function compareMultiple(object, other, orders) {
      var index = -1,
          objCriteria = object.criteria,
          othCriteria = other.criteria,
          length = objCriteria.length,
          ordersLength = orders.length;

      while (++index < length) {
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
          if (index >= ordersLength) {
            return result;
          }
          var order = orders[index];
          return result * (order == 'desc' ? -1 : 1);
        }
      }
      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
      // that causes it, under certain circumstances, to provide the same value for
      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
      // for more details.
      //
      // This also ensures a stable sort in V8 and other engines.
      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
      return object.index - other.index;
    }

    /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgs(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersLength = holders.length,
          leftIndex = -1,
          leftLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(leftLength + rangeLength),
          isUncurried = !isCurried;

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[holders[argsIndex]] = args[argsIndex];
        }
      }
      while (rangeLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }

    /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @params {boolean} [isCurried] Specify composing for a curried function.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgsRight(args, partials, holders, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          holdersIndex = -1,
          holdersLength = holders.length,
          rightIndex = -1,
          rightLength = partials.length,
          rangeLength = nativeMax(argsLength - holdersLength, 0),
          result = Array(rangeLength + rightLength),
          isUncurried = !isCurried;

      while (++argsIndex < rangeLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          result[offset + holders[holdersIndex]] = args[argsIndex++];
        }
      }
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }

    /**
     * Copies own symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }

    /**
     * Copies own and inherited symbols of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbolsIn(source, object) {
      return copyObject(source, getSymbolsIn(source), object);
    }

    /**
     * Creates a function like `_.groupBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} [initializer] The accumulator object initializer.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator,
            accumulator = initializer ? initializer() : {};

        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
      };
    }

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function that wraps `func` to invoke it with the optional `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createBind(func, bitmask, thisArg) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, arguments);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.lowerFirst`.
     *
     * @private
     * @param {string} methodName The name of the `String` case method to use.
     * @returns {Function} Returns the new case function.
     */
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString(string);

        var strSymbols = hasUnicode(string)
          ? stringToArray(string)
          : undefined;

        var chr = strSymbols
          ? strSymbols[0]
          : string.charAt(0);

        var trailing = strSymbols
          ? castSlice(strSymbols, 1).join('')
          : string.slice(1);

        return chr[methodName]() + trailing;
      };
    }

    /**
     * Creates a function like `_.camelCase`.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
      };
    }

    /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCtor(Ctor) {
      return function() {
        // Use a `switch` statement to work with class constructors. See
        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // for more details.
        var args = arguments;
        switch (args.length) {
          case 0: return new Ctor;
          case 1: return new Ctor(args[0]);
          case 2: return new Ctor(args[0], args[1]);
          case 3: return new Ctor(args[0], args[1], args[2]);
          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);

        // Mimic the constructor's `return` behavior.
        // See https://es5.github.io/#x13.2.2 for more details.
        return isObject(result) ? result : thisBinding;
      };
    }

    /**
     * Creates a function that wraps `func` to enable currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {number} arity The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCurry(func, bitmask, arity) {
      var Ctor = createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length,
            placeholder = getHolder(wrapper);

        while (index--) {
          args[index] = arguments[index];
        }
        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
          ? []
          : replaceHolders(args, placeholder);

        length -= holders.length;
        if (length < arity) {
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, undefined,
            args, holders, undefined, undefined, arity - length);
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return apply(fn, this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} findIndexFunc The function to find the collection index.
     * @returns {Function} Returns the new find function.
     */
    function createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike(collection)) {
          var iteratee = getIteratee(predicate, 3);
          collection = keys(collection);
          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
        }
        var index = findIndexFunc(collection, predicate, fromIndex);
        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
      };
    }

    /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
    function createFlow(fromRight) {
      return flatRest(function(funcs) {
        var length = funcs.length,
            index = length,
            prereq = LodashWrapper.prototype.thru;

        if (fromRight) {
          funcs.reverse();
        }
        while (index--) {
          var func = funcs[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
            var wrapper = new LodashWrapper([], true);
          }
        }
        index = wrapper ? index : length;
        while (++index < length) {
          func = funcs[index];

          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : undefined;

          if (data && isLaziable(data[0]) &&
                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                !data[4].length && data[9] == 1
              ) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func))
              ? wrapper[funcName]()
              : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments,
              value = args[0];

          if (wrapper && args.length == 1 && isArray(value)) {
            return wrapper.plant(value).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : value;

          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      });
    }

    /**
     * Creates a function that wraps `func` to invoke it with optional `this`
     * binding of `thisArg`, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided
     *  to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & WRAP_ARY_FLAG,
          isBind = bitmask & WRAP_BIND_FLAG,
          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
          isFlip = bitmask & WRAP_FLIP_FLAG,
          Ctor = isBindKey ? undefined : createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length;

        while (index--) {
          args[index] = arguments[index];
        }
        if (isCurried) {
          var placeholder = getHolder(wrapper),
              holdersCount = countHolders(args, placeholder);
        }
        if (partials) {
          args = composeArgs(args, partials, holders, isCurried);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
        }
        length -= holdersCount;
        if (isCurried && length < arity) {
          var newHolders = replaceHolders(args, placeholder);
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
            args, newHolders, argPos, ary, arity - length
          );
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        length = args.length;
        if (argPos) {
          args = reorder(args, argPos);
        } else if (isFlip && length > 1) {
          args.reverse();
        }
        if (isAry && ary < length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtor(fn);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }

    /**
     * Creates a function like `_.invertBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} toIteratee The function to resolve iteratees.
     * @returns {Function} Returns the new inverter function.
     */
    function createInverter(setter, toIteratee) {
      return function(object, iteratee) {
        return baseInverter(object, setter, toIteratee(iteratee), {});
      };
    }

    /**
     * Creates a function that performs a mathematical operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @param {number} [defaultValue] The value used for `undefined` arguments.
     * @returns {Function} Returns the new mathematical operation function.
     */
    function createMathOperation(operator, defaultValue) {
      return function(value, other) {
        var result;
        if (value === undefined && other === undefined) {
          return defaultValue;
        }
        if (value !== undefined) {
          result = value;
        }
        if (other !== undefined) {
          if (result === undefined) {
            return other;
          }
          if (typeof value == 'string' || typeof other == 'string') {
            value = baseToString(value);
            other = baseToString(other);
          } else {
            value = baseToNumber(value);
            other = baseToNumber(other);
          }
          result = operator(value, other);
        }
        return result;
      };
    }

    /**
     * Creates a function like `_.over`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over iteratees.
     * @returns {Function} Returns the new over function.
     */
    function createOver(arrayFunc) {
      return flatRest(function(iteratees) {
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        return baseRest(function(args) {
          var thisArg = this;
          return arrayFunc(iteratees, function(iteratee) {
            return apply(iteratee, thisArg, args);
          });
        });
      });
    }

    /**
     * Creates the padding for `string` based on `length`. The `chars` string
     * is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {number} length The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padding for `string`.
     */
    function createPadding(length, chars) {
      chars = chars === undefined ? ' ' : baseToString(chars);

      var charsLength = chars.length;
      if (charsLength < 2) {
        return charsLength ? baseRepeat(chars, length) : chars;
      }
      var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
      return hasUnicode(chars)
        ? castSlice(stringToArray(result), 0, length).join('')
        : result.slice(0, length);
    }

    /**
     * Creates a function that wraps `func` to invoke it with the `this` binding
     * of `thisArg` and `partials` prepended to the arguments it receives.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to
     *  the new function.
     * @returns {Function} Returns the new wrapped function.
     */
    function createPartial(func, bitmask, thisArg, partials) {
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);

      function wrapper() {
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength),
            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        return apply(fn, isBind ? thisArg : this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.range` or `_.rangeRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new range function.
     */
    function createRange(fromRight) {
      return function(start, end, step) {
        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
          end = step = undefined;
        }
        // Ensure the sign of `-0` is preserved.
        start = toFinite(start);
        if (end === undefined) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
        return baseRange(start, end, step, fromRight);
      };
    }

    /**
     * Creates a function that performs a relational operation on two values.
     *
     * @private
     * @param {Function} operator The function to perform the operation.
     * @returns {Function} Returns the new relational operation function.
     */
    function createRelationalOperation(operator) {
      return function(value, other) {
        if (!(typeof value == 'string' && typeof other == 'string')) {
          value = toNumber(value);
          other = toNumber(other);
        }
        return operator(value, other);
      };
    }

    /**
     * Creates a function that wraps `func` to continue currying.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @param {Function} wrapFunc The function to create the `func` wrapper.
     * @param {*} placeholder The placeholder value.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to
     *  the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
      var isCurry = bitmask & WRAP_CURRY_FLAG,
          newHolders = isCurry ? holders : undefined,
          newHoldersRight = isCurry ? undefined : holders,
          newPartials = isCurry ? partials : undefined,
          newPartialsRight = isCurry ? undefined : partials;

      bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
      bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

      if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
      }
      var newData = [
        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
        newHoldersRight, argPos, ary, arity
      ];

      var result = wrapFunc.apply(undefined, newData);
      if (isLaziable(func)) {
        setData(result, newData);
      }
      result.placeholder = placeholder;
      return setWrapToString(result, func, bitmask);
    }

    /**
     * Creates a function like `_.round`.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
    function createRound(methodName) {
      var func = Math[methodName];
      return function(number, precision) {
        number = toNumber(number);
        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
        if (precision && nativeIsFinite(number)) {
          // Shift with exponential notation to avoid floating-point issues.
          // See [MDN](https://mdn.io/round#Examples) for more details.
          var pair = (toString(number) + 'e').split('e'),
              value = func(pair[0] + 'e' + (+pair[1] + precision));

          pair = (toString(value) + 'e').split('e');
          return +(pair[0] + 'e' + (+pair[1] - precision));
        }
        return func(number);
      };
    }

    /**
     * Creates a set object of `values`.
     *
     * @private
     * @param {Array} values The values to add to the set.
     * @returns {Object} Returns the new set.
     */
    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
      return new Set(values);
    };

    /**
     * Creates a `_.toPairs` or `_.toPairsIn` function.
     *
     * @private
     * @param {Function} keysFunc The function to get the keys of a given object.
     * @returns {Function} Returns the new pairs function.
     */
    function createToPairs(keysFunc) {
      return function(object) {
        var tag = getTag(object);
        if (tag == mapTag) {
          return mapToArray(object);
        }
        if (tag == setTag) {
          return setToPairs(object);
        }
        return baseToPairs(object, keysFunc(object));
      };
    }

    /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags.
     *    1 - `_.bind`
     *    2 - `_.bindKey`
     *    4 - `_.curry` or `_.curryRight` of a bound function
     *    8 - `_.curry`
     *   16 - `_.curryRight`
     *   32 - `_.partial`
     *   64 - `_.partialRight`
     *  128 - `_.rearg`
     *  256 - `_.ary`
     *  512 - `_.flip`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        partials = holders = undefined;
      }
      ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
      arity = arity === undefined ? arity : toInteger(arity);
      length -= holders ? holders.length : 0;

      if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = undefined;
      }
      var data = isBindKey ? undefined : getData(func);

      var newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
      ];

      if (data) {
        mergeData(newData, data);
      }
      func = newData[0];
      bitmask = newData[1];
      thisArg = newData[2];
      partials = newData[3];
      holders = newData[4];
      arity = newData[9] = newData[9] === undefined
        ? (isBindKey ? 0 : func.length)
        : nativeMax(newData[9] - length, 0);

      if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
      }
      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
        var result = createBind(func, bitmask, thisArg);
      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
        result = createCurry(func, bitmask, arity);
      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
        result = createPartial(func, bitmask, thisArg, partials);
      } else {
        result = createHybrid.apply(undefined, newData);
      }
      var setter = data ? baseSetData : setData;
      return setWrapToString(setter(result, newData), func, bitmask);
    }

    /**
     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
     * of source objects to the destination object for all destination properties
     * that resolve to `undefined`.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to assign.
     * @param {Object} object The parent object of `objValue`.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsAssignIn(objValue, srcValue, key, object) {
      if (objValue === undefined ||
          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
        return srcValue;
      }
      return objValue;
    }

    /**
     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
     * objects into destination objects that are passed thru.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to merge.
     * @param {Object} object The parent object of `objValue`.
     * @param {Object} source The parent object of `srcValue`.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     * @returns {*} Returns the value to assign.
     */
    function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
      if (isObject(objValue) && isObject(srcValue)) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, objValue);
        baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
        stack['delete'](srcValue);
      }
      return objValue;
    }

    /**
     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
     * objects.
     *
     * @private
     * @param {*} value The value to inspect.
     * @param {string} key The key of the property to inspect.
     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
     */
    function customOmitClone(value) {
      return isPlainObject(value) ? undefined : value;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `array` and `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

      stack.set(array, other);
      stack.set(other, array);

      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, arrValue, index, other, array, stack)
            : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (!cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
            result = false;
            break;
          }
        } else if (!(
              arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack)
            )) {
          result = false;
          break;
        }
      }
      stack['delete'](array);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;

        case arrayBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
            return false;
          }
          return true;

        case boolTag:
        case dateTag:
        case numberTag:
          // Coerce booleans to `1` or `0` and dates to milliseconds.
          // Invalid dates are coerced to `NaN`.
          return eq(+object, +other);

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings, primitives and objects,
          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // for more details.
          return object == (other + '');

        case mapTag:
          var convert = mapToArray;

        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);

          if (object.size != other.size && !isPartial) {
            return false;
          }
          // Assume cyclic values are equal.
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;

          // Recursively compare objects (susceptible to call stack limits).
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack['delete'](object);
          return result;

        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
     * @param {Function} customizer The function to customize comparisons.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Object} stack Tracks traversed `object` and `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          objProps = getAllKeys(object),
          objLength = objProps.length,
          othProps = getAllKeys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);

      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];

        if (customizer) {
          var compared = isPartial
            ? customizer(othValue, objValue, key, other, object, stack)
            : customizer(objValue, othValue, key, object, other, stack);
        }
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined
              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
              : compared
            )) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack['delete'](object);
      stack['delete'](other);
      return result;
    }

    /**
     * A specialized version of `baseRest` which flattens the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @returns {Function} Returns the new function.
     */
    function flatRest(func) {
      return setToString(overRest(func, undefined, flatten), func + '');
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    /**
     * Creates an array of own and inherited enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }

    /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };

    /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
    function getFuncName(func) {
      var result = (func.name + ''),
          array = realNames[result],
          length = hasOwnProperty.call(realNames, result) ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }

    /**
     * Gets the argument placeholder value for `func`.
     *
     * @private
     * @param {Function} func The function to inspect.
     * @returns {*} Returns the placeholder value.
     */
    function getHolder(func) {
      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
      return object.placeholder;
    }

    /**
     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
     * this function returns the custom method, otherwise it returns `baseIteratee`.
     * If arguments are provided, the chosen function is invoked with them and
     * its result is returned.
     *
     * @private
     * @param {*} [value] The value to convert to an iteratee.
     * @param {number} [arity] The arity of the created iteratee.
     * @returns {Function} Returns the chosen function or its result.
     */
    function getIteratee() {
      var result = lodash.iteratee || iteratee;
      result = result === iteratee ? baseIteratee : result;
      return arguments.length ? result(arguments[0], arguments[1]) : result;
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the property names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = keys(object),
          length = result.length;

      while (length--) {
        var key = result[length],
            value = object[key];

        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };

    /**
     * Creates an array of the own and inherited enumerable symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
      var result = [];
      while (object) {
        arrayPush(result, getSymbols(object));
        object = getPrototype(object);
      }
      return result;
    };

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map && getTag(new Map) != mapTag) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = baseGetTag(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : '';

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms.length;

      while (++index < length) {
        var data = transforms[index],
            size = data.size;

        switch (data.type) {
          case 'drop':      start += size; break;
          case 'dropRight': end -= size; break;
          case 'take':      end = nativeMin(end, start + size); break;
          case 'takeRight': start = nativeMax(start, end - size); break;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Extracts wrapper details from the `source` body comment.
     *
     * @private
     * @param {string} source The source to inspect.
     * @returns {Array} Returns the wrapper details.
     */
    function getWrapDetails(source) {
      var match = source.match(reWrapDetails);
      return match ? match[1].split(reSplitDetails) : [];
    }

    /**
     * Checks if `path` exists on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @param {Function} hasFunc The function to check properties.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     */
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);

      var index = -1,
          length = path.length,
          result = false;

      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) &&
        (isArray(object) || isArguments(object));
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case dataViewTag:
          return cloneDataView(object, isDeep);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          return cloneTypedArray(object, isDeep);

        case mapTag:
          return new Ctor;

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          return cloneRegExp(object);

        case setTag:
          return new Ctor;

        case symbolTag:
          return cloneSymbol(object);
      }
    }

    /**
     * Inserts wrapper `details` in a comment at the top of the `source` body.
     *
     * @private
     * @param {string} source The source to modify.
     * @returns {Array} details The details to insert.
     * @returns {string} Returns the modified source.
     */
    function insertWrapDetails(source, details) {
      var length = details.length;
      if (!length) {
        return source;
      }
      var lastIndex = length - 1;
      details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
      details = details.join(length > 2 ? ', ' : ' ');
      return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
    }

    /**
     * Checks if `value` is a flattenable `arguments` object or array.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
     */
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) ||
        !!(spreadableSymbol && value && value[spreadableSymbol]);
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike(object) && isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq(object[index], value);
      }
      return false;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
          value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
     *  else `false`.
     */
    function isLaziable(func) {
      var funcName = getFuncName(func),
          other = lodash[funcName];

      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
        return false;
      }
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Checks if `func` is capable of being masked.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
     */
    var isMaskable = coreJsData ? isFunction : stubFalse;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

      return value === proto;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * A specialized version of `matchesProperty` for source values suitable
     * for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     */
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue &&
          (srcValue !== undefined || (key in Object(object)));
      };
    }

    /**
     * A specialized version of `_.memoize` which clears the memoized function's
     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
     *
     * @private
     * @param {Function} func The function to have its output memoized.
     * @returns {Function} Returns the new memoized function.
     */
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });

      var cache = result.cache;
      return result;
    }

    /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers used to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and
     * `_.rearg` modify function arguments, making the order in which they are
     * executed important, preventing the merging of metadata. However, we make
     * an exception for a safe combined case where curried functions have `_.ary`
     * and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

      var isCombo =
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

      // Exit early if metadata can't be merged.
      if (!(isCommon || isCombo)) {
        return data;
      }
      // Use source `thisArg` if available.
      if (srcBitmask & WRAP_BIND_FLAG) {
        data[2] = source[2];
        // Set when currying a bound function.
        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
      }
      // Compose partial arguments.
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
      }
      // Compose partial right arguments.
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
      }
      // Use source `argPos` if available.
      value = source[7];
      if (value) {
        data[7] = value;
      }
      // Use source `ary` if it's smaller.
      if (srcBitmask & WRAP_ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      // Use source `arity` if one is not provided.
      if (data[9] == null) {
        data[9] = source[9];
      }
      // Use source `func` and merge bitmasks.
      data[0] = source[0];
      data[1] = newBitmask;

      return data;
    }

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }

    /**
     * Gets the parent value at `path` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path to get the parent value of.
     * @returns {*} Returns the parent value.
     */
    function parent(object, path) {
      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
    }

    /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = copyArray(array);

      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
      }
      return array;
    }

    /**
     * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function safeGet(object, key) {
      if (key === 'constructor' && typeof object[key] === 'function') {
        return;
      }

      if (key == '__proto__') {
        return;
      }

      return object[key];
    }

    /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity
     * function to avoid garbage collection pauses in V8. See
     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var setData = shortOut(baseSetData);

    /**
     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @returns {number|Object} Returns the timer id or timeout object.
     */
    var setTimeout = ctxSetTimeout || function(func, wait) {
      return root.setTimeout(func, wait);
    };

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = shortOut(baseSetToString);

    /**
     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
     * with wrapper details in a comment at the top of the source body.
     *
     * @private
     * @param {Function} wrapper The function to modify.
     * @param {Function} reference The reference function.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Function} Returns `wrapper`.
     */
    function setWrapToString(wrapper, reference, bitmask) {
      var source = (reference + '');
      return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
    }

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    /**
     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
     *
     * @private
     * @param {Array} array The array to shuffle.
     * @param {number} [size=array.length] The size of `array`.
     * @returns {Array} Returns `array`.
     */
    function shuffleSelf(array, size) {
      var index = -1,
          length = array.length,
          lastIndex = length - 1;

      size = size === undefined ? length : size;
      while (++index < size) {
        var rand = baseRandom(index, lastIndex),
            value = array[rand];

        array[rand] = array[index];
        array[index] = value;
      }
      array.length = size;
      return array;
    }

    /**
     * Converts `string` to a property path array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the property path array.
     */
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    });

    /**
     * Converts `value` to a string key if it's not a string or symbol.
     *
     * @private
     * @param {*} value The value to inspect.
     * @returns {string|symbol} Returns the key.
     */
    function toKey(value) {
      if (typeof value == 'string' || isSymbol(value)) {
        return value;
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Updates wrapper `details` based on `bitmask` flags.
     *
     * @private
     * @returns {Array} details The details to modify.
     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
     * @returns {Array} Returns `details`.
     */
    function updateWrapDetails(details, bitmask) {
      arrayEach(wrapFlags, function(pair) {
        var value = '_.' + pair[0];
        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
          details.push(value);
        }
      });
      return details.sort();
    }

    /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
    function wrapperClone(wrapper) {
      if (wrapper instanceof LazyWrapper) {
        return wrapper.clone();
      }
      var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
      result.__actions__ = copyArray(wrapper.__actions__);
      result.__index__  = wrapper.__index__;
      result.__values__ = wrapper.__values__;
      return result;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `array` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the new array of chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(array, size, guard) {
      if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
        size = 1;
      } else {
        size = nativeMax(toInteger(size), 0);
      }
      var length = array == null ? 0 : array.length;
      if (!length || size < 1) {
        return [];
      }
      var index = 0,
          resIndex = 0,
          result = Array(nativeCeil(length / size));

      while (index < length) {
        result[resIndex++] = baseSlice(array, index, (index += size));
      }
      return result;
    }

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array == null ? 0 : array.length,
          resIndex = 0,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[resIndex++] = value;
        }
      }
      return result;
    }

    /**
     * Creates a new array concatenating `array` with any additional arrays
     * and/or values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to concatenate.
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var other = _.concat(array, 2, [3], [[4]]);
     *
     * console.log(other);
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */
    function concat() {
      var length = arguments.length;
      if (!length) {
        return [];
      }
      var args = Array(length - 1),
          array = arguments[0],
          index = length;

      while (index--) {
        args[index - 1] = arguments[index];
      }
      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
    }

    /**
     * Creates an array of `array` values not included in the other given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * **Note:** Unlike `_.pullAll`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.without, _.xor
     * @example
     *
     * _.difference([2, 1], [2, 3]);
     * // => [1]
     */
    var difference = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `iteratee` which
     * is invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var differenceBy = baseRest(function(array, values) {
      var iteratee = last(values);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.difference` except that it accepts `comparator`
     * which is invoked to compare elements of `array` to `values`. The order and
     * references of result values are determined by the first array. The comparator
     * is invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The values to exclude.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     *
     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }]
     */
    var differenceWith = baseRest(function(array, values) {
      var comparator = last(values);
      if (isArrayLikeObject(comparator)) {
        comparator = undefined;
      }
      return isArrayLikeObject(array)
        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
        : [];
    });

    /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function drop(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function dropRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.dropRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropRightWhile(users, ['active', false]);
     * // => objects for ['barney']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropRightWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true, true)
        : [];
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.dropWhile(users, function(o) { return !o.active; });
     * // => objects for ['pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.dropWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.dropWhile(users, ['active', false]);
     * // => objects for ['pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.dropWhile(users, 'active');
     * // => objects for ['barney', 'fred', 'pebbles']
     */
    function dropWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), true)
        : [];
    }

    /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8, 10], '*', 1, 3);
     * // => [4, '*', '*', 10]
     */
    function fill(array, value, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // The `_.matches` iteratee shorthand.
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findIndex(users, ['active', false]);
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.findIndex(users, 'active');
     * // => 2
     */
    function findIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index);
    }

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
     * // => 2
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastIndex(users, ['active', false]);
     * // => 2
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastIndex(users, 'active');
     * // => 0
     */
    function findLastIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length - 1;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = fromIndex < 0
          ? nativeMax(length + index, 0)
          : nativeMin(index, length - 1);
      }
      return baseFindIndex(array, getIteratee(predicate, 3), index, true);
    }

    /**
     * Flattens `array` a single level deep.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }

    /**
     * Recursively flattens `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    function flattenDeep(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, INFINITY) : [];
    }

    /**
     * Recursively flatten `array` up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * var array = [1, [2, [3, [4]], 5]];
     *
     * _.flattenDepth(array, 1);
     * // => [1, 2, [3, [4]], 5]
     *
     * _.flattenDepth(array, 2);
     * // => [1, 2, 3, [4], 5]
     */
    function flattenDepth(array, depth) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(array, depth);
    }

    /**
     * The inverse of `_.toPairs`; this method returns an object composed
     * from key-value `pairs`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} pairs The key-value pairs.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.fromPairs([['a', 1], ['b', 2]]);
     * // => { 'a': 1, 'b': 2 }
     */
    function fromPairs(pairs) {
      var index = -1,
          length = pairs == null ? 0 : pairs.length,
          result = {};

      while (++index < length) {
        var pair = pairs[index];
        result[pair[0]] = pair[1];
      }
      return result;
    }

    /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias first
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.head([1, 2, 3]);
     * // => 1
     *
     * _.head([]);
     * // => undefined
     */
    function head(array) {
      return (array && array.length) ? array[0] : undefined;
    }

    /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it's used as the
     * offset from the end of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // Search from the `fromIndex`.
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     */
    function indexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseIndexOf(array, value, index);
    }

    /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
    function initial(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 0, -1) : [];
    }

    /**
     * Creates an array of unique values that are included in all given arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons. The order and references of result values are
     * determined by the first array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersection([2, 1], [2, 3]);
     * // => [2]
     */
    var intersection = baseRest(function(arrays) {
      var mapped = arrayMap(arrays, castArrayLikeObject);
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped)
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `iteratee`
     * which is invoked for each element of each `arrays` to generate the criterion
     * by which they're compared. The order and references of result values are
     * determined by the first array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [2.1]
     *
     * // The `_.property` iteratee shorthand.
     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }]
     */
    var intersectionBy = baseRest(function(arrays) {
      var iteratee = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      if (iteratee === last(mapped)) {
        iteratee = undefined;
      } else {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, getIteratee(iteratee, 2))
        : [];
    });

    /**
     * This method is like `_.intersection` except that it accepts `comparator`
     * which is invoked to compare elements of `arrays`. The order and references
     * of result values are determined by the first array. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of intersecting values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.intersectionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }]
     */
    var intersectionWith = baseRest(function(arrays) {
      var comparator = last(arrays),
          mapped = arrayMap(arrays, castArrayLikeObject);

      comparator = typeof comparator == 'function' ? comparator : undefined;
      if (comparator) {
        mapped.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapped, undefined, comparator)
        : [];
    });

    /**
     * Converts all elements in `array` into a string separated by `separator`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to convert.
     * @param {string} [separator=','] The element separator.
     * @returns {string} Returns the joined string.
     * @example
     *
     * _.join(['a', 'b', 'c'], '~');
     * // => 'a~b~c'
     */
    function join(array, separator) {
      return array == null ? '' : nativeJoin.call(array, separator);
    }

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : undefined;
    }

    /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=array.length-1] The index to search from.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // Search from the `fromIndex`.
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = length;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
      }
      return value === value
        ? strictLastIndexOf(array, value, index)
        : baseFindIndex(array, baseIsNaN, index, true);
    }

    /**
     * Gets the element at index `n` of `array`. If `n` is negative, the nth
     * element from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.11.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=0] The index of the element to return.
     * @returns {*} Returns the nth element of `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     *
     * _.nth(array, 1);
     * // => 'b'
     *
     * _.nth(array, -2);
     * // => 'c';
     */
    function nth(array, n) {
      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
    }

    /**
     * Removes all given values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
     * to remove elements from an array by predicate.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pull(array, 'a', 'c');
     * console.log(array);
     * // => ['b', 'b']
     */
    var pull = baseRest(pullAll);

    /**
     * This method is like `_.pull` except that it accepts an array of values to remove.
     *
     * **Note:** Unlike `_.difference`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pullAll(array, ['a', 'c']);
     * console.log(array);
     * // => ['b', 'b']
     */
    function pullAll(array, values) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values)
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `iteratee` which is
     * invoked for each element of `array` and `values` to generate the criterion
     * by which they're compared. The iteratee is invoked with one argument: (value).
     *
     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
     *
     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
     * console.log(array);
     * // => [{ 'x': 2 }]
     */
    function pullAllBy(array, values, iteratee) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, getIteratee(iteratee, 2))
        : array;
    }

    /**
     * This method is like `_.pullAll` except that it accepts `comparator` which
     * is invoked to compare elements of `array` to `values`. The comparator is
     * invoked with two arguments: (arrVal, othVal).
     *
     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Array} values The values to remove.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
     *
     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
     * console.log(array);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
     */
    function pullAllWith(array, values, comparator) {
      return (array && array.length && values && values.length)
        ? basePullAll(array, values, undefined, comparator)
        : array;
    }

    /**
     * Removes elements from `array` corresponding to `indexes` and returns an
     * array of removed elements.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = ['a', 'b', 'c', 'd'];
     * var pulled = _.pullAt(array, [1, 3]);
     *
     * console.log(array);
     * // => ['a', 'c']
     *
     * console.log(pulled);
     * // => ['b', 'd']
     */
    var pullAt = flatRest(function(array, indexes) {
      var length = array == null ? 0 : array.length,
          result = baseAt(array, indexes);

      basePullAt(array, arrayMap(indexes, function(index) {
        return isIndex(index, length) ? +index : index;
      }).sort(compareAscending));

      return result;
    });

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is invoked
     * with three arguments: (value, index, array).
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
     * to pull elements from an array by value.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = getIteratee(predicate, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }

    /**
     * Reverses `array` so that the first element becomes the last, the second
     * element becomes the second to last, and so on.
     *
     * **Note:** This method mutates `array` and is based on
     * [`Array#reverse`](https://mdn.io/Array/reverse).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to modify.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.reverse(array);
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function reverse(array) {
      return array == null ? array : nativeReverse.call(array);
    }

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of
     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
     * returned.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function slice(array, start, end) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      else {
        start = start == null ? 0 : toInteger(start);
        end = end === undefined ? length : toInteger(end);
      }
      return baseSlice(array, start, end);
    }

    /**
     * Uses a binary search to determine the lowest index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     */
    function sortedIndex(array, value) {
      return baseSortedIndex(array, value);
    }

    /**
     * This method is like `_.sortedIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 0
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
     * // => 0
     */
    function sortedIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
    }

    /**
     * This method is like `_.indexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
     * // => 1
     */
    function sortedIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value);
        if (index < length && eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
     * // => 4
     */
    function sortedLastIndex(array, value) {
      return baseSortedIndex(array, value, true);
    }

    /**
     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
     * which is invoked for `value` and each element of `array` to compute their
     * sort ranking. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * var objects = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
     * // => 1
     *
     * // The `_.property` iteratee shorthand.
     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
     * // => 1
     */
    function sortedLastIndexBy(array, value, iteratee) {
      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
    }

    /**
     * This method is like `_.lastIndexOf` except that it performs a binary
     * search on a sorted `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
     * // => 3
     */
    function sortedLastIndexOf(array, value) {
      var length = array == null ? 0 : array.length;
      if (length) {
        var index = baseSortedIndex(array, value, true) - 1;
        if (eq(array[index], value)) {
          return index;
        }
      }
      return -1;
    }

    /**
     * This method is like `_.uniq` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniq([1, 1, 2]);
     * // => [1, 2]
     */
    function sortedUniq(array) {
      return (array && array.length)
        ? baseSortedUniq(array)
        : [];
    }

    /**
     * This method is like `_.uniqBy` except that it's designed and optimized
     * for sorted arrays.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
     * // => [1.1, 2.3]
     */
    function sortedUniqBy(array, iteratee) {
      return (array && array.length)
        ? baseSortedUniq(array, getIteratee(iteratee, 2))
        : [];
    }

    /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.tail([1, 2, 3]);
     * // => [2, 3]
     */
    function tail(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseSlice(array, 1, length) : [];
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    function take(array, n, guard) {
      if (!(array && array.length)) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(array, n, guard) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return [];
      }
      n = (guard || n === undefined) ? 1 : toInteger(n);
      n = length - n;
      return baseSlice(array, n < 0 ? 0 : n, length);
    }

    /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.takeRightWhile(users, function(o) { return !o.active; });
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => objects for ['pebbles']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeRightWhile(users, ['active', false]);
     * // => objects for ['fred', 'pebbles']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeRightWhile(users, 'active');
     * // => []
     */
    function takeRightWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3), false, true)
        : [];
    }

    /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is invoked with
     * three arguments: (value, index, array).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.takeWhile(users, function(o) { return !o.active; });
     * // => objects for ['barney', 'fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.takeWhile(users, { 'user': 'barney', 'active': false });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.takeWhile(users, ['active', false]);
     * // => objects for ['barney', 'fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.takeWhile(users, 'active');
     * // => []
     */
    function takeWhile(array, predicate) {
      return (array && array.length)
        ? baseWhile(array, getIteratee(predicate, 3))
        : [];
    }

    /**
     * Creates an array of unique values, in order, from all given arrays using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([2], [1, 2]);
     * // => [2, 1]
     */
    var union = baseRest(function(arrays) {
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
    });

    /**
     * This method is like `_.union` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which uniqueness is computed. Result values are chosen from the first
     * array in which the value occurs. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    var unionBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.union` except that it accepts `comparator` which
     * is invoked to compare elements of `arrays`. Result values are chosen from
     * the first array in which the value occurs. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.unionWith(objects, others, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var unionWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator);
    });

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurrence of each element
     * is kept. The order of result values is determined by the order they occur
     * in the array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     */
    function uniq(array) {
      return (array && array.length) ? baseUniq(array) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * uniqueness is computed. The order of result values is determined by the
     * order they occur in the array. The iteratee is invoked with one argument:
     * (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
     * // => [2.1, 1.2]
     *
     * // The `_.property` iteratee shorthand.
     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniqBy(array, iteratee) {
      return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
    }

    /**
     * This method is like `_.uniq` except that it accepts `comparator` which
     * is invoked to compare elements of `array`. The order of result values is
     * determined by the order they occur in the array.The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new duplicate free array.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.uniqWith(objects, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
     */
    function uniqWith(array, comparator) {
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return (array && array.length) ? baseUniq(array, undefined, comparator) : [];
    }

    /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @since 1.2.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     *
     * _.unzip(zipped);
     * // => [['a', 'b'], [1, 2], [true, false]]
     */
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var length = 0;
      array = arrayFilter(array, function(group) {
        if (isArrayLikeObject(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      return baseTimes(length, function(index) {
        return arrayMap(array, baseProperty(index));
      });
    }

    /**
     * This method is like `_.unzip` except that it accepts `iteratee` to specify
     * how regrouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  regrouped values.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(array, iteratee) {
      if (!(array && array.length)) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      return arrayMap(result, function(group) {
        return apply(iteratee, undefined, group);
      });
    }

    /**
     * Creates an array excluding all given values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.pull`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.xor
     * @example
     *
     * _.without([2, 1, 2, 3], 1, 2);
     * // => [3]
     */
    var without = baseRest(function(array, values) {
      return isArrayLikeObject(array)
        ? baseDifference(array, values)
        : [];
    });

    /**
     * Creates an array of unique values that is the
     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the given arrays. The order of result values is determined by the order
     * they occur in the arrays.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of filtered values.
     * @see _.difference, _.without
     * @example
     *
     * _.xor([2, 1], [2, 3]);
     * // => [1, 3]
     */
    var xor = baseRest(function(arrays) {
      return baseXor(arrayFilter(arrays, isArrayLikeObject));
    });

    /**
     * This method is like `_.xor` except that it accepts `iteratee` which is
     * invoked for each element of each `arrays` to generate the criterion by
     * which by which they're compared. The order of result values is determined
     * by the order they occur in the arrays. The iteratee is invoked with one
     * argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2, 3.4]
     *
     * // The `_.property` iteratee shorthand.
     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var xorBy = baseRest(function(arrays) {
      var iteratee = last(arrays);
      if (isArrayLikeObject(iteratee)) {
        iteratee = undefined;
      }
      return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
    });

    /**
     * This method is like `_.xor` except that it accepts `comparator` which is
     * invoked to compare elements of `arrays`. The order of result values is
     * determined by the order they occur in the arrays. The comparator is invoked
     * with two arguments: (arrVal, othVal).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @param {Function} [comparator] The comparator invoked per element.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.xorWith(objects, others, _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var xorWith = baseRest(function(arrays) {
      var comparator = last(arrays);
      comparator = typeof comparator == 'function' ? comparator : undefined;
      return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
    });

    /**
     * Creates an array of grouped elements, the first of which contains the
     * first elements of the given arrays, the second of which contains the
     * second elements of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['a', 'b'], [1, 2], [true, false]);
     * // => [['a', 1, true], ['b', 2, false]]
     */
    var zip = baseRest(unzip);

    /**
     * This method is like `_.fromPairs` except that it accepts two arrays,
     * one of property identifiers and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 0.4.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject(['a', 'b'], [1, 2]);
     * // => { 'a': 1, 'b': 2 }
     */
    function zipObject(props, values) {
      return baseZipObject(props || [], values || [], assignValue);
    }

    /**
     * This method is like `_.zipObject` except that it supports property paths.
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Array
     * @param {Array} [props=[]] The property identifiers.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
     */
    function zipObjectDeep(props, values) {
      return baseZipObject(props || [], values || [], baseSet);
    }

    /**
     * This method is like `_.zip` except that it accepts `iteratee` to specify
     * how grouped values should be combined. The iteratee is invoked with the
     * elements of each group: (...group).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee=_.identity] The function to combine
     *  grouped values.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
     *   return a + b + c;
     * });
     * // => [111, 222]
     */
    var zipWith = baseRest(function(arrays) {
      var length = arrays.length,
          iteratee = length > 1 ? arrays[length - 1] : undefined;

      iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined;
      return unzipWith(arrays, iteratee);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
     * chain sequences enabled. The result of such sequences must be unwrapped
     * with `_#value`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Seq
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _
     *   .chain(users)
     *   .sortBy('age')
     *   .map(function(o) {
     *     return o.user + ' is ' + o.age;
     *   })
     *   .head()
     *   .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }

    /**
     * This method invokes `interceptor` and returns `value`. The interceptor
     * is invoked with one argument; (value). The purpose of this method is to
     * "tap into" a method chain sequence in order to modify intermediate results.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    // Mutate input array.
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }

    /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     * The purpose of this method is to "pass thru" values replacing intermediate
     * results in a method chain sequence.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Seq
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
    function thru(value, interceptor) {
      return interceptor(value);
    }

    /**
     * This method is the wrapper version of `_.at`.
     *
     * @name at
     * @memberOf _
     * @since 1.0.0
     * @category Seq
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _(object).at(['a[0].b.c', 'a[1]']).value();
     * // => [3, 4]
     */
    var wrapperAt = flatRest(function(paths) {
      var length = paths.length,
          start = length ? paths[0] : 0,
          value = this.__wrapped__,
          interceptor = function(object) { return baseAt(object, paths); };

      if (length > 1 || this.__actions__.length ||
          !(value instanceof LazyWrapper) || !isIndex(start)) {
        return this.thru(interceptor);
      }
      value = value.slice(start, +start + (length ? 1 : 0));
      value.__actions__.push({
        'func': thru,
        'args': [interceptor],
        'thisArg': undefined
      });
      return new LodashWrapper(value, this.__chain__).thru(function(array) {
        if (length && !array.length) {
          array.push(undefined);
        }
        return array;
      });
    });

    /**
     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
     *
     * @name chain
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // A sequence without explicit chaining.
     * _(users).head();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // A sequence with explicit chaining.
     * _(users)
     *   .chain()
     *   .head()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
    function wrapperChain() {
      return chain(this);
    }

    /**
     * Executes the chain sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Gets the next value on a wrapped object following the
     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
     *
     * @name next
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the next iterator value.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 1 }
     *
     * wrapped.next();
     * // => { 'done': false, 'value': 2 }
     *
     * wrapped.next();
     * // => { 'done': true, 'value': undefined }
     */
    function wrapperNext() {
      if (this.__values__ === undefined) {
        this.__values__ = toArray(this.value());
      }
      var done = this.__index__ >= this.__values__.length,
          value = done ? undefined : this.__values__[this.__index__++];

      return { 'done': done, 'value': value };
    }

    /**
     * Enables the wrapper to be iterable.
     *
     * @name Symbol.iterator
     * @memberOf _
     * @since 4.0.0
     * @category Seq
     * @returns {Object} Returns the wrapper object.
     * @example
     *
     * var wrapped = _([1, 2]);
     *
     * wrapped[Symbol.iterator]() === wrapped;
     * // => true
     *
     * Array.from(wrapped);
     * // => [1, 2]
     */
    function wrapperToIterator() {
      return this;
    }

    /**
     * Creates a clone of the chain sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @since 3.2.0
     * @category Seq
     * @param {*} value The value to plant.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var wrapped = _([1, 2]).map(square);
     * var other = wrapped.plant([3, 4]);
     *
     * other.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */
    function wrapperPlant(value) {
      var result,
          parent = this;

      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        clone.__index__ = 0;
        clone.__values__ = undefined;
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }

    /**
     * This method is the wrapper version of `_.reverse`.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @since 0.1.0
     * @category Seq
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function wrapperReverse() {
      var value = this.__wrapped__;
      if (value instanceof LazyWrapper) {
        var wrapped = value;
        if (this.__actions__.length) {
          wrapped = new LazyWrapper(this);
        }
        wrapped = wrapped.reverse();
        wrapped.__actions__.push({
          'func': thru,
          'args': [reverse],
          'thisArg': undefined
        });
        return new LodashWrapper(wrapped, this.__chain__);
      }
      return this.thru(reverse);
    }

    /**
     * Executes the chain sequence to resolve the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @since 0.1.0
     * @alias toJSON, valueOf
     * @category Seq
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the number of times the key was returned by `iteratee`. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': 1, '6': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        ++result[key];
      } else {
        baseAssignValue(result, key, 1);
      }
    });

    /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * Iteration is stopped once `predicate` returns falsey. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * **Note:** This method returns `true` for
     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
     * elements of empty collections.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.every(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.every(users, 'active');
     * // => false
     */
    function every(collection, predicate, guard) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * **Note:** Unlike `_.remove`, this method returns a new array.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.reject
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, { 'age': 36, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.filter(users, 'active');
     * // => objects for ['barney']
     */
    function filter(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is invoked with three
     * arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.find(users, function(o) { return o.age < 40; });
     * // => object for 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.find(users, { 'age': 1, 'active': true });
     * // => object for 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.find(users, ['active', false]);
     * // => object for 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.find(users, 'active');
     * // => object for 'barney'
     */
    var find = createFind(findIndex);

    /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param {number} [fromIndex=collection.length-1] The index to search from.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(findLastIndex);

    /**
     * Creates a flattened array of values by running each element in `collection`
     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
     * with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [n, n];
     * }
     *
     * _.flatMap([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMap(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), 1);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDeep([1, 2], duplicate);
     * // => [1, 1, 2, 2]
     */
    function flatMapDeep(collection, iteratee) {
      return baseFlatten(map(collection, iteratee), INFINITY);
    }

    /**
     * This method is like `_.flatMap` except that it recursively flattens the
     * mapped results up to `depth` times.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {number} [depth=1] The maximum recursion depth.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * function duplicate(n) {
     *   return [[[n, n]]];
     * }
     *
     * _.flatMapDepth([1, 2], duplicate, 2);
     * // => [[1, 1], [2, 2]]
     */
    function flatMapDepth(collection, iteratee, depth) {
      depth = depth === undefined ? 1 : toInteger(depth);
      return baseFlatten(map(collection, iteratee), depth);
    }

    /**
     * Iterates over elements of `collection` and invokes `iteratee` for each element.
     * The iteratee is invoked with three arguments: (value, index|key, collection).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length"
     * property are iterated like arrays. To avoid this behavior use `_.forIn`
     * or `_.forOwn` for object iteration.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @alias each
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEachRight
     * @example
     *
     * _.forEach([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `1` then `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forEach(collection, iteratee) {
      var func = isArray(collection) ? arrayEach : baseEach;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @alias eachRight
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array|Object} Returns `collection`.
     * @see _.forEach
     * @example
     *
     * _.forEachRight([1, 2], function(value) {
     *   console.log(value);
     * });
     * // => Logs `2` then `1`.
     */
    function forEachRight(collection, iteratee) {
      var func = isArray(collection) ? arrayEachRight : baseEachRight;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The order of grouped values
     * is determined by the order they occur in `collection`. The corresponding
     * value of each key is an array of elements responsible for generating the
     * key. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': [4.2], '6': [6.1, 6.3] }
     *
     * // The `_.property` iteratee shorthand.
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        baseAssignValue(result, key, [value]);
      }
    });

    /**
     * Checks if `value` is in `collection`. If `collection` is a string, it's
     * checked for a substring of `value`, otherwise
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * is used for equality comparisons. If `fromIndex` is negative, it's used as
     * the offset from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {boolean} Returns `true` if `value` is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'a': 1, 'b': 2 }, 1);
     * // => true
     *
     * _.includes('abcd', 'bc');
     * // => true
     */
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection)
        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
        : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
    }

    /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `path` is a function, it's invoked
     * for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke each method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invokeMap([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invokeMap = baseRest(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value) {
        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
      });
      return result;
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` thru `iteratee`. The corresponding value of
     * each key is the last element responsible for generating the key. The
     * iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var array = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.keyBy(array, function(o) {
     *   return String.fromCharCode(o.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.keyBy(array, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     */
    var keyBy = createAggregator(function(result, value, key) {
      baseAssignValue(result, key, value);
    });

    /**
     * Creates an array of values by running each element in `collection` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * _.map([4, 8], square);
     * // => [16, 64]
     *
     * _.map({ 'a': 4, 'b': 8 }, square);
     * // => [16, 64] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee) {
      var func = isArray(collection) ? arrayMap : baseMap;
      return func(collection, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.sortBy` except that it allows specifying the sort
     * orders of the iteratees to sort by. If `orders` is unspecified, all values
     * are sorted in ascending order. Otherwise, specify an order of "desc" for
     * descending or "asc" for ascending sort order of corresponding values.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @param {string[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // Sort by `user` in ascending order and by `age` in descending order.
     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     */
    function orderBy(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      orders = guard ? undefined : orders;
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseOrderBy(collection, iteratees, orders);
    }

    /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, the second of which
     * contains elements `predicate` returns falsey for. The predicate is
     * invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * _.partition(users, function(o) { return o.active; });
     * // => objects for [['fred'], ['barney', 'pebbles']]
     *
     * // The `_.matches` iteratee shorthand.
     * _.partition(users, { 'age': 1, 'active': false });
     * // => objects for [['pebbles'], ['barney', 'fred']]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.partition(users, ['active', false]);
     * // => objects for [['barney', 'pebbles'], ['fred']]
     *
     * // The `_.property` iteratee shorthand.
     * _.partition(users, 'active');
     * // => objects for [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() { return [[], []]; });

    /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` thru `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not given, the first element of `collection` is used as the initial
     * value. The iteratee is invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
     * and `sortBy`
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduceRight
     * @example
     *
     * _.reduce([1, 2], function(sum, n) {
     *   return sum + n;
     * }, 0);
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     *   return result;
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
     */
    function reduce(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduce : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
    }

    /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @returns {*} Returns the accumulated value.
     * @see _.reduce
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    function reduceRight(collection, iteratee, accumulator) {
      var func = isArray(collection) ? arrayReduceRight : baseReduce,
          initAccum = arguments.length < 3;

      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
    }

    /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     * @see _.filter
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * _.reject(users, function(o) { return !o.active; });
     * // => objects for ['fred']
     *
     * // The `_.matches` iteratee shorthand.
     * _.reject(users, { 'age': 40, 'active': true });
     * // => objects for ['barney']
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.reject(users, ['active', false]);
     * // => objects for ['fred']
     *
     * // The `_.property` iteratee shorthand.
     * _.reject(users, 'active');
     * // => objects for ['barney']
     */
    function reject(collection, predicate) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      return func(collection, negate(getIteratee(predicate, 3)));
    }

    /**
     * Gets a random element from `collection`.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @returns {*} Returns the random element.
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     */
    function sample(collection) {
      var func = isArray(collection) ? arraySample : baseSample;
      return func(collection);
    }

    /**
     * Gets `n` random elements at unique keys from `collection` up to the
     * size of `collection`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Collection
     * @param {Array|Object} collection The collection to sample.
     * @param {number} [n=1] The number of elements to sample.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the random elements.
     * @example
     *
     * _.sampleSize([1, 2, 3], 2);
     * // => [3, 1]
     *
     * _.sampleSize([1, 2, 3], 4);
     * // => [2, 3, 1]
     */
    function sampleSize(collection, n, guard) {
      if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      var func = isArray(collection) ? arraySampleSize : baseSampleSize;
      return func(collection, n);
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    function shuffle(collection) {
      var func = isArray(collection) ? arrayShuffle : baseShuffle;
      return func(collection);
    }

    /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable string keyed properties for objects.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the collection size.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      if (collection == null) {
        return 0;
      }
      if (isArrayLike(collection)) {
        return isString(collection) ? stringSize(collection) : collection.length;
      }
      var tag = getTag(collection);
      if (tag == mapTag || tag == setTag) {
        return collection.size;
      }
      return baseKeys(collection).length;
    }

    /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * Iteration is stopped once `predicate` returns truthy. The predicate is
     * invoked with three arguments: (value, index|key, collection).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.some(users, ['active', false]);
     * // => true
     *
     * // The `_.property` iteratee shorthand.
     * _.some(users, 'active');
     * // => true
     */
    function some(collection, predicate, guard) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (guard && isIterateeCall(collection, predicate, guard)) {
        predicate = undefined;
      }
      return func(collection, getIteratee(predicate, 3));
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection thru each iteratee. This method
     * performs a stable sort, that is, it preserves the original sort order of
     * equal elements. The iteratees are invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Collection
     * @param {Array|Object} collection The collection to iterate over.
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to sort by.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.sortBy(users, [function(o) { return o.user; }]);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
     *
     * _.sortBy(users, ['user', 'age']);
     * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
     */
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Gets the timestamp of the number of milliseconds that have elapsed since
     * the Unix epoch (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Date
     * @returns {number} Returns the timestamp.
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => Logs the number of milliseconds it took for the deferred invocation.
     */
    var now = ctxNow || function() {
      return root.Date.now();
    };

    /*------------------------------------------------------------------------*/

    /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it's called `n` or more times.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => Logs 'done saving!' after the two async saves have completed.
     */
    function after(n, func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that invokes `func`, with up to `n` arguments,
     * ignoring any additional arguments.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    function ary(func, n, guard) {
      n = guard ? undefined : n;
      n = (func && n == null) ? func.length : n;
      return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
    }

    /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it's called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery(element).on('click', _.before(5, addContactToList));
     * // => Allows adding up to 4 contacts to the list.
     */
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined;
        }
        return result;
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and `partials` prepended to the arguments it receives.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * function greet(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * }
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
    var bind = baseRest(function(func, thisArg, partials) {
      var bitmask = WRAP_BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bind));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(func, bitmask, thisArg, partials, holders);
    });

    /**
     * Creates a function that invokes the method at `object[key]` with `partials`
     * prepended to the arguments it receives.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist. See
     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Function
     * @param {Object} object The object to invoke the method on.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // Bound with placeholders.
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
    var bindKey = baseRest(function(object, key, partials) {
      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, getHolder(bindKey));
        bitmask |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(key, bitmask, object, partials, holders);
    });

    /**
     * Creates a function that accepts arguments of `func` and either invokes
     * `func` returning its result, if at least `arity` number of arguments have
     * been provided, or returns a function that accepts the remaining `func`
     * arguments, and so on. The arity of `func` may be specified if `func.length`
     * is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    function curry(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curry.placeholder;
      return result;
    }

    /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method doesn't set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried with placeholders.
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    function curryRight(func, arity, guard) {
      arity = guard ? undefined : arity;
      var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      result.placeholder = curryRight.placeholder;
      return result;
    }

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed `func` invocations and a `flush` method to immediately invoke them.
     * Provide `options` to indicate whether `func` should be invoked on the
     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
     * with the last arguments provided to the debounced function. Subsequent
     * calls to the debounced function return the result of the last `func`
     * invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the debounced function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=false]
     *  Specify invoking on the leading edge of the timeout.
     * @param {number} [options.maxWait]
     *  The maximum time `func` is allowed to be delayed before it's invoked.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // Avoid costly calculations while the window size is in flux.
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
     * jQuery(element).on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', debounced);
     *
     * // Cancel the trailing debounced invocation.
     * jQuery(window).on('popstate', debounced.cancel);
     */
    function debounce(func, wait, options) {
      var lastArgs,
          lastThis,
          maxWait,
          result,
          timerId,
          lastCallTime,
          lastInvokeTime = 0,
          leading = false,
          maxing = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }

      function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
      }

      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            timeWaiting = wait - timeSinceLastCall;

        return maxing
          ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
          : timeWaiting;
      }

      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
      }

      function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
      }

      function cancel() {
        if (timerId !== undefined) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
      }

      function flush() {
        return timerId === undefined ? result : trailingEdge(now());
      }

      function debounced() {
        var time = now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
          if (timerId === undefined) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            // Handle invocations in a tight loop.
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === undefined) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }

    /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // => Logs 'deferred' after one millisecond.
     */
    var defer = baseRest(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => Logs 'later' after one second.
     */
    var delay = baseRest(function(func, wait, args) {
      return baseDelay(func, toNumber(wait) || 0, args);
    });

    /**
     * Creates a function that invokes `func` with arguments reversed.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to flip arguments for.
     * @returns {Function} Returns the new flipped function.
     * @example
     *
     * var flipped = _.flip(function() {
     *   return _.toArray(arguments);
     * });
     *
     * flipped('a', 'b', 'c', 'd');
     * // => ['d', 'c', 'b', 'a']
     */
    function flip(func) {
      return createWrap(func, WRAP_FLIP_FLAG);
    }

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided, it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is used as the map cache key. The `func`
     * is invoked with the `this` binding of the memoized function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the
     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoized function.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     * var other = { 'c': 3, 'd': 4 };
     *
     * var values = _.memoize(_.values);
     * values(object);
     * // => [1, 2]
     *
     * values(other);
     * // => [3, 4]
     *
     * object.a = 2;
     * values(object);
     * // => [1, 2]
     *
     * // Modify the result cache.
     * values.cache.set(object, ['a', 'b']);
     * values(object);
     * // => ['a', 'b']
     *
     * // Replace `_.memoize.Cache`.
     * _.memoize.Cache = WeakMap;
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      return memoized;
    }

    // Expose `MapCache`.
    memoize.Cache = MapCache;

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new negated function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        var args = arguments;
        switch (args.length) {
          case 0: return !predicate.call(this);
          case 1: return !predicate.call(this, args[0]);
          case 2: return !predicate.call(this, args[0], args[1]);
          case 3: return !predicate.call(this, args[0], args[1], args[2]);
        }
        return !predicate.apply(this, args);
      };
    }

    /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first invocation. The `func` is
     * invoked with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // => `createApplication` is invoked once
     */
    function once(func) {
      return before(2, func);
    }

    /**
     * Creates a function that invokes `func` with its arguments transformed.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms=[_.identity]]
     *  The argument transforms.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var func = _.overArgs(function(x, y) {
     *   return [x, y];
     * }, [square, doubled]);
     *
     * func(9, 3);
     * // => [81, 6]
     *
     * func(10, 5);
     * // => [100, 10]
     */
    var overArgs = castRest(function(func, transforms) {
      transforms = (transforms.length == 1 && isArray(transforms[0]))
        ? arrayMap(transforms[0], baseUnary(getIteratee()))
        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

      var funcsLength = transforms.length;
      return baseRest(function(args) {
        var index = -1,
            length = nativeMin(args.length, funcsLength);

        while (++index < length) {
          args[index] = transforms[index].call(this, args[index]);
        }
        return apply(func, this, args);
      });
    });

    /**
     * Creates a function that invokes `func` with `partials` prepended to the
     * arguments it receives. This method is like `_.bind` except it does **not**
     * alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 0.2.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // Partially applied with placeholders.
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
    var partial = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partial));
      return createWrap(func, WRAP_PARTIAL_FLAG, undefined, partials, holders);
    });

    /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to the arguments it receives.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method doesn't set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * function greet(greeting, name) {
     *   return greeting + ' ' + name;
     * }
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // Partially applied with placeholders.
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
    var partialRight = baseRest(function(func, partials) {
      var holders = replaceHolders(partials, getHolder(partialRight));
      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined, partials, holders);
    });

    /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified `indexes` where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, [2, 0, 1]);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     */
    var rearg = flatRest(function(func, indexes) {
      return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as
     * an array.
     *
     * **Note:** This method is based on the
     * [rest parameter](https://mdn.io/rest_parameters).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.rest(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function rest(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start === undefined ? start : toInteger(start);
      return baseRest(func, start);
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * create function and an array of arguments much like
     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
     *
     * **Note:** This method is based on the
     * [spread operator](https://mdn.io/spread_operator).
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @param {number} [start=0] The start position of the spread.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
    function spread(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = start == null ? 0 : nativeMax(toInteger(start), 0);
      return baseRest(function(args) {
        var array = args[start],
            otherArgs = castSlice(args, 0, start);

        if (array) {
          arrayPush(otherArgs, array);
        }
        return apply(func, this, otherArgs);
      });
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed `func` invocations and a `flush` method to
     * immediately invoke them. Provide `options` to indicate whether `func`
     * should be invoked on the leading and/or trailing edge of the `wait`
     * timeout. The `func` is invoked with the last arguments provided to the
     * throttled function. Subsequent calls to the throttled function return the
     * result of the last `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is
     * invoked on the trailing edge of the timeout only if the throttled function
     * is invoked more than once during the `wait` timeout.
     *
     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
     *
     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.leading=true]
     *  Specify invoking on the leading edge of the timeout.
     * @param {boolean} [options.trailing=true]
     *  Specify invoking on the trailing edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // Avoid excessively updating the position while scrolling.
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('click', throttled);
     *
     * // Cancel the trailing throttled invocation.
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, {
        'leading': leading,
        'maxWait': wait,
        'trailing': trailing
      });
    }

    /**
     * Creates a function that accepts up to one argument, ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     * @example
     *
     * _.map(['6', '8', '10'], _.unary(parseInt));
     * // => [6, 8, 10]
     */
    function unary(func) {
      return ary(func, 1);
    }

    /**
     * Creates a function that provides `value` to `wrapper` as its first
     * argument. Any additional arguments provided to the function are appended
     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
     * binding of the created function.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} [wrapper=identity] The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
    function wrap(value, wrapper) {
      return partial(castFunction(wrapper), value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Casts `value` as an array if it's not one.
     *
     * @static
     * @memberOf _
     * @since 4.4.0
     * @category Lang
     * @param {*} value The value to inspect.
     * @returns {Array} Returns the cast array.
     * @example
     *
     * _.castArray(1);
     * // => [1]
     *
     * _.castArray({ 'a': 1 });
     * // => [{ 'a': 1 }]
     *
     * _.castArray('abc');
     * // => ['abc']
     *
     * _.castArray(null);
     * // => [null]
     *
     * _.castArray(undefined);
     * // => [undefined]
     *
     * _.castArray();
     * // => []
     *
     * var array = [1, 2, 3];
     * console.log(_.castArray(array) === array);
     * // => true
     */
    function castArray() {
      if (!arguments.length) {
        return [];
      }
      var value = arguments[0];
      return isArray(value) ? value : [value];
    }

    /**
     * Creates a shallow clone of `value`.
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
     * and supports cloning arrays, array buffers, booleans, date objects, maps,
     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
     * arrays. The own enumerable properties of `arguments` objects are cloned
     * as plain objects. An empty object is returned for uncloneable values such
     * as error objects, functions, DOM nodes, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to clone.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeep
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var shallow = _.clone(objects);
     * console.log(shallow[0] === objects[0]);
     * // => true
     */
    function clone(value) {
      return baseClone(value, CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.clone` except that it accepts `customizer` which
     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
     * cloning is handled by the method instead. The `customizer` is invoked with
     * up to four arguments; (value [, index|key, object, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the cloned value.
     * @see _.cloneDeepWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * }
     *
     * var el = _.cloneWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 0
     */
    function cloneWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(value) {
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }

    /**
     * This method is like `_.cloneWith` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @param {Function} [customizer] The function to customize cloning.
     * @returns {*} Returns the deep cloned value.
     * @see _.cloneWith
     * @example
     *
     * function customizer(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * }
     *
     * var el = _.cloneDeepWith(document.body, customizer);
     *
     * console.log(el === document.body);
     * // => false
     * console.log(el.nodeName);
     * // => 'BODY'
     * console.log(el.childNodes.length);
     * // => 20
     */
    function cloneDeepWith(value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
    }

    /**
     * Checks if `object` conforms to `source` by invoking the predicate
     * properties of `source` with the corresponding property values of `object`.
     *
     * **Note:** This method is equivalent to `_.conforms` when `source` is
     * partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property predicates to conform to.
     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
     * // => true
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
     * // => false
     */
    function conformsTo(object, source) {
      return source == null || baseConformsTo(object, source, keys(source));
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`,
     *  else `false`.
     * @see _.lt
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
    var gt = createRelationalOperation(baseGt);

    /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to
     *  `other`, else `false`.
     * @see _.lte
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
    var gte = createRelationalOperation(function(value, other) {
      return value >= other;
    });

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is classified as an `ArrayBuffer` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
     * @example
     *
     * _.isArrayBuffer(new ArrayBuffer(2));
     * // => true
     *
     * _.isArrayBuffer(new Array(2));
     * // => false
     */
    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false ||
        (isObjectLike(value) && baseGetTag(value) == boolTag);
    }

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

    /**
     * Checks if `value` is likely a DOM element.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
    }

    /**
     * Checks if `value` is an empty object, collection, map, or set.
     *
     * Objects are considered empty if they have no own enumerable string keyed
     * properties.
     *
     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
     * jQuery-like collections are considered empty if they have a `length` of `0`.
     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) &&
          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
        return !value.length;
      }
      var tag = getTag(value);
      if (tag == mapTag || tag == setTag) {
        return !value.size;
      }
      if (isPrototype(value)) {
        return !baseKeys(value).length;
      }
      for (var key in value) {
        if (hasOwnProperty.call(value, key)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are compared by strict equality, i.e. `===`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }

    /**
     * This method is like `_.isEqual` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with up to
     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, othValue) {
     *   if (isGreeting(objValue) && isGreeting(othValue)) {
     *     return true;
     *   }
     * }
     *
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqualWith(array, other, customizer);
     * // => true
     */
    function isEqualWith(value, other, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      var result = customizer ? customizer(value, other) : undefined;
      return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;
    }

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      if (!isObjectLike(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == errorTag || tag == domExcTag ||
        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
    }

    /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on
     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(3);
     * // => true
     *
     * _.isFinite(Number.MIN_VALUE);
     * // => true
     *
     * _.isFinite(Infinity);
     * // => false
     *
     * _.isFinite('3');
     * // => false
     */
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    /**
     * Checks if `value` is an integer.
     *
     * **Note:** This method is based on
     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
     * @example
     *
     * _.isInteger(3);
     * // => true
     *
     * _.isInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isInteger(Infinity);
     * // => false
     *
     * _.isInteger('3');
     * // => false
     */
    function isInteger(value) {
      return typeof value == 'number' && value == toInteger(value);
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /**
     * Checks if `value` is classified as a `Map` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
     * @example
     *
     * _.isMap(new Map);
     * // => true
     *
     * _.isMap(new WeakMap);
     * // => false
     */
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

    /**
     * Performs a partial deep comparison between `object` and `source` to
     * determine if `object` contains equivalent property values.
     *
     * **Note:** This method is equivalent to `_.matches` when `source` is
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'a': 1, 'b': 2 };
     *
     * _.isMatch(object, { 'b': 2 });
     * // => true
     *
     * _.isMatch(object, { 'b': 1 });
     * // => false
     */
    function isMatch(object, source) {
      return object === source || baseIsMatch(object, source, getMatchData(source));
    }

    /**
     * This method is like `_.isMatch` except that it accepts `customizer` which
     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
     * are handled by the method instead. The `customizer` is invoked with five
     * arguments: (objValue, srcValue, index|key, object, source).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize comparisons.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * function isGreeting(value) {
     *   return /^h(?:i|ello)$/.test(value);
     * }
     *
     * function customizer(objValue, srcValue) {
     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
     *     return true;
     *   }
     * }
     *
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatchWith(object, source, customizer);
     * // => true
     */
    function isMatchWith(object, source, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return baseIsMatch(object, source, getMatchData(source), customizer);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is based on
     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
     * `undefined` and other non-number values.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // An `NaN` primitive is the only value that is not equal to itself.
      // Perform the `toStringTag` check first to avoid errors with some
      // ActiveX objects in IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is a pristine native function.
     *
     * **Note:** This method can't reliably detect native functions in the presence
     * of the core-js package because core-js circumvents this kind of detection.
     * Despite multiple requests, the core-js maintainer has made it clear: any
     * attempt to fix the detection will be obstructed. As a result, we're left
     * with little choice but to throw an error. Unfortunately, this also affects
     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
     * which rely on core-js.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (isMaskable(value)) {
        throw new Error(CORE_ERROR_TEXT);
      }
      return baseIsNative(value);
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is `null` or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
     * @example
     *
     * _.isNil(null);
     * // => true
     *
     * _.isNil(void 0);
     * // => true
     *
     * _.isNil(NaN);
     * // => false
     */
    function isNil(value) {
      return value == null;
    }

    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
     * classified as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
     * @example
     *
     * _.isNumber(3);
     * // => true
     *
     * _.isNumber(Number.MIN_VALUE);
     * // => true
     *
     * _.isNumber(Infinity);
     * // => true
     *
     * _.isNumber('3');
     * // => false
     */
    function isNumber(value) {
      return typeof value == 'number' ||
        (isObjectLike(value) && baseGetTag(value) == numberTag);
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    }

    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

    /**
     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
     * double precision number which isn't the result of a rounded unsafe integer.
     *
     * **Note:** This method is based on
     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
     * @example
     *
     * _.isSafeInteger(3);
     * // => true
     *
     * _.isSafeInteger(Number.MIN_VALUE);
     * // => false
     *
     * _.isSafeInteger(Infinity);
     * // => false
     *
     * _.isSafeInteger('3');
     * // => false
     */
    function isSafeInteger(value) {
      return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is classified as a `Set` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
     * @example
     *
     * _.isSet(new Set);
     * // => true
     *
     * _.isSet(new WeakSet);
     * // => false
     */
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' ||
        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
    }

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike(value) && baseGetTag(value) == symbolTag);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined;
    }

    /**
     * Checks if `value` is classified as a `WeakMap` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
     * @example
     *
     * _.isWeakMap(new WeakMap);
     * // => true
     *
     * _.isWeakMap(new Map);
     * // => false
     */
    function isWeakMap(value) {
      return isObjectLike(value) && getTag(value) == weakMapTag;
    }

    /**
     * Checks if `value` is classified as a `WeakSet` object.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
     * @example
     *
     * _.isWeakSet(new WeakSet);
     * // => true
     *
     * _.isWeakSet(new Set);
     * // => false
     */
    function isWeakSet(value) {
      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
    }

    /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`,
     *  else `false`.
     * @see _.gt
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
    var lt = createRelationalOperation(baseLt);

    /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @since 3.9.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to
     *  `other`, else `false`.
     * @see _.gte
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
    var lte = createRelationalOperation(function(value, other) {
      return value <= other;
    });

    /**
     * Converts `value` to an array.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * _.toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * _.toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toArray(1);
     * // => []
     *
     * _.toArray(null);
     * // => []
     */
    function toArray(value) {
      if (!value) {
        return [];
      }
      if (isArrayLike(value)) {
        return isString(value) ? stringToArray(value) : copyArray(value);
      }
      if (symIterator && value[symIterator]) {
        return iteratorToArray(value[symIterator]());
      }
      var tag = getTag(value),
          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

      return func(value);
    }

    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    /**
     * Converts `value` to an integer suitable for use as the length of an
     * array-like object.
     *
     * **Note:** This method is based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toLength(3.2);
     * // => 3
     *
     * _.toLength(Number.MIN_VALUE);
     * // => 0
     *
     * _.toLength(Infinity);
     * // => 4294967295
     *
     * _.toLength('3.2');
     * // => 3
     */
    function toLength(value) {
      return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
    }

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }

    /**
     * Converts `value` to a safe integer. A safe integer can be compared and
     * represented correctly.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toSafeInteger(3.2);
     * // => 3
     *
     * _.toSafeInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toSafeInteger(Infinity);
     * // => 9007199254740991
     *
     * _.toSafeInteger('3.2');
     * // => 3
     */
    function toSafeInteger(value) {
      return value
        ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
        : (value === 0 ? value : 0);
    }

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Assigns own enumerable string keyed properties of source objects to the
     * destination object. Source objects are applied from left to right.
     * Subsequent sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object` and is loosely based on
     * [`Object.assign`](https://mdn.io/Object/assign).
     *
     * @static
     * @memberOf _
     * @since 0.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assignIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assign({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'c': 3 }
     */
    var assign = createAssigner(function(object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(source, keys(source), object);
        return;
      }
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          assignValue(object, key, source[key]);
        }
      }
    });

    /**
     * This method is like `_.assign` except that it iterates over own and
     * inherited source properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.assign
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * function Bar() {
     *   this.c = 3;
     * }
     *
     * Foo.prototype.b = 2;
     * Bar.prototype.d = 4;
     *
     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
     */
    var assignIn = createAssigner(function(object, source) {
      copyObject(source, keysIn(source), object);
    });

    /**
     * This method is like `_.assignIn` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias extendWith
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keysIn(source), object, customizer);
    });

    /**
     * This method is like `_.assign` except that it accepts `customizer`
     * which is invoked to produce the assigned values. If `customizer` returns
     * `undefined`, assignment is handled by the method instead. The `customizer`
     * is invoked with five arguments: (objValue, srcValue, key, object, source).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @see _.assignInWith
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignWith, customizer);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
      copyObject(source, keys(source), object, customizer);
    });

    /**
     * Creates an array of values corresponding to `paths` of `object`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Array} Returns the picked values.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _.at(object, ['a[0].b.c', 'a[1]']);
     * // => [3, 4]
     */
    var at = flatRest(baseAt);

    /**
     * Creates an object that inherits from the `prototype` object. If a
     * `properties` object is given, its own enumerable string keyed properties
     * are assigned to the created object.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties == null ? result : baseAssign(result, properties);
    }

    /**
     * Assigns own and inherited enumerable string keyed properties of source
     * objects to the destination object for all destination properties that
     * resolve to `undefined`. Source objects are applied from left to right.
     * Once a property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaultsDeep
     * @example
     *
     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var defaults = baseRest(function(object, sources) {
      object = Object(object);

      var index = -1;
      var length = sources.length;
      var guard = length > 2 ? sources[2] : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        length = 1;
      }

      while (++index < length) {
        var source = sources[index];
        var props = keysIn(source);
        var propsIndex = -1;
        var propsLength = props.length;

        while (++propsIndex < propsLength) {
          var key = props[propsIndex];
          var value = object[key];

          if (value === undefined ||
              (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
            object[key] = source[key];
          }
        }
      }

      return object;
    });

    /**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaults
     * @example
     *
     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
     * // => { 'a': { 'b': 2, 'c': 3 } }
     */
    var defaultsDeep = baseRest(function(args) {
      args.push(undefined, customDefaultsMerge);
      return apply(mergeWith, undefined, args);
    });

    /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(o) { return o.age < 40; });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // The `_.matches` iteratee shorthand.
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findKey(users, 'active');
     * // => 'barney'
     */
    function findKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
    }

    /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @param {Function} [predicate=_.identity] The function invoked per iteration.
     * @returns {string|undefined} Returns the key of the matched element,
     *  else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(o) { return o.age < 40; });
     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
     *
     * // The `_.matches` iteratee shorthand.
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.findLastKey(users, ['active', false]);
     * // => 'fred'
     *
     * // The `_.property` iteratee shorthand.
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
    function findLastKey(object, predicate) {
      return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
    }

    /**
     * Iterates over own and inherited enumerable string keyed properties of an
     * object and invokes `iteratee` for each property. The iteratee is invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forInRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
     */
    function forIn(object, iteratee) {
      return object == null
        ? object
        : baseFor(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forIn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
     */
    function forInRight(object, iteratee) {
      return object == null
        ? object
        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * Iterates over own enumerable string keyed properties of an object and
     * invokes `iteratee` for each property. The iteratee is invoked with three
     * arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 0.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwnRight
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
     */
    function forOwn(object, iteratee) {
      return object && baseForOwn(object, getIteratee(iteratee, 3));
    }

    /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @since 2.0.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns `object`.
     * @see _.forOwn
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
     */
    function forOwnRight(object, iteratee) {
      return object && baseForOwnRight(object, getIteratee(iteratee, 3));
    }

    /**
     * Creates an array of function property names from own enumerable properties
     * of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functionsIn
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functions(new Foo);
     * // => ['a', 'b']
     */
    function functions(object) {
      return object == null ? [] : baseFunctions(object, keys(object));
    }

    /**
     * Creates an array of function property names from own and inherited
     * enumerable properties of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the function names.
     * @see _.functions
     * @example
     *
     * function Foo() {
     *   this.a = _.constant('a');
     *   this.b = _.constant('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functionsIn(new Foo);
     * // => ['a', 'b', 'c']
     */
    function functionsIn(object) {
      return object == null ? [] : baseFunctions(object, keysIn(object));
    }

    /**
     * Gets the value at `path` of `object`. If the resolved value is
     * `undefined`, the `defaultValue` is returned in its place.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, path);
      return result === undefined ? defaultValue : result;
    }

    /**
     * Checks if `path` is a direct property of `object`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': 2 } };
     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b');
     * // => true
     *
     * _.has(object, ['a', 'b']);
     * // => true
     *
     * _.has(other, 'a');
     * // => false
     */
    function has(object, path) {
      return object != null && hasPath(object, path, baseHas);
    }

    /**
     * Checks if `path` is a direct or inherited property of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` exists, else `false`.
     * @example
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(object, 'a');
     * // => true
     *
     * _.hasIn(object, 'a.b');
     * // => true
     *
     * _.hasIn(object, ['a', 'b']);
     * // => true
     *
     * _.hasIn(object, 'b');
     * // => false
     */
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite
     * property assignments of previous values.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Object
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     */
    var invert = createInverter(function(result, value, key) {
      if (value != null &&
          typeof value.toString != 'function') {
        value = nativeObjectToString.call(value);
      }

      result[value] = key;
    }, constant(identity));

    /**
     * This method is like `_.invert` except that the inverted object is generated
     * from the results of running each element of `object` thru `iteratee`. The
     * corresponding inverted value of each inverted key is an array of keys
     * responsible for generating the inverted value. The iteratee is invoked
     * with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.1.0
     * @category Object
     * @param {Object} object The object to invert.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invertBy(object);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     *
     * _.invertBy(object, function(value) {
     *   return 'group' + value;
     * });
     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
     */
    var invertBy = createInverter(function(result, value, key) {
      if (value != null &&
          typeof value.toString != 'function') {
        value = nativeObjectToString.call(value);
      }

      if (hasOwnProperty.call(result, value)) {
        result[value].push(key);
      } else {
        result[value] = [key];
      }
    }, getIteratee);

    /**
     * Invokes the method at `path` of `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
     *
     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
     * // => [2, 3]
     */
    var invoke = baseRest(baseInvoke);

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
     * with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 3.8.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapValues
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    function mapKeys(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, iteratee(value, key, object), value);
      });
      return result;
    }

    /**
     * Creates an object with the same keys as `object` and values generated
     * by running each own enumerable string keyed property of `object` thru
     * `iteratee`. The iteratee is invoked with three arguments:
     * (value, key, object).
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Object} Returns the new mapped object.
     * @see _.mapKeys
     * @example
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     *
     * // The `_.property` iteratee shorthand.
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    function mapValues(object, iteratee) {
      var result = {};
      iteratee = getIteratee(iteratee, 3);

      baseForOwn(object, function(value, key, object) {
        baseAssignValue(result, key, iteratee(value, key, object));
      });
      return result;
    }

    /**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    var merge = createAssigner(function(object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });

    /**
     * This method is like `_.merge` except that it accepts `customizer` which
     * is invoked to produce the merged values of the destination and source
     * properties. If `customizer` returns `undefined`, merging is handled by the
     * method instead. The `customizer` is invoked with six arguments:
     * (objValue, srcValue, key, object, source, stack).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   if (_.isArray(objValue)) {
     *     return objValue.concat(srcValue);
     *   }
     * }
     *
     * var object = { 'a': [1], 'b': [2] };
     * var other = { 'a': [3], 'b': [4] };
     *
     * _.mergeWith(object, other, customizer);
     * // => { 'a': [1, 3], 'b': [2, 4] }
     */
    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
      baseMerge(object, source, srcIndex, customizer);
    });

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable property paths of `object` that are not omitted.
     *
     * **Note:** This method is considerably slower than `_.pick`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to omit.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(object, ['a', 'c']);
     * // => { 'b': '2' }
     */
    var omit = flatRest(function(object, paths) {
      var result = {};
      if (object == null) {
        return result;
      }
      var isDeep = false;
      paths = arrayMap(paths, function(path) {
        path = castPath(path, object);
        isDeep || (isDeep = path.length > 1);
        return path;
      });
      copyObject(object, getAllKeysIn(object), result);
      if (isDeep) {
        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      while (length--) {
        baseUnset(result, paths[length]);
      }
      return result;
    });

    /**
     * The opposite of `_.pickBy`; this method creates an object composed of
     * the own and inherited enumerable string keyed properties of `object` that
     * `predicate` doesn't return truthy for. The predicate is invoked with two
     * arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omitBy(object, _.isNumber);
     * // => { 'b': '2' }
     */
    function omitBy(object, predicate) {
      return pickBy(object, negate(getIteratee(predicate)));
    }

    /**
     * Creates an object composed of the picked `object` properties.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {...(string|string[])} [paths] The property paths to pick.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pick(object, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });

    /**
     * Creates an object composed of the `object` properties `predicate` returns
     * truthy for. The predicate is invoked with two arguments: (value, key).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The source object.
     * @param {Function} [predicate=_.identity] The function invoked per property.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pickBy(object, _.isNumber);
     * // => { 'a': 1, 'c': 3 }
     */
    function pickBy(object, predicate) {
      if (object == null) {
        return {};
      }
      var props = arrayMap(getAllKeysIn(object), function(prop) {
        return [prop];
      });
      predicate = getIteratee(predicate);
      return basePickBy(object, props, function(value, path) {
        return predicate(value, path[0]);
      });
    }

    /**
     * This method is like `_.get` except that if the resolved value is a
     * function it's invoked with the `this` binding of its parent object and
     * its result is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a[0].b.c3', 'default');
     * // => 'default'
     *
     * _.result(object, 'a[0].b.c3', _.constant('default'));
     * // => 'default'
     */
    function result(object, path, defaultValue) {
      path = castPath(path, object);

      var index = -1,
          length = path.length;

      // Ensure the loop is entered when path is empty.
      if (!length) {
        length = 1;
        object = undefined;
      }
      while (++index < length) {
        var value = object == null ? undefined : object[toKey(path[index])];
        if (value === undefined) {
          index = length;
          value = defaultValue;
        }
        object = isFunction(value) ? value.call(object) : value;
      }
      return object;
    }

    /**
     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
     * it's created. Arrays are created for missing index properties while objects
     * are created for all other missing properties. Use `_.setWith` to customize
     * `path` creation.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, ['x', '0', 'y', 'z'], 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }

    /**
     * This method is like `_.set` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.setWith(object, '[0][1]', 'a', Object);
     * // => { '0': { '1': 'a' } }
     */
    function setWith(object, path, value, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseSet(object, path, value, customizer);
    }

    /**
     * Creates an array of own enumerable string keyed-value pairs for `object`
     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
     * entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entries
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairs(new Foo);
     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
     */
    var toPairs = createToPairs(keys);

    /**
     * Creates an array of own and inherited enumerable string keyed-value pairs
     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
     * or set, its entries are returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @alias entriesIn
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the key-value pairs.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.toPairsIn(new Foo);
     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
     */
    var toPairsIn = createToPairs(keysIn);

    /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own
     * enumerable string keyed properties thru `iteratee`, with each invocation
     * potentially mutating the `accumulator` object. If `accumulator` is not
     * provided, a new object with the same `[[Prototype]]` will be used. The
     * iteratee is invoked with four arguments: (accumulator, value, key, object).
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @since 1.3.0
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * }, []);
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
     *   (result[value] || (result[value] = [])).push(key);
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    function transform(object, iteratee, accumulator) {
      var isArr = isArray(object),
          isArrLike = isArr || isBuffer(object) || isTypedArray(object);

      iteratee = getIteratee(iteratee, 4);
      if (accumulator == null) {
        var Ctor = object && object.constructor;
        if (isArrLike) {
          accumulator = isArr ? new Ctor : [];
        }
        else if (isObject(object)) {
          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
        }
        else {
          accumulator = {};
        }
      }
      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Removes the property at `path` of `object`.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to unset.
     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
     * _.unset(object, 'a[0].b.c');
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     *
     * _.unset(object, ['a', '0', 'b', 'c']);
     * // => true
     *
     * console.log(object);
     * // => { 'a': [{ 'b': {} }] };
     */
    function unset(object, path) {
      return object == null ? true : baseUnset(object, path);
    }

    /**
     * This method is like `_.set` except that accepts `updater` to produce the
     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
     * is invoked with one argument: (value).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
     * console.log(object.a[0].b.c);
     * // => 9
     *
     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
     * console.log(object.x[0].y.z);
     * // => 0
     */
    function update(object, path, updater) {
      return object == null ? object : baseUpdate(object, path, castFunction(updater));
    }

    /**
     * This method is like `_.update` except that it accepts `customizer` which is
     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
     * path creation is handled by the method instead. The `customizer` is invoked
     * with three arguments: (nsValue, key, nsObject).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.6.0
     * @category Object
     * @param {Object} object The object to modify.
     * @param {Array|string} path The path of the property to set.
     * @param {Function} updater The function to produce the updated value.
     * @param {Function} [customizer] The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {};
     *
     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
     * // => { '0': { '1': 'a' } }
     */
    function updateWith(object, path, updater, customizer) {
      customizer = typeof customizer == 'function' ? customizer : undefined;
      return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
    }

    /**
     * Creates an array of the own enumerable string keyed property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }

    /**
     * Creates an array of the own and inherited enumerable string keyed property
     * values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
    function valuesIn(object) {
      return object == null ? [] : baseValues(object, keysIn(object));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Clamps `number` within the inclusive `lower` and `upper` bounds.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Number
     * @param {number} number The number to clamp.
     * @param {number} [lower] The lower bound.
     * @param {number} upper The upper bound.
     * @returns {number} Returns the clamped number.
     * @example
     *
     * _.clamp(-10, -5, 5);
     * // => -5
     *
     * _.clamp(10, -5, 5);
     * // => 5
     */
    function clamp(number, lower, upper) {
      if (upper === undefined) {
        upper = lower;
        lower = undefined;
      }
      if (upper !== undefined) {
        upper = toNumber(upper);
        upper = upper === upper ? upper : 0;
      }
      if (lower !== undefined) {
        lower = toNumber(lower);
        lower = lower === lower ? lower : 0;
      }
      return baseClamp(toNumber(number), lower, upper);
    }

    /**
     * Checks if `n` is between `start` and up to, but not including, `end`. If
     * `end` is not specified, it's set to `start` with `start` then set to `0`.
     * If `start` is greater than `end` the params are swapped to support
     * negative ranges.
     *
     * @static
     * @memberOf _
     * @since 3.3.0
     * @category Number
     * @param {number} number The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
     * @see _.range, _.rangeRight
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     *
     * _.inRange(-3, -2, -6);
     * // => true
     */
    function inRange(number, start, end) {
      start = toFinite(start);
      if (end === undefined) {
        end = start;
        start = 0;
      } else {
        end = toFinite(end);
      }
      number = toNumber(number);
      return baseInRange(number, start, end);
    }

    /**
     * Produces a random number between the inclusive `lower` and `upper` bounds.
     * If only one argument is provided a number between `0` and the given number
     * is returned. If `floating` is `true`, or either `lower` or `upper` are
     * floats, a floating-point number is returned instead of an integer.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Number
     * @param {number} [lower=0] The lower bound.
     * @param {number} [upper=1] The upper bound.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(lower, upper, floating) {
      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
        upper = floating = undefined;
      }
      if (floating === undefined) {
        if (typeof upper == 'boolean') {
          floating = upper;
          upper = undefined;
        }
        else if (typeof lower == 'boolean') {
          floating = lower;
          lower = undefined;
        }
      }
      if (lower === undefined && upper === undefined) {
        lower = 0;
        upper = 1;
      }
      else {
        lower = toFinite(lower);
        if (upper === undefined) {
          upper = lower;
          lower = 0;
        } else {
          upper = toFinite(upper);
        }
      }
      if (lower > upper) {
        var temp = lower;
        lower = upper;
        upper = temp;
      }
      if (floating || lower % 1 || upper % 1) {
        var rand = nativeRandom();
        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
      }
      return baseRandom(lower, upper);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });

    /**
     * Converts the first character of `string` to upper case and the remaining
     * to lower case.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }

    /**
     * Deburrs `string` by converting
     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * letters to basic Latin letters and removing
     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = toString(string);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search up to.
     * @returns {boolean} Returns `true` if `string` ends with `target`,
     *  else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
    function endsWith(string, target, position) {
      string = toString(string);
      target = baseToString(target);

      var length = string.length;
      position = position === undefined
        ? length
        : baseClamp(toInteger(position), 0, length);

      var end = position;
      position -= target.length;
      return position >= 0 && string.slice(position, end) == target;
    }

    /**
     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
     * corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional
     * characters use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value. See
     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * When working with HTML you should always
     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
     * XSS vectors.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      string = toString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    /**
     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https://lodash\.com/\)'
     */
    function escapeRegExp(string) {
      string = toString(string);
      return (string && reHasRegExpChar.test(string))
        ? string.replace(reRegExpChar, '\\$&')
        : string;
    }

    /**
     * Converts `string` to
     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__FOO_BAR__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });

    /**
     * Converts `string`, as space separated words, to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.lowerCase('--Foo-Bar--');
     * // => 'foo bar'
     *
     * _.lowerCase('fooBar');
     * // => 'foo bar'
     *
     * _.lowerCase('__FOO_BAR__');
     * // => 'foo bar'
     */
    var lowerCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toLowerCase();
    });

    /**
     * Converts the first character of `string` to lower case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.lowerFirst('Fred');
     * // => 'fred'
     *
     * _.lowerFirst('FRED');
     * // => 'fRED'
     */
    var lowerFirst = createCaseFirst('toLowerCase');

    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      if (!length || strLength >= length) {
        return string;
      }
      var mid = (length - strLength) / 2;
      return (
        createPadding(nativeFloor(mid), chars) +
        string +
        createPadding(nativeCeil(mid), chars)
      );
    }

    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padEnd('abc', 6);
     * // => 'abc   '
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */
    function padEnd(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (string + createPadding(length - strLength, chars))
        : string;
    }

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padStart('abc', 6);
     * // => '   abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */
    function padStart(string, length, chars) {
      string = toString(string);
      length = toInteger(length);

      var strLength = length ? stringSize(string) : 0;
      return (length && strLength < length)
        ? (createPadding(length - strLength, chars) + string)
        : string;
    }

    /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
     * hexadecimal, in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the
     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
     *
     * @static
     * @memberOf _
     * @since 1.1.0
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix=10] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      if (guard || radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
    }

    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=1] The number of times to repeat the string.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n, guard) {
      if ((guard ? isIterateeCall(string, n, guard) : n === undefined)) {
        n = 1;
      } else {
        n = toInteger(n);
      }
      return baseRepeat(toString(string), n);
    }

    /**
     * Replaces matches for `pattern` in `string` with `replacement`.
     *
     * **Note:** This method is based on
     * [`String#replace`](https://mdn.io/String/replace).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to modify.
     * @param {RegExp|string} pattern The pattern to replace.
     * @param {Function|string} replacement The match replacement.
     * @returns {string} Returns the modified string.
     * @example
     *
     * _.replace('Hi Fred', 'Fred', 'Barney');
     * // => 'Hi Barney'
     */
    function replace() {
      var args = arguments,
          string = toString(args[0]);

      return args.length < 3 ? string : string.replace(args[1], args[2]);
    }

    /**
     * Converts `string` to
     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    /**
     * Splits `string` by `separator`.
     *
     * **Note:** This method is based on
     * [`String#split`](https://mdn.io/String/split).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to split.
     * @param {RegExp|string} separator The separator pattern to split by.
     * @param {number} [limit] The length to truncate results to.
     * @returns {Array} Returns the string segments.
     * @example
     *
     * _.split('a-b-c', '-', 2);
     * // => ['a', 'b']
     */
    function split(string, separator, limit) {
      if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
        separator = limit = undefined;
      }
      limit = limit === undefined ? MAX_ARRAY_LENGTH : limit >>> 0;
      if (!limit) {
        return [];
      }
      string = toString(string);
      if (string && (
            typeof separator == 'string' ||
            (separator != null && !isRegExp(separator))
          )) {
        separator = baseToString(separator);
        if (!separator && hasUnicode(string)) {
          return castSlice(stringToArray(string), 0, limit);
        }
      }
      return string.split(separator, limit);
    }

    /**
     * Converts `string` to
     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @since 3.1.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar--');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__FOO_BAR__');
     * // => 'FOO BAR'
     */
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + upperFirst(word);
    });

    /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`,
     *  else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
    function startsWith(string, target, position) {
      string = toString(string);
      position = position == null
        ? 0
        : baseClamp(toInteger(position), 0, string.length);

      target = baseToString(target);
      return string.slice(position, position + target.length) == target;
    }

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is given, it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options={}] The options object.
     * @param {RegExp} [options.escape=_.templateSettings.escape]
     *  The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
     *  The "evaluate" delimiter.
     * @param {Object} [options.imports=_.templateSettings.imports]
     *  An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
     *  The "interpolate" delimiter.
     * @param {string} [options.sourceURL='lodash.templateSources[n]']
     *  The sourceURL of the compiled template.
     * @param {string} [options.variable='obj']
     *  The data object variable name.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // Use the "interpolate" delimiter to create a compiled template.
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // Use the HTML "escape" delimiter to escape data property values.
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the internal `print` function in "evaluate" delimiters.
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // Use the ES template literal delimiter as an "interpolate" delimiter.
     * // Disable support by replacing the "interpolate" delimiter.
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // Use backslashes to treat delimiters as plain text.
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // Use the `imports` option to import `jQuery` as `jq`.
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
     *
     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // Use custom template delimiters.
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // Use the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and stack traces.
     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, guard) {
      // Based on John Resig's `tmpl` implementation
      // (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = lodash.templateSettings;

      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined;
      }
      string = toString(string);
      options = assignInWith({}, options, settings, customDefaultsAssignIn);

      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      // The sourceURL gets injected into the source that's eval-ed, so be careful
      // with lookup (in case of e.g. prototype pollution), and strip newlines if any.
      // A newline wouldn't be a valid sourceURL anyway, and it'd enable code injection.
      var sourceURL = '//# sourceURL=' +
        (hasOwnProperty.call(options, 'sourceURL')
          ? (options.sourceURL + '').replace(/[\r\n]/g, ' ')
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products needs `match` returned in
        // order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      // Like with sourceURL, we take care to not check the option's prototype,
      // as this configuration is a code injection vector.
      var variable = hasOwnProperty.call(options, 'variable') && options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source)
          .apply(undefined, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /**
     * Converts `string`, as a whole, to lower case just like
     * [String#toLowerCase](https://mdn.io/toLowerCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the lower cased string.
     * @example
     *
     * _.toLower('--Foo-Bar--');
     * // => '--foo-bar--'
     *
     * _.toLower('fooBar');
     * // => 'foobar'
     *
     * _.toLower('__FOO_BAR__');
     * // => '__foo_bar__'
     */
    function toLower(value) {
      return toString(value).toLowerCase();
    }

    /**
     * Converts `string`, as a whole, to upper case just like
     * [String#toUpperCase](https://mdn.io/toUpperCase).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.toUpper('--foo-bar--');
     * // => '--FOO-BAR--'
     *
     * _.toUpper('fooBar');
     * // => 'FOOBAR'
     *
     * _.toUpper('__foo_bar__');
     * // => '__FOO_BAR__'
     */
    function toUpper(value) {
      return toString(value).toUpperCase();
    }

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrim, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          chrSymbols = stringToArray(chars),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;

      return castSlice(strSymbols, start, end).join('');
    }

    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimEnd('  abc  ');
     * // => '  abc'
     *
     * _.trimEnd('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimEnd(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimEnd, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

      return castSlice(strSymbols, 0, end).join('');
    }

    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimStart('  abc  ');
     * // => 'abc  '
     *
     * _.trimStart('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimStart(string, chars, guard) {
      string = toString(string);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimStart, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        return string;
      }
      var strSymbols = stringToArray(string),
          start = charsStartIndex(strSymbols, stringToArray(chars));

      return castSlice(strSymbols, start).join('');
    }

    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object} [options={}] The options object.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.truncate('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.truncate('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function truncate(string, options) {
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;

      if (isObject(options)) {
        var separator = 'separator' in options ? options.separator : separator;
        length = 'length' in options ? toInteger(options.length) : length;
        omission = 'omission' in options ? baseToString(options.omission) : omission;
      }
      string = toString(string);

      var strLength = string.length;
      if (hasUnicode(string)) {
        var strSymbols = stringToArray(string);
        strLength = strSymbols.length;
      }
      if (length >= strLength) {
        return string;
      }
      var end = length - stringSize(omission);
      if (end < 1) {
        return omission;
      }
      var result = strSymbols
        ? castSlice(strSymbols, 0, end).join('')
        : string.slice(0, end);

      if (separator === undefined) {
        return result + omission;
      }
      if (strSymbols) {
        end += (result.length - end);
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              substring = result;

          if (!separator.global) {
            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            var newEnd = match.index;
          }
          result = result.slice(0, newEnd === undefined ? end : newEnd);
        }
      } else if (string.indexOf(baseToString(separator), end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
     * their corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional
     * HTML entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @since 0.6.0
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
      string = toString(string);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : string;
    }

    /**
     * Converts `string`, as space separated words, to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the upper cased string.
     * @example
     *
     * _.upperCase('--foo-bar');
     * // => 'FOO BAR'
     *
     * _.upperCase('fooBar');
     * // => 'FOO BAR'
     *
     * _.upperCase('__foo_bar__');
     * // => 'FOO BAR'
     */
    var upperCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + word.toUpperCase();
    });

    /**
     * Converts the first character of `string` to upper case.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.upperFirst('fred');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = createCaseFirst('toUpperCase');

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      string = toString(string);
      pattern = guard ? undefined : pattern;

      if (pattern === undefined) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
      }
      return string.match(pattern) || [];
    }

    /*------------------------------------------------------------------------*/

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it's invoked.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Function} func The function to attempt.
     * @param {...*} [args] The arguments to invoke `func` with.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // Avoid throwing errors for invalid selectors.
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = baseRest(function(func, args) {
      try {
        return apply(func, undefined, args);
      } catch (e) {
        return isError(e) ? e : new Error(e);
      }
    });

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method.
     *
     * **Note:** This method doesn't set the "length" property of bound functions.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} methodNames The object method names to bind.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'click': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view, ['click']);
     * jQuery(element).on('click', view.click);
     * // => Logs 'clicked docs' when clicked.
     */
    var bindAll = flatRest(function(object, methodNames) {
      arrayEach(methodNames, function(key) {
        key = toKey(key);
        baseAssignValue(object, key, bind(object[key], object));
      });
      return object;
    });

    /**
     * Creates a function that iterates over `pairs` and invokes the corresponding
     * function of the first predicate to return truthy. The predicate-function
     * pairs are invoked with the `this` binding and arguments of the created
     * function.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Array} pairs The predicate-function pairs.
     * @returns {Function} Returns the new composite function.
     * @example
     *
     * var func = _.cond([
     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
     *   [_.stubTrue,                      _.constant('no match')]
     * ]);
     *
     * func({ 'a': 1, 'b': 2 });
     * // => 'matches A'
     *
     * func({ 'a': 0, 'b': 1 });
     * // => 'matches B'
     *
     * func({ 'a': '1', 'b': '2' });
     * // => 'no match'
     */
    function cond(pairs) {
      var length = pairs == null ? 0 : pairs.length,
          toIteratee = getIteratee();

      pairs = !length ? [] : arrayMap(pairs, function(pair) {
        if (typeof pair[1] != 'function') {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        return [toIteratee(pair[0]), pair[1]];
      });

      return baseRest(function(args) {
        var index = -1;
        while (++index < length) {
          var pair = pairs[index];
          if (apply(pair[0], this, args)) {
            return apply(pair[1], this, args);
          }
        }
      });
    }

    /**
     * Creates a function that invokes the predicate properties of `source` with
     * the corresponding property values of a given object, returning `true` if
     * all predicates return truthy, else `false`.
     *
     * **Note:** The created function is equivalent to `_.conformsTo` with
     * `source` partially applied.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {Object} source The object of property predicates to conform to.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 2, 'b': 1 },
     *   { 'a': 1, 'b': 2 }
     * ];
     *
     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
     * // => [{ 'a': 1, 'b': 2 }]
     */
    function conforms(source) {
      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * Checks `value` to determine whether a default value should be returned in
     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
     * or `undefined`.
     *
     * @static
     * @memberOf _
     * @since 4.14.0
     * @category Util
     * @param {*} value The value to check.
     * @param {*} defaultValue The default value.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * _.defaultTo(1, 10);
     * // => 1
     *
     * _.defaultTo(undefined, 10);
     * // => 10
     */
    function defaultTo(value, defaultValue) {
      return (value == null || value !== value) ? defaultValue : value;
    }

    /**
     * Creates a function that returns the result of invoking the given functions
     * with the `this` binding of the created function, where each successive
     * invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flowRight
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow([_.add, square]);
     * addSquare(1, 2);
     * // => 9
     */
    var flow = createFlow();

    /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the given functions from right to left.
     *
     * @static
     * @since 3.0.0
     * @memberOf _
     * @category Util
     * @param {...(Function|Function[])} [funcs] The functions to invoke.
     * @returns {Function} Returns the new composite function.
     * @see _.flow
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight([square, _.add]);
     * addSquare(1, 2);
     * // => 9
     */
    var flowRight = createFlow(true);

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Creates a function that invokes `func` with the arguments of the created
     * function. If `func` is a property name, the created function returns the
     * property value for a given element. If `func` is an array or object, the
     * created function returns `true` for elements that contain the equivalent
     * source properties, otherwise it returns `false`.
     *
     * @static
     * @since 4.0.0
     * @memberOf _
     * @category Util
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // The `_.matches` iteratee shorthand.
     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
     *
     * // The `_.matchesProperty` iteratee shorthand.
     * _.filter(users, _.iteratee(['user', 'fred']));
     * // => [{ 'user': 'fred', 'age': 40 }]
     *
     * // The `_.property` iteratee shorthand.
     * _.map(users, _.iteratee('user'));
     * // => ['barney', 'fred']
     *
     * // Create custom iteratee shorthands.
     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
     *     return func.test(string);
     *   };
     * });
     *
     * _.filter(['abc', 'def'], /ef/);
     * // => ['def']
     */
    function iteratee(func) {
      return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between a given
     * object and `source`, returning `true` if the given object has equivalent
     * property values, else `false`.
     *
     * **Note:** The created function is equivalent to `_.isMatch` with `source`
     * partially applied.
     *
     * Partial comparisons will match empty array and empty object `source`
     * values against any array or object value, respectively. See `_.isEqual`
     * for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
     */
    function matches(source) {
      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that performs a partial deep comparison between the
     * value at `path` of a given object to `srcValue`, returning `true` if the
     * object value is equivalent, else `false`.
     *
     * **Note:** Partial comparisons will match empty array and empty object
     * `srcValue` values against any array or object value, respectively. See
     * `_.isEqual` for a list of supported value comparisons.
     *
     * @static
     * @memberOf _
     * @since 3.2.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new spec function.
     * @example
     *
     * var objects = [
     *   { 'a': 1, 'b': 2, 'c': 3 },
     *   { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.find(objects, _.matchesProperty('a', 4));
     * // => { 'a': 4, 'b': 5, 'c': 6 }
     */
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
    }

    /**
     * Creates a function that invokes the method at `path` of a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': _.constant(2) } },
     *   { 'a': { 'b': _.constant(1) } }
     * ];
     *
     * _.map(objects, _.method('a.b'));
     * // => [2, 1]
     *
     * _.map(objects, _.method(['a', 'b']));
     * // => [2, 1]
     */
    var method = baseRest(function(path, args) {
      return function(object) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path of `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @since 3.7.0
     * @category Util
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new invoker function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = baseRest(function(object, args) {
      return function(path) {
        return baseInvoke(object, path, args);
      };
    });

    /**
     * Adds all own enumerable string keyed function properties of a source
     * object to the destination object. If `object` is a function, then methods
     * are added to its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options={}] The options object.
     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
    function mixin(object, source, options) {
      var props = keys(source),
          methodNames = baseFunctions(source, props);

      if (options == null &&
          !(isObject(source) && (methodNames.length || !props.length))) {
        options = source;
        source = object;
        object = this;
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
          isFunc = isFunction(object);

      arrayEach(methodNames, function(methodName) {
        var func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = function() {
            var chainAll = this.__chain__;
            if (chain || chainAll) {
              var result = object(this.__wrapped__),
                  actions = result.__actions__ = copyArray(this.__actions__);

              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
              result.__chain__ = chainAll;
              return result;
            }
            return func.apply(object, arrayPush([this.value()], arguments));
          };
        }
      });

      return object;
    }

    /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      if (root._ === this) {
        root._ = oldDash;
      }
      return this;
    }

    /**
     * This method returns `undefined`.
     *
     * @static
     * @memberOf _
     * @since 2.3.0
     * @category Util
     * @example
     *
     * _.times(2, _.noop);
     * // => [undefined, undefined]
     */
    function noop() {
      // No operation performed.
    }

    /**
     * Creates a function that gets the argument at index `n`. If `n` is negative,
     * the nth argument from the end is returned.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [n=0] The index of the argument to return.
     * @returns {Function} Returns the new pass-thru function.
     * @example
     *
     * var func = _.nthArg(1);
     * func('a', 'b', 'c', 'd');
     * // => 'b'
     *
     * var func = _.nthArg(-2);
     * func('a', 'b', 'c', 'd');
     * // => 'c'
     */
    function nthArg(n) {
      n = toInteger(n);
      return baseRest(function(args) {
        return baseNth(args, n);
      });
    }

    /**
     * Creates a function that invokes `iteratees` with the arguments it receives
     * and returns their results.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [iteratees=[_.identity]]
     *  The iteratees to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.over([Math.max, Math.min]);
     *
     * func(1, 2, 3, 4);
     * // => [4, 1]
     */
    var over = createOver(arrayMap);

    /**
     * Creates a function that checks if **all** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overEvery([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => false
     *
     * func(NaN);
     * // => false
     */
    var overEvery = createOver(arrayEvery);

    /**
     * Creates a function that checks if **any** of the `predicates` return
     * truthy when invoked with the arguments it receives.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {...(Function|Function[])} [predicates=[_.identity]]
     *  The predicates to check.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var func = _.overSome([Boolean, isFinite]);
     *
     * func('1');
     * // => true
     *
     * func(null);
     * // => true
     *
     * func(NaN);
     * // => false
     */
    var overSome = createOver(arraySome);

    /**
     * Creates a function that returns the value at `path` of a given object.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': 2 } },
     *   { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(objects, _.property('a.b'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }

    /**
     * The opposite of `_.property`; this method creates a function that returns
     * the value at a given path of `object`.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Util
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new accessor function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      return function(path) {
        return object == null ? undefined : baseGet(object, path);
      };
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
     * `start` is specified without an `end` or `step`. If `end` is not specified,
     * it's set to `start` with `start` then set to `0`.
     *
     * **Note:** JavaScript follows the IEEE-754 standard for resolving
     * floating-point values which can produce unexpected results.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.rangeRight
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(-4);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    var range = createRange();

    /**
     * This method is like `_.range` except that it populates values in
     * descending order.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the range of numbers.
     * @see _.inRange, _.range
     * @example
     *
     * _.rangeRight(4);
     * // => [3, 2, 1, 0]
     *
     * _.rangeRight(-4);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 5);
     * // => [4, 3, 2, 1]
     *
     * _.rangeRight(0, 20, 5);
     * // => [15, 10, 5, 0]
     *
     * _.rangeRight(0, -4, -1);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.rangeRight(0);
     * // => []
     */
    var rangeRight = createRange(true);

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    /**
     * This method returns a new empty object.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Object} Returns the new empty object.
     * @example
     *
     * var objects = _.times(2, _.stubObject);
     *
     * console.log(objects);
     * // => [{}, {}]
     *
     * console.log(objects[0] === objects[1]);
     * // => false
     */
    function stubObject() {
      return {};
    }

    /**
     * This method returns an empty string.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {string} Returns the empty string.
     * @example
     *
     * _.times(2, _.stubString);
     * // => ['', '']
     */
    function stubString() {
      return '';
    }

    /**
     * This method returns `true`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `true`.
     * @example
     *
     * _.times(2, _.stubTrue);
     * // => [true, true]
     */
    function stubTrue() {
      return true;
    }

    /**
     * Invokes the iteratee `n` times, returning an array of the results of
     * each invocation. The iteratee is invoked with one argument; (index).
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.times(3, String);
     * // => ['0', '1', '2']
     *
     *  _.times(4, _.constant(0));
     * // => [0, 0, 0, 0]
     */
    function times(n, iteratee) {
      n = toInteger(n);
      if (n < 1 || n > MAX_SAFE_INTEGER) {
        return [];
      }
      var index = MAX_ARRAY_LENGTH,
          length = nativeMin(n, MAX_ARRAY_LENGTH);

      iteratee = getIteratee(iteratee);
      n -= MAX_ARRAY_LENGTH;

      var result = baseTimes(length, iteratee);
      while (++index < n) {
        iteratee(index);
      }
      return result;
    }

    /**
     * Converts `value` to a property path array.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Util
     * @param {*} value The value to convert.
     * @returns {Array} Returns the new property path array.
     * @example
     *
     * _.toPath('a.b.c');
     * // => ['a', 'b', 'c']
     *
     * _.toPath('a[0].b.c');
     * // => ['a', '0', 'b', 'c']
     */
    function toPath(value) {
      if (isArray(value)) {
        return arrayMap(value, toKey);
      }
      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
    }

    /**
     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {string} [prefix=''] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return toString(prefix) + id;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {number} augend The first number in an addition.
     * @param {number} addend The second number in an addition.
     * @returns {number} Returns the total.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    var add = createMathOperation(function(augend, addend) {
      return augend + addend;
    }, 0);

    /**
     * Computes `number` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */
    var ceil = createRound('ceil');

    /**
     * Divide two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} dividend The first number in a division.
     * @param {number} divisor The second number in a division.
     * @returns {number} Returns the quotient.
     * @example
     *
     * _.divide(6, 4);
     * // => 1.5
     */
    var divide = createMathOperation(function(dividend, divisor) {
      return dividend / divisor;
    }, 1);

    /**
     * Computes `number` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */
    var floor = createRound('floor');

    /**
     * Computes the maximum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => undefined
     */
    function max(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseGt)
        : undefined;
    }

    /**
     * This method is like `_.max` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.maxBy(objects, function(o) { return o.n; });
     * // => { 'n': 2 }
     *
     * // The `_.property` iteratee shorthand.
     * _.maxBy(objects, 'n');
     * // => { 'n': 2 }
     */
    function maxBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
        : undefined;
    }

    /**
     * Computes the mean of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the mean.
     * @example
     *
     * _.mean([4, 2, 8, 6]);
     * // => 5
     */
    function mean(array) {
      return baseMean(array, identity);
    }

    /**
     * This method is like `_.mean` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be averaged.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the mean.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.meanBy(objects, function(o) { return o.n; });
     * // => 5
     *
     * // The `_.property` iteratee shorthand.
     * _.meanBy(objects, 'n');
     * // => 5
     */
    function meanBy(array, iteratee) {
      return baseMean(array, getIteratee(iteratee, 2));
    }

    /**
     * Computes the minimum value of `array`. If `array` is empty or falsey,
     * `undefined` is returned.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => undefined
     */
    function min(array) {
      return (array && array.length)
        ? baseExtremum(array, identity, baseLt)
        : undefined;
    }

    /**
     * This method is like `_.min` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the criterion by which
     * the value is ranked. The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * var objects = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.minBy(objects, function(o) { return o.n; });
     * // => { 'n': 1 }
     *
     * // The `_.property` iteratee shorthand.
     * _.minBy(objects, 'n');
     * // => { 'n': 1 }
     */
    function minBy(array, iteratee) {
      return (array && array.length)
        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
        : undefined;
    }

    /**
     * Multiply two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.7.0
     * @category Math
     * @param {number} multiplier The first number in a multiplication.
     * @param {number} multiplicand The second number in a multiplication.
     * @returns {number} Returns the product.
     * @example
     *
     * _.multiply(6, 4);
     * // => 24
     */
    var multiply = createMathOperation(function(multiplier, multiplicand) {
      return multiplier * multiplicand;
    }, 1);

    /**
     * Computes `number` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Math
     * @param {number} number The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */
    var round = createRound('round');

    /**
     * Subtract two numbers.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {number} minuend The first number in a subtraction.
     * @param {number} subtrahend The second number in a subtraction.
     * @returns {number} Returns the difference.
     * @example
     *
     * _.subtract(6, 4);
     * // => 2
     */
    var subtract = createMathOperation(function(minuend, subtrahend) {
      return minuend - subtrahend;
    }, 0);

    /**
     * Computes the sum of the values in `array`.
     *
     * @static
     * @memberOf _
     * @since 3.4.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 2, 8, 6]);
     * // => 20
     */
    function sum(array) {
      return (array && array.length)
        ? baseSum(array, identity)
        : 0;
    }

    /**
     * This method is like `_.sum` except that it accepts `iteratee` which is
     * invoked for each element in `array` to generate the value to be summed.
     * The iteratee is invoked with one argument: (value).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Math
     * @param {Array} array The array to iterate over.
     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
     * @returns {number} Returns the sum.
     * @example
     *
     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.sumBy(objects, function(o) { return o.n; });
     * // => 20
     *
     * // The `_.property` iteratee shorthand.
     * _.sumBy(objects, 'n');
     * // => 20
     */
    function sumBy(array, iteratee) {
      return (array && array.length)
        ? baseSum(array, getIteratee(iteratee, 2))
        : 0;
    }

    /*------------------------------------------------------------------------*/

    // Add methods that return wrapped values in chain sequences.
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.assignIn = assignIn;
    lodash.assignInWith = assignInWith;
    lodash.assignWith = assignWith;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.castArray = castArray;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.concat = concat;
    lodash.cond = cond;
    lodash.conforms = conforms;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defaultsDeep = defaultsDeep;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.differenceBy = differenceBy;
    lodash.differenceWith = differenceWith;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatMap = flatMap;
    lodash.flatMapDeep = flatMapDeep;
    lodash.flatMapDepth = flatMapDepth;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flattenDepth = flattenDepth;
    lodash.flip = flip;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.fromPairs = fromPairs;
    lodash.functions = functions;
    lodash.functionsIn = functionsIn;
    lodash.groupBy = groupBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.intersectionBy = intersectionBy;
    lodash.intersectionWith = intersectionWith;
    lodash.invert = invert;
    lodash.invertBy = invertBy;
    lodash.invokeMap = invokeMap;
    lodash.iteratee = iteratee;
    lodash.keyBy = keyBy;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.mergeWith = mergeWith;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.negate = negate;
    lodash.nthArg = nthArg;
    lodash.omit = omit;
    lodash.omitBy = omitBy;
    lodash.once = once;
    lodash.orderBy = orderBy;
    lodash.over = over;
    lodash.overArgs = overArgs;
    lodash.overEvery = overEvery;
    lodash.overSome = overSome;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pickBy = pickBy;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAll = pullAll;
    lodash.pullAllBy = pullAllBy;
    lodash.pullAllWith = pullAllWith;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rangeRight = rangeRight;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.reverse = reverse;
    lodash.sampleSize = sampleSize;
    lodash.set = set;
    lodash.setWith = setWith;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortedUniq = sortedUniq;
    lodash.sortedUniqBy = sortedUniqBy;
    lodash.split = split;
    lodash.spread = spread;
    lodash.tail = tail;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.toArray = toArray;
    lodash.toPairs = toPairs;
    lodash.toPairsIn = toPairsIn;
    lodash.toPath = toPath;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.unary = unary;
    lodash.union = union;
    lodash.unionBy = unionBy;
    lodash.unionWith = unionWith;
    lodash.uniq = uniq;
    lodash.uniqBy = uniqBy;
    lodash.uniqWith = uniqWith;
    lodash.unset = unset;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.update = update;
    lodash.updateWith = updateWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.without = without;
    lodash.words = words;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.xorBy = xorBy;
    lodash.xorWith = xorWith;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipObjectDeep = zipObjectDeep;
    lodash.zipWith = zipWith;

    // Add aliases.
    lodash.entries = toPairs;
    lodash.entriesIn = toPairsIn;
    lodash.extend = assignIn;
    lodash.extendWith = assignInWith;

    // Add methods to `lodash.prototype`.
    mixin(lodash, lodash);

    /*------------------------------------------------------------------------*/

    // Add methods that return unwrapped values in chain sequences.
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.ceil = ceil;
    lodash.clamp = clamp;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.cloneDeepWith = cloneDeepWith;
    lodash.cloneWith = cloneWith;
    lodash.conformsTo = conformsTo;
    lodash.deburr = deburr;
    lodash.defaultTo = defaultTo;
    lodash.divide = divide;
    lodash.endsWith = endsWith;
    lodash.eq = eq;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.floor = floor;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.hasIn = hasIn;
    lodash.head = head;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.invoke = invoke;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isArrayBuffer = isArrayBuffer;
    lodash.isArrayLike = isArrayLike;
    lodash.isArrayLikeObject = isArrayLikeObject;
    lodash.isBoolean = isBoolean;
    lodash.isBuffer = isBuffer;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isEqualWith = isEqualWith;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isInteger = isInteger;
    lodash.isLength = isLength;
    lodash.isMap = isMap;
    lodash.isMatch = isMatch;
    lodash.isMatchWith = isMatchWith;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNil = isNil;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isObjectLike = isObjectLike;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isSafeInteger = isSafeInteger;
    lodash.isSet = isSet;
    lodash.isString = isString;
    lodash.isSymbol = isSymbol;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.isWeakMap = isWeakMap;
    lodash.isWeakSet = isWeakSet;
    lodash.join = join;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lowerCase = lowerCase;
    lodash.lowerFirst = lowerFirst;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.maxBy = maxBy;
    lodash.mean = mean;
    lodash.meanBy = meanBy;
    lodash.min = min;
    lodash.minBy = minBy;
    lodash.stubArray = stubArray;
    lodash.stubFalse = stubFalse;
    lodash.stubObject = stubObject;
    lodash.stubString = stubString;
    lodash.stubTrue = stubTrue;
    lodash.multiply = multiply;
    lodash.nth = nth;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padEnd = padEnd;
    lodash.padStart = padStart;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.replace = replace;
    lodash.result = result;
    lodash.round = round;
    lodash.runInContext = runInContext;
    lodash.sample = sample;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedIndexBy = sortedIndexBy;
    lodash.sortedIndexOf = sortedIndexOf;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.sortedLastIndexBy = sortedLastIndexBy;
    lodash.sortedLastIndexOf = sortedLastIndexOf;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.subtract = subtract;
    lodash.sum = sum;
    lodash.sumBy = sumBy;
    lodash.template = template;
    lodash.times = times;
    lodash.toFinite = toFinite;
    lodash.toInteger = toInteger;
    lodash.toLength = toLength;
    lodash.toLower = toLower;
    lodash.toNumber = toNumber;
    lodash.toSafeInteger = toSafeInteger;
    lodash.toString = toString;
    lodash.toUpper = toUpper;
    lodash.trim = trim;
    lodash.trimEnd = trimEnd;
    lodash.trimStart = trimStart;
    lodash.truncate = truncate;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.upperCase = upperCase;
    lodash.upperFirst = upperFirst;

    // Add aliases.
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.first = head;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
          source[methodName] = func;
        }
      });
      return source;
    }()), { 'chain': false });

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type {string}
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      LazyWrapper.prototype[methodName] = function(n) {
        n = n === undefined ? 1 : nativeMax(toInteger(n), 0);

        var result = (this.__filtered__ && !index)
          ? new LazyWrapper(this)
          : this.clone();

        if (result.__filtered__) {
          result.__takeCount__ = nativeMin(n, result.__takeCount__);
        } else {
          result.__views__.push({
            'size': nativeMin(n, MAX_ARRAY_LENGTH),
            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
          });
        }
        return result;
      };

      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };
    });

    // Add `LazyWrapper` methods that accept an `iteratee` value.
    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
      var type = index + 1,
          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

      LazyWrapper.prototype[methodName] = function(iteratee) {
        var result = this.clone();
        result.__iteratees__.push({
          'iteratee': getIteratee(iteratee, 3),
          'type': type
        });
        result.__filtered__ = result.__filtered__ || isFilter;
        return result;
      };
    });

    // Add `LazyWrapper` methods for `_.head` and `_.last`.
    arrayEach(['head', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
    arrayEach(['initial', 'tail'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.find = function(predicate) {
      return this.filter(predicate).head();
    };

    LazyWrapper.prototype.findLast = function(predicate) {
      return this.reverse().find(predicate);
    };

    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
      if (typeof path == 'function') {
        return new LazyWrapper(this);
      }
      return this.map(function(value) {
        return baseInvoke(value, path, args);
      });
    });

    LazyWrapper.prototype.reject = function(predicate) {
      return this.filter(negate(getIteratee(predicate)));
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = toInteger(start);

      var result = this;
      if (result.__filtered__ && (start > 0 || end < 0)) {
        return new LazyWrapper(result);
      }
      if (start < 0) {
        result = result.takeRight(-start);
      } else if (start) {
        result = result.drop(start);
      }
      if (end !== undefined) {
        end = toInteger(end);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.takeRightWhile = function(predicate) {
      return this.reverse().takeWhile(predicate).reverse();
    };

    LazyWrapper.prototype.toArray = function() {
      return this.take(MAX_ARRAY_LENGTH);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
          isTaker = /^(?:head|last)$/.test(methodName),
          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
          retUnwrapped = isTaker || /^find/.test(methodName);

      if (!lodashFunc) {
        return;
      }
      lodash.prototype[methodName] = function() {
        var value = this.__wrapped__,
            args = isTaker ? [1] : arguments,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        var interceptor = function(value) {
          var result = lodashFunc.apply(lodash, arrayPush([value], args));
          return (isTaker && chainAll) ? result[0] : result;
        };

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // Avoid lazy use if the iteratee has a "length" value other than `1`.
          isLazy = useLazy = false;
        }
        var chainAll = this.__chain__,
            isHybrid = !!this.__actions__.length,
            isUnwrapped = retUnwrapped && !chainAll,
            onlyLazy = isLazy && !isHybrid;

        if (!retUnwrapped && useLazy) {
          value = onlyLazy ? value : new LazyWrapper(this);
          var result = func.apply(value, args);
          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
          return new LodashWrapper(result, chainAll);
        }
        if (isUnwrapped && onlyLazy) {
          return func.apply(this, args);
        }
        result = this.thru(interceptor);
        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
      };
    });

    // Add `Array` methods to `lodash.prototype`.
    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
      var func = arrayProto[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          var value = this.value();
          return func.apply(isArray(value) ? value : [], args);
        }
        return this[chainName](function(value) {
          return func.apply(isArray(value) ? value : [], args);
        });
      };
    });

    // Map minified method names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = lodashFunc.name + '';
        if (!hasOwnProperty.call(realNames, key)) {
          realNames[key] = [];
        }
        realNames[key].push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
      'name': 'wrapper',
      'func': undefined
    }];

    // Add methods to `LazyWrapper`.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chain sequence methods to the `lodash` wrapper.
    lodash.prototype.at = wrapperAt;
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.next = wrapperNext;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add lazy aliases.
    lodash.prototype.first = lodash.prototype.head;

    if (symIterator) {
      lodash.prototype[symIterator] = wrapperToIterator;
    }
    return lodash;
  });

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return _;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = _)._ = _;
    // Export for CommonJS support.
    freeExports._ = _;
  }
  else {
    // Export to the global object.
    root._ = _;
  }
}.call(this));

},{"buffer":"../node_modules/buffer/index.js"}],"../node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"../node_modules/cephes/cephes.wasm.base64.json":[function(require,module,exports) {
module.exports = "AGFzbQEAAAABkwEWYAJ/fwF/YAF/AX9gAAF/YAF/AGACf38AYAF8AXxgBXx/f39/AX9gAnx8AXxgA39/fAF8YAN8fHwBfGADfH9/AXxgBnx8f39/fwF/YAJ/fAF8YAJ8fwF8YAF/AXxgA3x/fwF/YAR8fHx8AXxgBXx8fHx/AXxgBXx8fH9/AXxgAXwBf2AEf3x/fwF8YAR8f39/AX8CHgIDZW52B19tdGhlcnIAAANlbnYGbWVtb3J5AgEgIAONAYsBAQIDBAUGBQUFBQcFCAgIBwcJBQoHBwcFBQUHBwULBQUFBQwNDggICA0NDwUFCQkQEQkSBQUFBQcHBwkJCRMTEwcFBQUFDAcHBxQFBQUFDAwFDAUFBQUICAgFBQUFDAwMBwcHBQoKDAcNBQUFDw8FBQkVBQUFBQwMEREHBwUNBQUNBQUFBQUMBwUBAwYQAn8BQeCAAQt/AUHggMEACweMEIQBDF9jZXBoZXNfYWNvcwAIDV9jZXBoZXNfYWNvc2gABQxfY2VwaGVzX2FpcnkABgxfY2VwaGVzX2FzaW4ABw1fY2VwaGVzX2FzaW5oAAkMX2NlcGhlc19hdGFuAAoNX2NlcGhlc19hdGFuMgALDV9jZXBoZXNfYXRhbmgADAxfY2VwaGVzX2JkdHIADg1fY2VwaGVzX2JkdHJjAA0NX2NlcGhlc19iZHRyaQAPDF9jZXBoZXNfYmV0YQAQDV9jZXBoZXNfYnRkdHIAEgxfY2VwaGVzX2NicnQAEw5fY2VwaGVzX2NoYmV2bAAUDV9jZXBoZXNfY2hkdHIAFg5fY2VwaGVzX2NoZHRyYwAVDl9jZXBoZXNfY2hkdHJpABcLX2NlcGhlc19jb3MAcA1fY2VwaGVzX2Nvc2RnAHQMX2NlcGhlc19jb3NoABgNX2NlcGhlc19jb3NtMQCGAQtfY2VwaGVzX2NvdAB/DV9jZXBoZXNfY290ZGcAggENX2NlcGhlc19kYXdzbgAZCl9jZXBoZXNfZWkAGg1fY2VwaGVzX2VsbGllABsNX2NlcGhlc19lbGxpawAcDV9jZXBoZXNfZWxscGUAHQ1fY2VwaGVzX2VsbHBqAB4NX2NlcGhlc19lbGxwawAfC19jZXBoZXNfZXJmAFwMX2NlcGhlc19lcmZjAFsLX2NlcGhlc19leHAAIA1fY2VwaGVzX2V4cDEwACEMX2NlcGhlc19leHAyACINX2NlcGhlc19leHBtMQCFAQxfY2VwaGVzX2V4cG4AIw1fY2VwaGVzX2V4cHgyACQLX2NlcGhlc19mYWMAJQxfY2VwaGVzX2ZkdHIAJw1fY2VwaGVzX2ZkdHJjACYNX2NlcGhlc19mZHRyaQAoDl9jZXBoZXNfZnJlc25sACsNX2NlcGhlc19mcmV4cAApDV9jZXBoZXNfZ2FtbWEALAxfY2VwaGVzX2dkdHIALg1fY2VwaGVzX2dkdHJjAC8OX2NlcGhlc19oeXAyZjAAMw5fY2VwaGVzX2h5cDJmMQAwDl9jZXBoZXNfaHlwZXJnADIKX2NlcGhlc19pMAA0C19jZXBoZXNfaTBlADUKX2NlcGhlc19pMQA2C19jZXBoZXNfaTFlADcMX2NlcGhlc19pZ2FtADkNX2NlcGhlc19pZ2FtYwA4DV9jZXBoZXNfaWdhbWkAOg5fY2VwaGVzX2luY2JldAA7DV9jZXBoZXNfaW5jYmkAPRBfY2VwaGVzX2lzZmluaXRlAEANX2NlcGhlc19pc25hbgA/Cl9jZXBoZXNfaXYAQQpfY2VwaGVzX2owAEIKX2NlcGhlc19qMQBECl9jZXBoZXNfam4ARgpfY2VwaGVzX2p2AEcKX2NlcGhlc19rMABLC19jZXBoZXNfazBlAEwKX2NlcGhlc19rMQBNC19jZXBoZXNfazFlAE4KX2NlcGhlc19rbgBPD19jZXBoZXNfa29sbW9naQBTEl9jZXBoZXNfa29sbW9nb3JvdgBRDV9jZXBoZXNfbGJldGEAEQ1fY2VwaGVzX2xkZXhwACoMX2NlcGhlc19sZ2FtAC0LX2NlcGhlc19sb2cAVA1fY2VwaGVzX2xvZzEwAFUNX2NlcGhlc19sb2cxcACEAQxfY2VwaGVzX2xvZzIAVg1fY2VwaGVzX25iZHRyAFgOX2NlcGhlc19uYmR0cmMAVw5fY2VwaGVzX25iZHRyaQBZDF9jZXBoZXNfbmR0cgBaDV9jZXBoZXNfbmR0cmkAXQ1fY2VwaGVzX29uZWYyAHkNX2NlcGhlc19wMWV2bABmDF9jZXBoZXNfcGR0cgBfDV9jZXBoZXNfcGR0cmMAXg1fY2VwaGVzX3BkdHJpAGAPX2NlcGhlc19wbGFuY2tjAGIPX2NlcGhlc19wbGFuY2tkAGMPX2NlcGhlc19wbGFuY2tpAGEPX2NlcGhlc19wbGFuY2t3AGQOX2NlcGhlc19wb2xldmwAZQ9fY2VwaGVzX3BvbHlsb2cAZwtfY2VwaGVzX3BvdwBoDF9jZXBoZXNfcG93aQBpC19jZXBoZXNfcHNpAGoOX2NlcGhlc19yYWRpYW4AcQ5fY2VwaGVzX3JnYW1tYQBrDV9jZXBoZXNfcm91bmQAbA5fY2VwaGVzX3NoaWNoaQBtDF9jZXBoZXNfc2ljaQBuD19jZXBoZXNfc2lnbmJpdAA+C19jZXBoZXNfc2luAG8OX2NlcGhlc19zaW5jb3MAcg1fY2VwaGVzX3NpbmRnAHMMX2NlcGhlc19zaW5oAHUPX2NlcGhlc19zbWlybm92AFAQX2NlcGhlc19zbWlybm92aQBSDl9jZXBoZXNfc3BlbmNlAHYNX2NlcGhlc19zdGR0cgB3Dl9jZXBoZXNfc3RkdHJpAHgOX2NlcGhlc19zdHJ1dmUAewtfY2VwaGVzX3RhbgB9DV9jZXBoZXNfdGFuZGcAgAEMX2NlcGhlc190YW5oAIMBD19jZXBoZXNfdGhyZWVmMAB6Cl9jZXBoZXNfeTAAQwpfY2VwaGVzX3kxAEUKX2NlcGhlc195bgCHAQpfY2VwaGVzX3l2AHwMX2NlcGhlc196ZXRhAIgBDV9jZXBoZXNfemV0YWMAiQEFX2ZyZWUAiwEHX21hbGxvYwCKARNlc3RhYmxpc2hTdGFja1NwYWNlAAQKc3RhY2tBbGxvYwABDHN0YWNrUmVzdG9yZQADCXN0YWNrU2F2ZQACCo39AosBGwEBfyMAIQEgACMAaiQAIwBBD2pBcHEkACABCwQAIwALBgAgACQACwoAIAAkACABJAELmgEBAXwgAEQAAAAAAADwP2MEQEGA8wBBARAAGkHw8gArAwAPCyAARAAAAACE15dBZARAQejyACsDACIBIABhBEAgAQ8LIAAQVEHQ8gArAwCgDwsgAEQAAAAAAADwv6AiAUQAAAAAAADgP2MEfCABnyABQYAIQQQQZSABQbAIQQUQZqOiBSABIABEAAAAAAAA8D+gop8gAKAQVAsLigkCAX8IfCAARAwCK4cW+VlAZARAIAFEAAAAAAAAAAA5AwAgAkQAAAAAAAAAADkDACADQZjyACsDADkDACAEQZjyACsDADkD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aGR0cgBjaGR0cmkAY29zaABlaQBlbGxpawBlbGxwZQBlbGxwagBlbGxwawBleHBuAGZhYwBmZHRyYwBmZHRyAGZkdHJpAGdhbW1hAGxnYW0AZ2R0cgBnZHRyYwBoeXAyZjEAaHlwZXJnAGlnYW1jAGlnYW0AaWdhbWkAaW5jYmV0AGluY2JpAGl2AHkwAHkxAEp2AGp2AGswAGswZQBrMQBrMWUAa24Ac21pcm5vdmkAa29sbW9naQBsb2cAbG9nMTAAbG9nMgBuYmR0cgBuYmR0cmkAZXJmYwBuZHRyaQBwZHRyYwBwZHRyAHBkdHJpAHBvbHlsb2cAcG93AHBvdwBwb3dpAHBzaQByZ2FtbWEAc2luAGNvcwBzaW5kZwBjb3NkZwBzaW5oAHNwZW5jZQBzdGR0cgBzdGR0cmkAdGFuAGNvdAB0YW5kZwBjb3RkZwB5bgB6ZXRhAHpldGFjANoPBG5hbWUB0g+MAQAHX210aGVycgEKc3RhY2tBbGxvYwIJc3RhY2tTYXZlAwxzdGFja1Jlc3RvcmUEE2VzdGFibGlzaFN0YWNrU3BhY2UFDV9jZXBoZXNfYWNvc2gGDF9jZXBoZXNfYWlyeQcMX2NlcGhlc19hc2luCAxfY2VwaGVzX2Fjb3MJDV9jZXBoZXNfYXNpbmgKDF9jZXBoZXNfYXRhbgsNX2NlcGhlc19hdGFuMgwNX2NlcGhlc19hdGFuaA0NX2NlcGhlc19iZHRyYw4MX2NlcGhlc19iZHRyDw1fY2VwaGVzX2JkdHJpEAxfY2VwaGVzX2JldGERDV9jZXBoZXNfbGJldGESDV9jZXBoZXNfYnRkdHITDF9jZXBoZXNfY2JydBQOX2NlcGhlc19jaGJldmwVDl9jZXBoZXNfY2hkdHJjFg1fY2VwaGVzX2NoZHRyFw5fY2VwaGVzX2NoZHRyaRgMX2NlcGhlc19jb3NoGQ1fY2VwaGVzX2Rhd3NuGgpfY2VwaGVzX2VpGw1fY2VwaGVzX2VsbGllHA1fY2VwaGVzX2VsbGlrHQ1fY2VwaGVzX2VsbHBlHg1fY2VwaGVzX2VsbHBqHw1fY2VwaGVzX2VsbHBrIAtfY2VwaGVzX2V4cCENX2NlcGhlc19leHAxMCIMX2NlcGhlc19leHAyIwxfY2VwaGVzX2V4cG4kDV9jZXBoZXNfZXhweDIlC19jZXBoZXNfZmFjJg1fY2VwaGVzX2ZkdHJjJwxfY2VwaGVzX2ZkdHIoDV9jZXBoZXNfZmR0cmkpDV9jZXBoZXNfZnJleHAqDV9jZXBoZXNfbGRleHArDl9jZXBoZXNfZnJlc25sLA1fY2VwaGVzX2dhbW1hLQxfY2VwaGVzX2xnYW0uDF9jZXBoZXNfZ2R0ci8NX2NlcGhlc19nZHRyYzAOX2NlcGhlc19oeXAyZjExB19oeXQyZjEyDl9jZXBoZXNfaHlwZXJnMw5fY2VwaGVzX2h5cDJmMDQKX2NlcGhlc19pMDULX2NlcGhlc19pMGU2Cl9jZXBoZXNfaTE3C19jZXBoZXNfaTFlOA1fY2VwaGVzX2lnYW1jOQxfY2VwaGVzX2lnYW06DV9jZXBoZXNfaWdhbWk7Dl9jZXBoZXNfaW5jYmV0PAhfcHNlcmllcz0NX2NlcGhlc19pbmNiaT4PX2NlcGhlc19zaWduYml0Pw1fY2VwaGVzX2lzbmFuQBBfY2VwaGVzX2lzZmluaXRlQQpfY2VwaGVzX2l2QgpfY2VwaGVzX2owQwpfY2VwaGVzX3kwRApfY2VwaGVzX2oxRQpfY2VwaGVzX3kxRgpfY2VwaGVzX2puRwpfY2VwaGVzX2p2SARfanZzSQdfaGFua2VsSgZfcmVjdXJLCl9jZXBoZXNfazBMC19jZXBoZXNfazBlTQpfY2VwaGVzX2sxTgtfY2VwaGVzX2sxZU8KX2NlcGhlc19rblAPX2NlcGhlc19zbWlybm92URJfY2VwaGVzX2tvbG1vZ29yb3ZSEF9jZXBoZXNfc21pcm5vdmlTD19jZXBoZXNfa29sbW9naVQLX2NlcGhlc19sb2dVDV9jZXBoZXNfbG9nMTBWDF9jZXBoZXNfbG9nMlcOX2NlcGhlc19uYmR0cmNYDV9jZXBoZXNfbmJkdHJZDl9jZXBoZXNfbmJkdHJpWgxfY2VwaGVzX25kdHJbDF9jZXBoZXNfZXJmY1wLX2NlcGhlc19lcmZdDV9jZXBoZXNfbmR0cmleDV9jZXBoZXNfcGR0cmNfDF9jZXBoZXNfcGR0cmANX2NlcGhlc19wZHRyaWEPX2NlcGhlc19wbGFuY2tpYg9fY2VwaGVzX3BsYW5ja2NjD19jZXBoZXNfcGxhbmNrZGQPX2NlcGhlc19wbGFuY2t3ZQ5fY2VwaGVzX3BvbGV2bGYNX2NlcGhlc19wMWV2bGcPX2NlcGhlc19wb2x5bG9naAtfY2VwaGVzX3Bvd2kMX2NlcGhlc19wb3dpagtfY2VwaGVzX3BzaWsOX2NlcGhlc19yZ2FtbWFsDV9jZXBoZXNfcm91bmRtDl9jZXBoZXNfc2hpY2hpbgxfY2VwaGVzX3NpY2lvC19jZXBoZXNfc2lucAtfY2VwaGVzX2Nvc3EOX2NlcGhlc19yYWRpYW5yDl9jZXBoZXNfc2luY29zcw1fY2VwaGVzX3NpbmRndA1fY2VwaGVzX2Nvc2RndQxfY2VwaGVzX3Npbmh2Dl9jZXBoZXNfc3BlbmNldw1fY2VwaGVzX3N0ZHRyeA5fY2VwaGVzX3N0ZHRyaXkNX2NlcGhlc19vbmVmMnoPX2NlcGhlc190aHJlZWYwew5fY2VwaGVzX3N0cnV2ZXwKX2NlcGhlc195dn0LX2NlcGhlc190YW5+B190YW5jb3R/C19jZXBoZXNfY290gAENX2NlcGhlc190YW5kZ4EBC190YW5jb3RfMjI0ggENX2NlcGhlc19jb3RkZ4MBDF9jZXBoZXNfdGFuaIQBDV9jZXBoZXNfbG9nMXCFAQ1fY2VwaGVzX2V4cG0xhgENX2NlcGhlc19jb3NtMYcBCl9jZXBoZXNfeW6IAQxfY2VwaGVzX3pldGGJAQ1fY2VwaGVzX3pldGFjigEHX21hbGxvY4sBBV9mcmVl"
;
},{}],"../node_modules/cephes/cephes-wrapper.js":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;

const fs = require('fs');

const TOTAL_STACK = 1024 * 1024; // 1MB
const TOTAL_MEMORY = 2 * 1024 * 1024; // 1MB
const WASM_PAGE_SIZE = 64 * 1024; // Defined in WebAssembly specs

const WASM_CODE = Buffer.from(require('./cephes.wasm.base64.json'), 'base64');

class CephesWrapper {
  constructor(sync) {
    // Initialize the runtime's memory
    this._wasmMemory = new WebAssembly.Memory({
      'initial': TOTAL_MEMORY / WASM_PAGE_SIZE,
      'maximum': TOTAL_MEMORY / WASM_PAGE_SIZE
    });

    this._HEAP8 = new Int8Array(this._wasmMemory.buffer);
    this._HEAP16 = new Int16Array(this._wasmMemory.buffer);
    this._HEAP32 = new Int32Array(this._wasmMemory.buffer);
    this._HEAPF32 = new Float32Array(this._wasmMemory.buffer);
    this._HEAPF64 = new Float64Array(this._wasmMemory.buffer);

    // Compile and export program
    if (sync) {
      // compile synchronously
      const program = this._compileSync();
      this._exportProgram(program);

      // create a dummy compile promise
      this.compiled = Promise.resolve();
    } else {
      // create a singleton compile promise
      this.compiled = this._compileAsync()
        .then((program) => this._exportProgram(program));
    }
  }

  _AsciiToString(ptr) {
    let str = '';
    while (1) {
      const ch = this._HEAP8[((ptr++)>>0)];
      if (ch === 0) return str;
      str += String.fromCharCode(ch);
    }
  }

  _mtherr(name /* char* */, code /* int */) {
    // from mtherr.c
    let codemsg = '';
    switch (code) {
      case 1: codemsg = 'argument domain error'; break;
      case 2: codemsg = 'function singularity'; break;
      case 3: codemsg = 'overflow range error'; break;
      case 4: codemsg = 'underflow range error'; break;
      case 5: codemsg = 'total loss of precision'; break;
      case 6: codemsg = 'partial loss of precision'; break;
      case 33: codemsg = 'Unix domain error code'; break;
      case 34: codemsg = 'Unix range error code'; break;
      default: codemsg = 'unknown error';
    }

    const fnname = this._AsciiToString(name);
    const message = 'cephes reports "' + codemsg + '" in ' + fnname;

    // Restore stack to the STACKTOP before throwing. This only works because
    // all the exported cephes functions are plain functions.
    this.stackRestore(0);

    if (code == 1) {
      throw new RangeError(message);
    } else {
      throw new Error(message);
    }
  }

  _wasmImports() {
    return {
      'env': {
        // cephes error handler
        "_mtherr": this._mtherr.bind(this),

        // memory
        "memory": this._wasmMemory,
        "STACKTOP": 0,
        "STACK_MAX": TOTAL_STACK
      }
    };
  }

  _compileSync() {
    return new WebAssembly.Instance(
      new WebAssembly.Module(WASM_CODE),
      this._wasmImports()
    );
  }

  _compileAsync() {
    return WebAssembly.instantiate(
      WASM_CODE,
      this._wasmImports()
    ).then((results) => results.instance);
  }

  _exportProgram(program) {
    // export cephes functions
    for (const key of Object.keys(program.exports)) {
      if (key.startsWith('_cephes_')) {
        this[key] = program.exports[key];
      }
    }

    // export special stack functions
    this.stackAlloc = program.exports.stackAlloc;
    this.stackRestore = program.exports.stackRestore;
    this.stackSave = program.exports.stackSave;
  }

  // export helper functions
  getValue(ptr, type) {
    type = type || 'i8';
    if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
      switch(type) {
        case 'i1': return this._HEAP8[((ptr)>>0)];
        case 'i8': return this._HEAP8[((ptr)>>0)];
        case 'i16': return this._HEAP16[((ptr)>>1)];
        case 'i32': return this._HEAP32[((ptr)>>2)];
        case 'i64': return this._HEAP32[((ptr)>>2)];
        case 'float': return this._HEAPF32[((ptr)>>2)];
        case 'double': return this._HEAPF64[((ptr)>>3)];
        default: throw new Error('invalid type for getValue: ' + type);
      }
    return null;
  }

  writeArrayToMemory(array, buffer) {
    this._HEAP8.set(array, buffer);
  }
}

module.exports = CephesWrapper;

},{"fs":"../node_modules/parcel-bundler/src/builtins/_empty.js","./cephes.wasm.base64.json":"../node_modules/cephes/cephes.wasm.base64.json","buffer":"../node_modules/buffer/index.js"}],"../node_modules/cephes/cephes-browser.js":[function(require,module,exports) {

const CephesWrapper = require('./cephes-wrapper.js');

// Compile async in the browser
module.exports = new CephesWrapper(false);

},{"./cephes-wrapper.js":"../node_modules/cephes/cephes-wrapper.js"}],"../node_modules/cephes/index.js":[function(require,module,exports) {

const cephes = require('./cephes.js');

// Export compiled promise, in Node.js this is just a dummy promise as the
// WebAssembly program will be compiled synchronously. It takes about 20ms
// as of Node.js v10.6.1.
exports.compiled = cephes.compiled;

// from cephes/isnan.c
exports.signbit = function signbit(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: int
  const fn_ret = cephes._cephes_signbit(carg_x) | 0;

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/isnan.c
exports.isnan = function isnan(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: int
  const fn_ret = cephes._cephes_isnan(carg_x) | 0;

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/isnan.c
exports.isfinite = function isfinite(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: int
  const fn_ret = cephes._cephes_isfinite(carg_x) | 0;

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/cbrt.c
exports.cbrt = function cbrt(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_cbrt(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/polevl.c
exports.polevl = function polevl(/* double */ x, /* double[] */ coef, /* int */ N) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double[] coef
  if (!(coef instanceof Float64Array)) {
    cephes.stackRestore(stacktop);
    throw new TypeError('coef must be either a Float64Array');
  }
  const carg_coef = cephes.stackAlloc(coef.length << 3);
  cephes.writeArrayToMemory(new Uint8Array(coef.buffer, coef.byteOffset, coef.byteLength), carg_coef);

  // argument: int N
  if (typeof N !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('N must be a number');
  }
  const carg_N = N | 0;

  // return: double
  const fn_ret = cephes._cephes_polevl(carg_x, carg_coef, carg_N);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/chbevl.c
exports.chbevl = function chbevl(/* double */ x, /* double[] */ array, /* int */ n) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double[] array
  if (!(array instanceof Float64Array)) {
    cephes.stackRestore(stacktop);
    throw new TypeError('array must be either a Float64Array');
  }
  const carg_array = cephes.stackAlloc(array.length << 3);
  cephes.writeArrayToMemory(new Uint8Array(array.buffer, array.byteOffset, array.byteLength), carg_array);

  // argument: int n
  if (typeof n !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // return: double
  const fn_ret = cephes._cephes_chbevl(carg_x, carg_array, carg_n);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/round.c
exports.round = function round(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_round(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/floor.c
exports.frexp = function frexp(/* double */ x) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: int* pw2
  const carg_pw2 = cephes.stackAlloc(4); // No need to zero-set it.

  // return: double
  const fn_ret = cephes._cephes_frexp(carg_x, carg_pw2);

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'pw2': cephes.getValue(carg_pw2, 'i32'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/floor.c
exports.ldexp = function ldexp(/* double */ x, /* int */ pw2) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: int pw2
  if (typeof pw2 !== 'number') {
    throw new TypeError('pw2 must be a number');
  }
  const carg_pw2 = pw2 | 0;

  // return: double
  const fn_ret = cephes._cephes_ldexp(carg_x, carg_pw2);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/expx2.c
exports.expx2 = function expx2(/* double */ x, /* int */ sign) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: int sign
  if (typeof sign !== 'number') {
    throw new TypeError('sign must be a number');
  }
  const carg_sign = sign | 0;

  // return: double
  const fn_ret = cephes._cephes_expx2(carg_x, carg_sign);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sin.c
exports.radian = function radian(/* double */ d, /* double */ m, /* double */ s) {
  // argument: double d
  if (typeof d !== 'number') {
    throw new TypeError('d must be a number');
  }
  const carg_d = d;

  // argument: double m
  if (typeof m !== 'number') {
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // argument: double s
  if (typeof s !== 'number') {
    throw new TypeError('s must be a number');
  }
  const carg_s = s;

  // return: double
  const fn_ret = cephes._cephes_radian(carg_d, carg_m, carg_s);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sincos.c
exports.sincos = function sincos(/* double */ x, /* int */ flg) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double* s
  const carg_s = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* c
  const carg_c = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: int flg
  if (typeof flg !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('flg must be a number');
  }
  const carg_flg = flg | 0;

  // return: int
  const fn_ret = cephes._cephes_sincos(carg_x, carg_s, carg_c, carg_flg) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    's': cephes.getValue(carg_s, 'double'),
    'c': cephes.getValue(carg_c, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/tan.c
exports.cot = function cot(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_cot(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/tandg.c
exports.cotdg = function cotdg(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_cotdg(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/unity.c
exports.log1p = function log1p(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_log1p(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/unity.c
exports.expm1 = function expm1(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_expm1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/unity.c
exports.cosm1 = function cosm1(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_cosm1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/asin.c
exports.acos = function acos(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_acos(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/acosh.c
exports.acosh = function acosh(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_acosh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/asinh.c
exports.asinh = function asinh(/* double */ xx) {
  // argument: double xx
  if (typeof xx !== 'number') {
    throw new TypeError('xx must be a number');
  }
  const carg_xx = xx;

  // return: double
  const fn_ret = cephes._cephes_asinh(carg_xx);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/atanh.c
exports.atanh = function atanh(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_atanh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/asin.c
exports.asin = function asin(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_asin(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/atan.c
exports.atan = function atan(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_atan(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/atan.c
exports.atan2 = function atan2(/* double */ y, /* double */ x) {
  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_atan2(carg_y, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sin.c
exports.cos = function cos(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_cos(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sindg.c
exports.cosdg = function cosdg(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_cosdg(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/exp.c
exports.exp = function exp(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_exp(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/exp2.c
exports.exp2 = function exp2(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_exp2(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/exp10.c
exports.exp10 = function exp10(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_exp10(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/cosh.c
exports.cosh = function cosh(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_cosh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sinh.c
exports.sinh = function sinh(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_sinh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/tanh.c
exports.tanh = function tanh(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_tanh(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/log.c
exports.log = function log(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_log(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/log2.c
exports.log2 = function log2(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_log2(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/log10.c
exports.log10 = function log10(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_log10(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/pow.c
exports.pow = function pow(/* double */ x, /* double */ y) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes._cephes_pow(carg_x, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/powi.c
exports.powi = function powi(/* double */ x, /* int */ nn) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: int nn
  if (typeof nn !== 'number') {
    throw new TypeError('nn must be a number');
  }
  const carg_nn = nn | 0;

  // return: double
  const fn_ret = cephes._cephes_powi(carg_x, carg_nn);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sin.c
exports.sin = function sin(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_sin(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/sindg.c
exports.sindg = function sindg(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_sindg(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/tan.c
exports.tan = function tan(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_tan(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/tandg.c
exports.tandg = function tandg(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_tandg(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ei.c
exports.ei = function ei(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_ei(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/expn.c
exports.expn = function expn(/* int */ n, /* double */ x) {
  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_expn(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/shichi.c
exports.shichi = function shichi(/* double */ x) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double* si
  const carg_si = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* ci
  const carg_ci = cephes.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes._cephes_shichi(carg_x, carg_si, carg_ci) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'si': cephes.getValue(carg_si, 'double'),
    'ci': cephes.getValue(carg_ci, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/sici.c
exports.sici = function sici(/* double */ x) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double* si
  const carg_si = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* ci
  const carg_ci = cephes.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes._cephes_sici(carg_x, carg_si, carg_ci) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'si': cephes.getValue(carg_si, 'double'),
    'ci': cephes.getValue(carg_ci, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/beta.c
exports.lbeta = function lbeta(/* double */ a, /* double */ b) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // return: double
  const fn_ret = cephes._cephes_lbeta(carg_a, carg_b);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/beta.c
exports.beta = function beta(/* double */ a, /* double */ b) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // return: double
  const fn_ret = cephes._cephes_beta(carg_a, carg_b);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/fac.c
exports.fac = function fac(/* int */ i) {
  // argument: int i
  if (typeof i !== 'number') {
    throw new TypeError('i must be a number');
  }
  const carg_i = i | 0;

  // return: double
  const fn_ret = cephes._cephes_fac(carg_i);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/gamma.c
exports.gamma = function gamma(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_gamma(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/gamma.c
exports.lgam = function lgam(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_lgam(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/incbet.c
exports.incbet = function incbet(/* double */ aa, /* double */ bb, /* double */ xx) {
  // argument: double aa
  if (typeof aa !== 'number') {
    throw new TypeError('aa must be a number');
  }
  const carg_aa = aa;

  // argument: double bb
  if (typeof bb !== 'number') {
    throw new TypeError('bb must be a number');
  }
  const carg_bb = bb;

  // argument: double xx
  if (typeof xx !== 'number') {
    throw new TypeError('xx must be a number');
  }
  const carg_xx = xx;

  // return: double
  const fn_ret = cephes._cephes_incbet(carg_aa, carg_bb, carg_xx);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/incbi.c
exports.incbi = function incbi(/* double */ aa, /* double */ bb, /* double */ yy0) {
  // argument: double aa
  if (typeof aa !== 'number') {
    throw new TypeError('aa must be a number');
  }
  const carg_aa = aa;

  // argument: double bb
  if (typeof bb !== 'number') {
    throw new TypeError('bb must be a number');
  }
  const carg_bb = bb;

  // argument: double yy0
  if (typeof yy0 !== 'number') {
    throw new TypeError('yy0 must be a number');
  }
  const carg_yy0 = yy0;

  // return: double
  const fn_ret = cephes._cephes_incbi(carg_aa, carg_bb, carg_yy0);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/igam.c
exports.igam = function igam(/* double */ a, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_igam(carg_a, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/igam.c
exports.igamc = function igamc(/* double */ a, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_igamc(carg_a, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/igami.c
exports.igami = function igami(/* double */ a, /* double */ y0) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double y0
  if (typeof y0 !== 'number') {
    throw new TypeError('y0 must be a number');
  }
  const carg_y0 = y0;

  // return: double
  const fn_ret = cephes._cephes_igami(carg_a, carg_y0);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/psi.c
exports.psi = function psi(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_psi(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/rgamma.c
exports.rgamma = function rgamma(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_rgamma(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ndtr.c
exports.erf = function erf(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_erf(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ndtr.c
exports.erfc = function erfc(/* double */ a) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // return: double
  const fn_ret = cephes._cephes_erfc(carg_a);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/dawsn.c
exports.dawsn = function dawsn(/* double */ xx) {
  // argument: double xx
  if (typeof xx !== 'number') {
    throw new TypeError('xx must be a number');
  }
  const carg_xx = xx;

  // return: double
  const fn_ret = cephes._cephes_dawsn(carg_xx);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/fresnl.c
exports.fresnl = function fresnl(/* double */ xxa) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double xxa
  if (typeof xxa !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('xxa must be a number');
  }
  const carg_xxa = xxa;

  // argument: double* ssa
  const carg_ssa = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* cca
  const carg_cca = cephes.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes._cephes_fresnl(carg_xxa, carg_ssa, carg_cca) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'ssa': cephes.getValue(carg_ssa, 'double'),
    'cca': cephes.getValue(carg_cca, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/airy.c
exports.airy = function airy(/* double */ x) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double* ai
  const carg_ai = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* aip
  const carg_aip = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* bi
  const carg_bi = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* bip
  const carg_bip = cephes.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes._cephes_airy(carg_x, carg_ai, carg_aip, carg_bi, carg_bip) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'ai': cephes.getValue(carg_ai, 'double'),
    'aip': cephes.getValue(carg_aip, 'double'),
    'bi': cephes.getValue(carg_bi, 'double'),
    'bip': cephes.getValue(carg_bip, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/j0.c
exports.j0 = function j0(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_j0(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/j1.c
exports.j1 = function j1(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_j1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/jn.c
exports.jn = function jn(/* int */ n, /* double */ x) {
  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_jn(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/jv.c
exports.jv = function jv(/* double */ n, /* double */ x) {
  // argument: double n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_jv(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/j0.c
exports.y0 = function y0(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_y0(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/j1.c
exports.y1 = function y1(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_y1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/yn.c
exports.yn = function yn(/* int */ n, /* double */ x) {
  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_yn(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/struve.c
exports.yv = function yv(/* double */ v, /* double */ x) {
  // argument: double v
  if (typeof v !== 'number') {
    throw new TypeError('v must be a number');
  }
  const carg_v = v;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_yv(carg_v, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/i0.c
exports.i0 = function i0(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_i0(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/i0.c
exports.i0e = function i0e(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_i0e(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/i1.c
exports.i1 = function i1(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_i1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/i1.c
exports.i1e = function i1e(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_i1e(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/iv.c
exports.iv = function iv(/* double */ v, /* double */ x) {
  // argument: double v
  if (typeof v !== 'number') {
    throw new TypeError('v must be a number');
  }
  const carg_v = v;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_iv(carg_v, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/k0.c
exports.k0 = function k0(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_k0(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/k0.c
exports.k0e = function k0e(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_k0e(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/k1.c
exports.k1 = function k1(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_k1(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/k1.c
exports.k1e = function k1e(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_k1e(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/kn.c
exports.kn = function kn(/* int */ nn, /* double */ x) {
  // argument: int nn
  if (typeof nn !== 'number') {
    throw new TypeError('nn must be a number');
  }
  const carg_nn = nn | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_kn(carg_nn, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/hyperg.c
exports.hyperg = function hyperg(/* double */ a, /* double */ b, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_hyperg(carg_a, carg_b, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/hyp2f1.c
exports.hyp2f1 = function hyp2f1(/* double */ a, /* double */ b, /* double */ c, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // argument: double c
  if (typeof c !== 'number') {
    throw new TypeError('c must be a number');
  }
  const carg_c = c;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_hyp2f1(carg_a, carg_b, carg_c, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ellpe.c
exports.ellpe = function ellpe(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_ellpe(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ellie.c
exports.ellie = function ellie(/* double */ phi, /* double */ m) {
  // argument: double phi
  if (typeof phi !== 'number') {
    throw new TypeError('phi must be a number');
  }
  const carg_phi = phi;

  // argument: double m
  if (typeof m !== 'number') {
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // return: double
  const fn_ret = cephes._cephes_ellie(carg_phi, carg_m);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ellpk.c
exports.ellpk = function ellpk(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_ellpk(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ellik.c
exports.ellik = function ellik(/* double */ phi, /* double */ m) {
  // argument: double phi
  if (typeof phi !== 'number') {
    throw new TypeError('phi must be a number');
  }
  const carg_phi = phi;

  // argument: double m
  if (typeof m !== 'number') {
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // return: double
  const fn_ret = cephes._cephes_ellik(carg_phi, carg_m);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ellpj.c
exports.ellpj = function ellpj(/* double */ u, /* double */ m) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double u
  if (typeof u !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('u must be a number');
  }
  const carg_u = u;

  // argument: double m
  if (typeof m !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // argument: double* sn
  const carg_sn = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* cn
  const carg_cn = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* dn
  const carg_dn = cephes.stackAlloc(8); // No need to zero-set it.

  // argument: double* ph
  const carg_ph = cephes.stackAlloc(8); // No need to zero-set it.

  // return: int
  const fn_ret = cephes._cephes_ellpj(carg_u, carg_m, carg_sn, carg_cn, carg_dn, carg_ph) | 0;

  // There are pointers, so return the values of thoese too
  const ret = [fn_ret, {
    'sn': cephes.getValue(carg_sn, 'double'),
    'cn': cephes.getValue(carg_cn, 'double'),
    'dn': cephes.getValue(carg_dn, 'double'),
    'ph': cephes.getValue(carg_ph, 'double'),
  }];

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/btdtr.c
exports.btdtr = function btdtr(/* double */ a, /* double */ b, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_btdtr(carg_a, carg_b, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/kolmogorov.c
exports.smirnov = function smirnov(/* int */ n, /* double */ e) {
  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double e
  if (typeof e !== 'number') {
    throw new TypeError('e must be a number');
  }
  const carg_e = e;

  // return: double
  const fn_ret = cephes._cephes_smirnov(carg_n, carg_e);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/kolmogorov.c
exports.kolmogorov = function kolmogorov(/* double */ y) {
  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes._cephes_kolmogorov(carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/kolmogorov.c
exports.smirnovi = function smirnovi(/* int */ n, /* double */ p) {
  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes._cephes_smirnovi(carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/kolmogorov.c
exports.kolmogi = function kolmogi(/* double */ p) {
  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes._cephes_kolmogi(carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/nbdtr.c
exports.nbdtri = function nbdtri(/* int */ k, /* int */ n, /* double */ p) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes._cephes_nbdtri(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/stdtr.c
exports.stdtri = function stdtri(/* int */ k, /* double */ p) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes._cephes_stdtri(carg_k, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/bdtr.c
exports.bdtr = function bdtr(/* int */ k, /* int */ n, /* double */ p) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes._cephes_bdtr(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/bdtr.c
exports.bdtrc = function bdtrc(/* int */ k, /* int */ n, /* double */ p) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes._cephes_bdtrc(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/bdtr.c
exports.bdtri = function bdtri(/* int */ k, /* int */ n, /* double */ y) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes._cephes_bdtri(carg_k, carg_n, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/chdtr.c
exports.chdtr = function chdtr(/* double */ df, /* double */ x) {
  // argument: double df
  if (typeof df !== 'number') {
    throw new TypeError('df must be a number');
  }
  const carg_df = df;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_chdtr(carg_df, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/chdtr.c
exports.chdtrc = function chdtrc(/* double */ df, /* double */ x) {
  // argument: double df
  if (typeof df !== 'number') {
    throw new TypeError('df must be a number');
  }
  const carg_df = df;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_chdtrc(carg_df, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/chdtr.c
exports.chdtri = function chdtri(/* double */ df, /* double */ y) {
  // argument: double df
  if (typeof df !== 'number') {
    throw new TypeError('df must be a number');
  }
  const carg_df = df;

  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes._cephes_chdtri(carg_df, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/fdtr.c
exports.fdtr = function fdtr(/* int */ ia, /* int */ ib, /* double */ x) {
  // argument: int ia
  if (typeof ia !== 'number') {
    throw new TypeError('ia must be a number');
  }
  const carg_ia = ia | 0;

  // argument: int ib
  if (typeof ib !== 'number') {
    throw new TypeError('ib must be a number');
  }
  const carg_ib = ib | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_fdtr(carg_ia, carg_ib, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/fdtr.c
exports.fdtrc = function fdtrc(/* int */ ia, /* int */ ib, /* double */ x) {
  // argument: int ia
  if (typeof ia !== 'number') {
    throw new TypeError('ia must be a number');
  }
  const carg_ia = ia | 0;

  // argument: int ib
  if (typeof ib !== 'number') {
    throw new TypeError('ib must be a number');
  }
  const carg_ib = ib | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_fdtrc(carg_ia, carg_ib, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/fdtr.c
exports.fdtri = function fdtri(/* int */ ia, /* int */ ib, /* double */ y) {
  // argument: int ia
  if (typeof ia !== 'number') {
    throw new TypeError('ia must be a number');
  }
  const carg_ia = ia | 0;

  // argument: int ib
  if (typeof ib !== 'number') {
    throw new TypeError('ib must be a number');
  }
  const carg_ib = ib | 0;

  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes._cephes_fdtri(carg_ia, carg_ib, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/gdtr.c
exports.gdtr = function gdtr(/* double */ a, /* double */ b, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_gdtr(carg_a, carg_b, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/gdtr.c
exports.gdtrc = function gdtrc(/* double */ a, /* double */ b, /* double */ x) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // argument: double b
  if (typeof b !== 'number') {
    throw new TypeError('b must be a number');
  }
  const carg_b = b;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_gdtrc(carg_a, carg_b, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/nbdtr.c
exports.nbdtr = function nbdtr(/* int */ k, /* int */ n, /* double */ p) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes._cephes_nbdtr(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/nbdtr.c
exports.nbdtrc = function nbdtrc(/* int */ k, /* int */ n, /* double */ p) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double p
  if (typeof p !== 'number') {
    throw new TypeError('p must be a number');
  }
  const carg_p = p;

  // return: double
  const fn_ret = cephes._cephes_nbdtrc(carg_k, carg_n, carg_p);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ndtr.c
exports.ndtr = function ndtr(/* double */ a) {
  // argument: double a
  if (typeof a !== 'number') {
    throw new TypeError('a must be a number');
  }
  const carg_a = a;

  // return: double
  const fn_ret = cephes._cephes_ndtr(carg_a);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/ndtri.c
exports.ndtri = function ndtri(/* double */ y0) {
  // argument: double y0
  if (typeof y0 !== 'number') {
    throw new TypeError('y0 must be a number');
  }
  const carg_y0 = y0;

  // return: double
  const fn_ret = cephes._cephes_ndtri(carg_y0);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/pdtr.c
exports.pdtr = function pdtr(/* int */ k, /* double */ m) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: double m
  if (typeof m !== 'number') {
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // return: double
  const fn_ret = cephes._cephes_pdtr(carg_k, carg_m);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/pdtr.c
exports.pdtrc = function pdtrc(/* int */ k, /* double */ m) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: double m
  if (typeof m !== 'number') {
    throw new TypeError('m must be a number');
  }
  const carg_m = m;

  // return: double
  const fn_ret = cephes._cephes_pdtrc(carg_k, carg_m);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/pdtr.c
exports.pdtri = function pdtri(/* int */ k, /* double */ y) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: double y
  if (typeof y !== 'number') {
    throw new TypeError('y must be a number');
  }
  const carg_y = y;

  // return: double
  const fn_ret = cephes._cephes_pdtri(carg_k, carg_y);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/stdtr.c
exports.stdtr = function stdtr(/* int */ k, /* double */ t) {
  // argument: int k
  if (typeof k !== 'number') {
    throw new TypeError('k must be a number');
  }
  const carg_k = k | 0;

  // argument: double t
  if (typeof t !== 'number') {
    throw new TypeError('t must be a number');
  }
  const carg_t = t;

  // return: double
  const fn_ret = cephes._cephes_stdtr(carg_k, carg_t);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/planck.c
exports.plancki = function plancki(/* double */ w, /* double */ T) {
  // argument: double w
  if (typeof w !== 'number') {
    throw new TypeError('w must be a number');
  }
  const carg_w = w;

  // argument: double T
  if (typeof T !== 'number') {
    throw new TypeError('T must be a number');
  }
  const carg_T = T;

  // return: double
  const fn_ret = cephes._cephes_plancki(carg_w, carg_T);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/planck.c
exports.planckc = function planckc(/* double */ w, /* double */ T) {
  // argument: double w
  if (typeof w !== 'number') {
    throw new TypeError('w must be a number');
  }
  const carg_w = w;

  // argument: double T
  if (typeof T !== 'number') {
    throw new TypeError('T must be a number');
  }
  const carg_T = T;

  // return: double
  const fn_ret = cephes._cephes_planckc(carg_w, carg_T);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/planck.c
exports.planckd = function planckd(/* double */ w, /* double */ T) {
  // argument: double w
  if (typeof w !== 'number') {
    throw new TypeError('w must be a number');
  }
  const carg_w = w;

  // argument: double T
  if (typeof T !== 'number') {
    throw new TypeError('T must be a number');
  }
  const carg_T = T;

  // return: double
  const fn_ret = cephes._cephes_planckd(carg_w, carg_T);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/planck.c
exports.planckw = function planckw(/* double */ T) {
  // argument: double T
  if (typeof T !== 'number') {
    throw new TypeError('T must be a number');
  }
  const carg_T = T;

  // return: double
  const fn_ret = cephes._cephes_planckw(carg_T);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/spence.c
exports.spence = function spence(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_spence(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/zetac.c
exports.zetac = function zetac(/* double */ x) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_zetac(carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/zeta.c
exports.zeta = function zeta(/* double */ x, /* double */ q) {
  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double q
  if (typeof q !== 'number') {
    throw new TypeError('q must be a number');
  }
  const carg_q = q;

  // return: double
  const fn_ret = cephes._cephes_zeta(carg_x, carg_q);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/struve.c
exports.struve = function struve(/* double */ v, /* double */ x) {
  // argument: double v
  if (typeof v !== 'number') {
    throw new TypeError('v must be a number');
  }
  const carg_v = v;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_struve(carg_v, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};

// from cephes/polevl.c
exports.p1evl = function p1evl(/* double */ x, /* double[] */ coef, /* int */ N) {
  //Save the STACKTOP because the following code will do some stack allocs
  const stacktop = cephes.stackSave();

  // argument: double x
  if (typeof x !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // argument: double[] coef
  if (!(coef instanceof Float64Array)) {
    cephes.stackRestore(stacktop);
    throw new TypeError('coef must be either a Float64Array');
  }
  const carg_coef = cephes.stackAlloc(coef.length << 3);
  cephes.writeArrayToMemory(new Uint8Array(coef.buffer, coef.byteOffset, coef.byteLength), carg_coef);

  // argument: int N
  if (typeof N !== 'number') {
    cephes.stackRestore(stacktop);
    throw new TypeError('N must be a number');
  }
  const carg_N = N | 0;

  // return: double
  const fn_ret = cephes._cephes_p1evl(carg_x, carg_coef, carg_N);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  // Restore internal stacktop before returning
  cephes.stackRestore(stacktop);
  return ret;
};

// from cephes/polylog.c
exports.polylog = function polylog(/* int */ n, /* double */ x) {
  // argument: int n
  if (typeof n !== 'number') {
    throw new TypeError('n must be a number');
  }
  const carg_n = n | 0;

  // argument: double x
  if (typeof x !== 'number') {
    throw new TypeError('x must be a number');
  }
  const carg_x = x;

  // return: double
  const fn_ret = cephes._cephes_polylog(carg_n, carg_x);

  // No pointers, so just return fn_ret
  const ret = fn_ret;

  return ret;
};


},{"./cephes.js":"../node_modules/cephes/cephes-browser.js"}],"../node_modules/distributions/distributions/normal.js":[function(require,module,exports) {

var cephes = require('cephes');

function NormalDistribution(mean, sd) {
  if (!(this instanceof NormalDistribution)) {
    return new NormalDistribution(mean, sd);
  }

  if (typeof mean !== 'number' && mean !== undefined) {
    throw TypeError('mean must be a number');
  }
  if (typeof sd !== 'number' && sd !== undefined) {
    throw TypeError('sd must be a number');
  }

  if (sd !== undefined && sd <= 0.0) {
    throw TypeError('sd must be positive');
  }

  this._mean = mean || 0;
  this._sd = sd || 1;
  this._var = this._sd * this._sd;
}
module.exports = NormalDistribution;

// -0.5 * log(2 Pi)
var HALF_TWO_PI_LOG = -0.91893853320467274180;

NormalDistribution.prototype.pdf = function (x) {
  return Math.exp(HALF_TWO_PI_LOG - Math.log(this._sd) - Math.pow(x - this._mean, 2) / (2 * this._var));
};

NormalDistribution.prototype.cdf = function (x) {
  return cephes.ndtr((x - this._mean) / this._sd);
};

NormalDistribution.prototype.inv = function (p) {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  return this._sd * cephes.ndtri(p) + this._mean;
};

NormalDistribution.prototype.median = function () {
  return this._mean;
};

NormalDistribution.prototype.mean = function () {
  return this._mean;
};

NormalDistribution.prototype.variance = function () {
  return this._var;
};

},{"cephes":"../node_modules/cephes/index.js"}],"../node_modules/distributions/distributions/studentt.js":[function(require,module,exports) {

var cephes = require('cephes');

function StudenttDistribution(df) {
  if (!(this instanceof StudenttDistribution)) {
    return new StudenttDistribution(df);
  }

  if (typeof df !== 'number') {
    throw TypeError('mean must be a number');
  }
  if (df <= 0) {
    throw RangeError('df must be a positive number');
  }

  this._df = df;

  this._pdf_const = Math.exp(cephes.lgam((df + 1) / 2) - cephes.lgam(df / 2)) / Math.sqrt(this._df * Math.PI);
}
module.exports = StudenttDistribution;

StudenttDistribution.prototype.pdf = function (x) {
  return this._pdf_const / Math.pow(1 + ((x*x) / this._df), (this._df + 1) / 2);
};

// Uses the idendenity specified in Abramowitz and Stegun 26.7.1 and
// Abramowitz and Stegun 26.5.27.
// F(x|df) = 1 - 0.5 * I_z (df/2, 1/2)
//       z = df / (df + x^2)
//     for   x > 0
// Since the Student-t distribution is symetric:
// F(x|df) = 0.5 * I_z (df/2, 1/2)
//     for   x < 0
StudenttDistribution.prototype.cdf = function (x) {
  const z = this._df / (this._df + x * x);
  const p = 0.5 * cephes.incbet(0.5 * this._df, 0.5, z);
  return (x <= 0) ? p : 1 - p;
};

StudenttDistribution.prototype.inv = function (p) {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  if (p === 0.5) return 0;

  if (p > 0.25 && p < 0.75) {
    const phat = 1 - 2 * p;
    const z = cephes.incbi(0.5, 0.5 * this._df, Math.abs(phat));
    const t = Math.sqrt(this._df * z / (1 - z));
    return (p < 0.5) ? -t : t;
  } else {
    const phat = (p >= 0.5) ? 1 - p : p;
    const z = cephes.incbi(0.5 * this._df, 0.5, 2 * phat);
    const t = Math.sqrt(this._df / z - this._df);
    return (p < 0.5) ? -t : t;
  }
};

StudenttDistribution.prototype.median = function () {
  return 0;
};

StudenttDistribution.prototype.mean = function () {
  return (this._df > 1) ? 0 : undefined;
};

StudenttDistribution.prototype.variance = function () {
  if (this._df > 2) return this._df / (this._df - 2);
  else if (this._df > 1) return Infinity;
  else return undefined;
};

},{"cephes":"../node_modules/cephes/index.js"}],"../node_modules/distributions/distributions/uniform.js":[function(require,module,exports) {

function UniformDistribution(a, b) {
  if (!(this instanceof UniformDistribution)) {
    return new UniformDistribution(a, b);
  }

  if (typeof a !== 'number' && a !== undefined) {
    throw TypeError('mean must be a number');
  }
  if (typeof b !== 'number' && b !== undefined) {
    throw TypeError('sd must be a number');
  }

  this._a = typeof a === 'number' ? a : 0;
  this._b = typeof b === 'number' ? b : 1;

  if (this._b <= this._a) {
    throw new RangeError('a must be greater than b');
  }

  this._k = 1 / (this._b - this._a);
  this._mean = (this._a + this._b) / 2;
  this._var = (this._a - this._b) * (this._a - this._b) / 12;
}
module.exports = UniformDistribution;

UniformDistribution.prototype.pdf = function (x) {
  return (x < this._a || x > this._b) ? 0 : this._k;
};

UniformDistribution.prototype.cdf = function (x) {
  if (x < this._a) return 0;
  else if (x > this._b) return 1;
  else return (x - this._a) * this._k;
};

UniformDistribution.prototype.inv = function (p) {
  if (p < 0 || p > 1) return NaN;
  else return p * (this._b - this._a) + this._a;
};

UniformDistribution.prototype.median = function () {
  return this._mean;
};

UniformDistribution.prototype.mean = function () {
  return this._mean;
};

UniformDistribution.prototype.variance = function () {
  return this._var;
};

},{}],"../node_modules/distributions/distributions/binomial.js":[function(require,module,exports) {

var cephes = require('cephes');

function BinomialDistribution(properbility, size) {
  if (!(this instanceof BinomialDistribution)) {
    return new BinomialDistribution(properbility, size);
  }

  if (typeof properbility !== 'number') {
    throw TypeError('properbility must be a number');
  }
  if (typeof size !== 'number') {
    throw TypeError('size must be a number');
  }

  if (size <= 0.0) {
    throw TypeError('size must be positive');
  }
  if (properbility < 0.0 || properbility > 1) {
    throw TypeError('properbility must be between 0 and 1');
  }

  this._properbility = properbility;
  this._size = size;
}
module.exports = BinomialDistribution;

BinomialDistribution.prototype.pdf = function (x) {
  var n = this._size;
  var p = this._properbility;

  // choose(n, x)
  var binomialCoefficent = cephes.gamma(n + 1) / (
    cephes.gamma(x + 1) * cephes.gamma(n - x + 1)
  )

  return binomialCoefficent * Math.pow(p, x) * Math.pow(1 - p, n - x);
};

BinomialDistribution.prototype.cdf = function (x) {
  return cephes.bdtr(x, this._size, this._properbility);
};

BinomialDistribution.prototype.inv = function (p) {
  throw new Error('Inverse CDF of binomial distribution is not implemented');
};

BinomialDistribution.prototype.median = function () {
  return Math.round(this._properbility * this._size);
};

BinomialDistribution.prototype.mean = function () {
  return this._properbility * this._size;
};

BinomialDistribution.prototype.variance = function () {
  return this._properbility * this._size * (1 - this._properbility);
};

},{"cephes":"../node_modules/cephes/index.js"}],"../node_modules/distributions/distributions.js":[function(require,module,exports) {

exports.Normal = require('./distributions/normal.js');
exports.Studentt = require('./distributions/studentt.js');
exports.Uniform = require('./distributions/uniform.js');
exports.Binomial = require('./distributions/binomial.js');

},{"./distributions/normal.js":"../node_modules/distributions/distributions/normal.js","./distributions/studentt.js":"../node_modules/distributions/distributions/studentt.js","./distributions/uniform.js":"../node_modules/distributions/distributions/uniform.js","./distributions/binomial.js":"../node_modules/distributions/distributions/binomial.js"}],"../node_modules/loglevel/lib/loglevel.js":[function(require,module,exports) {
var define;
/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
  "use strict";

  if (typeof define === 'function' && define.amd) {
    define(definition);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = definition();
  } else {
    root.log = definition();
  }
})(this, function () {
  "use strict"; // Slightly dubious tricks to cut down minimized file size

  var noop = function () {};

  var undefinedType = "undefined";
  var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
  var logMethods = ["trace", "debug", "info", "warn", "error"]; // Cross-browser bind equivalent that works at least back to IE6

  function bindMethod(obj, methodName) {
    var method = obj[methodName];

    if (typeof method.bind === 'function') {
      return method.bind(obj);
    } else {
      try {
        return Function.prototype.bind.call(method, obj);
      } catch (e) {
        // Missing bind shim or IE8 + Modernizr, fallback to wrapping
        return function () {
          return Function.prototype.apply.apply(method, [obj, arguments]);
        };
      }
    }
  } // Trace() doesn't print the message in IE, so for that case we need to wrap it


  function traceForIE() {
    if (console.log) {
      if (console.log.apply) {
        console.log.apply(console, arguments);
      } else {
        // In old IE, native console methods themselves don't have apply().
        Function.prototype.apply.apply(console.log, [console, arguments]);
      }
    }

    if (console.trace) console.trace();
  } // Build the best logging method possible for this env
  // Wherever possible we want to bind, not wrap, to preserve stack traces


  function realMethod(methodName) {
    if (methodName === 'debug') {
      methodName = 'log';
    }

    if (typeof console === undefinedType) {
      return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
    } else if (methodName === 'trace' && isIE) {
      return traceForIE;
    } else if (console[methodName] !== undefined) {
      return bindMethod(console, methodName);
    } else if (console.log !== undefined) {
      return bindMethod(console, 'log');
    } else {
      return noop;
    }
  } // These private functions always need `this` to be set properly


  function replaceLoggingMethods(level, loggerName) {
    /*jshint validthis:true */
    for (var i = 0; i < logMethods.length; i++) {
      var methodName = logMethods[i];
      this[methodName] = i < level ? noop : this.methodFactory(methodName, level, loggerName);
    } // Define log.log as an alias for log.debug


    this.log = this.debug;
  } // In old IE versions, the console isn't present until you first open it.
  // We build realMethod() replacements here that regenerate logging methods


  function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
    return function () {
      if (typeof console !== undefinedType) {
        replaceLoggingMethods.call(this, level, loggerName);
        this[methodName].apply(this, arguments);
      }
    };
  } // By default, we use closely bound real methods wherever possible, and
  // otherwise we wait for a console to appear, and then try again.


  function defaultMethodFactory(methodName, level, loggerName) {
    /*jshint validthis:true */
    return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
  }

  function Logger(name, defaultLevel, factory) {
    var self = this;
    var currentLevel;
    var storageKey = "loglevel";

    if (name) {
      storageKey += ":" + name;
    }

    function persistLevelIfPossible(levelNum) {
      var levelName = (logMethods[levelNum] || 'silent').toUpperCase();
      if (typeof window === undefinedType) return; // Use localStorage if available

      try {
        window.localStorage[storageKey] = levelName;
        return;
      } catch (ignore) {} // Use session cookie as fallback


      try {
        window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
      } catch (ignore) {}
    }

    function getPersistedLevel() {
      var storedLevel;
      if (typeof window === undefinedType) return;

      try {
        storedLevel = window.localStorage[storageKey];
      } catch (ignore) {} // Fallback to cookies if local storage gives us nothing


      if (typeof storedLevel === undefinedType) {
        try {
          var cookie = window.document.cookie;
          var location = cookie.indexOf(encodeURIComponent(storageKey) + "=");

          if (location !== -1) {
            storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
          }
        } catch (ignore) {}
      } // If the stored level is not valid, treat it as if nothing was stored.


      if (self.levels[storedLevel] === undefined) {
        storedLevel = undefined;
      }

      return storedLevel;
    }
    /*
     *
     * Public logger API - see https://github.com/pimterry/loglevel for details
     *
     */


    self.name = name;
    self.levels = {
      "TRACE": 0,
      "DEBUG": 1,
      "INFO": 2,
      "WARN": 3,
      "ERROR": 4,
      "SILENT": 5
    };
    self.methodFactory = factory || defaultMethodFactory;

    self.getLevel = function () {
      return currentLevel;
    };

    self.setLevel = function (level, persist) {
      if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
        level = self.levels[level.toUpperCase()];
      }

      if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
        currentLevel = level;

        if (persist !== false) {
          // defaults to true
          persistLevelIfPossible(level);
        }

        replaceLoggingMethods.call(self, level, name);

        if (typeof console === undefinedType && level < self.levels.SILENT) {
          return "No console available for logging";
        }
      } else {
        throw "log.setLevel() called with invalid level: " + level;
      }
    };

    self.setDefaultLevel = function (level) {
      if (!getPersistedLevel()) {
        self.setLevel(level, false);
      }
    };

    self.enableAll = function (persist) {
      self.setLevel(self.levels.TRACE, persist);
    };

    self.disableAll = function (persist) {
      self.setLevel(self.levels.SILENT, persist);
    }; // Initialize with the right level


    var initialLevel = getPersistedLevel();

    if (initialLevel == null) {
      initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
    }

    self.setLevel(initialLevel, false);
  }
  /*
   *
   * Top-level API
   *
   */


  var defaultLogger = new Logger();
  var _loggersByName = {};

  defaultLogger.getLogger = function getLogger(name) {
    if (typeof name !== "string" || name === "") {
      throw new TypeError("You must supply a name when creating a logger.");
    }

    var logger = _loggersByName[name];

    if (!logger) {
      logger = _loggersByName[name] = new Logger(name, defaultLogger.getLevel(), defaultLogger.methodFactory);
    }

    return logger;
  }; // Grab the current global log variable in case of overwrite


  var _log = typeof window !== undefinedType ? window.log : undefined;

  defaultLogger.noConflict = function () {
    if (typeof window !== undefinedType && window.log === defaultLogger) {
      window.log = _log;
    }

    return defaultLogger;
  };

  defaultLogger.getLoggers = function getLoggers() {
    return _loggersByName;
  };

  return defaultLogger;
});
},{}],"../node_modules/weighted/lib/weighted.js":[function(require,module,exports) {
function getTotal(weights) {
  var total = weights.__weighted_total

  if (total != null) {
    return total
  }

  function wrap(arr, fn) {
    return function () {
      arr.__weighted_total = null
      fn.apply(arr, arguments)
    }
  }

  if (total === undefined) {
    ;['pop', 'push', 'shift', 'unshift', 'splice'].forEach(function (key) {
      weights[key] = wrap(weights, weights[key])
    })
  }

  total = weights.__weighted_total = weights.reduce(function (prev, curr) {
    return prev + curr
  }, 0)

  return total
}

function _selectArr(set, weights, options) {
  if (typeof options.rand !== 'function') {
    options.rand = Math.random
  }

  if (set.length !== weights.length) {
    throw new TypeError('Different number of options & weights.')
  }

  var total = options.total || (options.normal ? 1 : getTotal(weights))
    , key = options.rand() * total
    , index = 0

  for (;index < weights.length; index++) {
    key -= weights[index]

    if (key < 0) {
      return set[index]
    }
  }

  throw new RangeError('All weights do not add up to >= 1 as expected.')
}

function _selectObj(obj, options) {
  var keys = Object.keys(obj)
    , values = keys.map(function (key) {
        return obj[key]
      })

  return _selectArr(keys, values, options)
}

function select(set, weights, options) {
  if (typeof options === 'function') {
    options = {
      rand: options
    }
  }

  if (options == null) {
    options = {}
  }

  if (Array.isArray(set)) {
    if (weights == null) {
      weights = set.map(function () {
        return 1
      })
    }

    if (Array.isArray(weights)) {
      if (set.length === weights.length) {
        return _selectArr(set, weights, options)
      }

      throw new TypeError('Set and Weights are different sizes.')
    }

    throw new TypeError('Set is an Array, and Weights is not.')
  }

  if (typeof set === 'object') {
    return _selectObj(set, weights || options)
  }

  throw new TypeError('Set is not an Object, nor is it an Array.')
}

module.exports = select
module.exports.select = select

},{}],"../node_modules/weighted/index.js":[function(require,module,exports) {
module.exports = require('./lib/weighted')

},{"./lib/weighted":"../node_modules/weighted/lib/weighted.js"}],"simulation/index.js":[function(require,module,exports) {
"use strict";

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _worker = require("threads/worker");

var _lodash = require("lodash");

var _distributions = _interopRequireDefault(require("distributions"));

var _loglevel = _interopRequireDefault(require("loglevel"));

var _weighted = _interopRequireDefault(require("weighted"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Module dependencies.
 */

/**
 * Population.
 */
var studyPopulation;
/**
 * Simulation parameters.
 */

var simulationParameters;
/**
 * Simulation state variables.
 */

var initialSimulationState = {
  day: 0,
  parametersChanges: []
};
var simulationState;
var simulationStats;
/**
 * Health state constants.
 */

var healthState = {
  DEAD: 'DEAD',
  HEALTHY: 'HEALTHY',
  INFECTED: 'INFECTED',
  RECOVERED: 'RECOVERED'
};
/**
 * Infection state constants.
 */

var infectionState = {
  UNDETECTED: 'UNDETECTED',
  DIAGNOSED: 'DIAGNOSED'
};
/**
 * Up sample size.
 */

function upsampleSize(poolSize) {
  var _simulationParameters = simulationParameters,
      subSamplingFactor = _simulationParameters.subSamplingFactor;
  return poolSize * subSamplingFactor;
}
/**
 * Sample size rounded.
 */


function upsampleSizeRounded(poolSize) {
  return Math.round(upsampleSize(poolSize));
}
/**
 * Create fates.
 */


function createFates(people, excludeDiagnosed) {
  var _simulationParameters2 = simulationParameters,
      trueDeathRate = _simulationParameters2.trueDeathRate,
      underReportingFactor = _simulationParameters2.underReportingFactor;
  var infected = people.filter(function (person) {
    return person.healthState === healthState.INFECTED;
  });
  infected.forEach(function (infectedPerson) {
    infectedPerson.willDie = Math.random() <= trueDeathRate * 0.01;

    if (!excludeDiagnosed) {
      infectedPerson.willBeDiagnosed = Math.random() <= 1 / underReportingFactor;
    }
  });
}
/**
 * Calculate stats.
 */


function calculateStats() {
  var diagnosed = studyPopulation.filter(function (person) {
    return person.infectionState === infectionState.DIAGNOSED;
  });
  var infected = studyPopulation.filter(function (person) {
    return person.healthState === healthState.INFECTED;
  });
  return {
    day: simulationState.day,
    reportedInfected: diagnosed.filter(function (person) {
      return person.healthState === healthState.INFECTED;
    }).length,
    reportedRecovered: diagnosed.filter(function (person) {
      return person.healthState === healthState.RECOVERED;
    }).length,
    reportedTotalInfected: studyPopulation.filter(function (person) {
      return person.infectionState === infectionState.DIAGNOSED && person.healthState !== healthState.HEALTHY || person.healthState === healthState.DEAD;
    }).length,
    dead: studyPopulation.filter(function (person) {
      return person.healthState === healthState.DEAD;
    }).length,
    infected: infected.length,
    newReportedInfected: diagnosed.filter(function (person) {
      return person.diagnosedDay === simulationState.day;
    }).length,
    newInfected: infected.filter(function (person) {
      return person.infectedDay === simulationState.day;
    }).length,
    recovered: studyPopulation.filter(function (person) {
      return person.healthState === healthState.RECOVERED;
    }).length,
    totalInfected: studyPopulation.filter(function (person) {
      return person.healthState !== healthState.HEALTHY;
    }).length,
    totalPopulation: studyPopulation.length
  };
}
/**
 * Virtualize real stats.
 */


function virtualizeRawStats(stats) {
  var _simulationParameters3 = simulationParameters,
      daysSinceFirstDiagnostic = _simulationParameters3.daysSinceFirstDiagnostic,
      subSamplingFactor = _simulationParameters3.subSamplingFactor;
  return stats.map(function (dayStat) {
    var day = dayStat.day,
        dead = dayStat.dead,
        infected = dayStat.infected,
        newInfected = dayStat.newInfected,
        newReportedInfected = dayStat.newReportedInfected,
        recovered = dayStat.recovered,
        reportedInfected = dayStat.reportedInfected,
        reportedRecovered = dayStat.reportedRecovered,
        reportedTotalInfected = dayStat.reportedTotalInfected,
        totalInfected = dayStat.totalInfected,
        totalPopulation = dayStat.totalPopulation;
    return {
      day: daysSinceFirstDiagnostic + day,
      reportedInfected: reportedInfected / subSamplingFactor,
      reportedRecovered: reportedRecovered / subSamplingFactor,
      reportedTotalInfected: reportedTotalInfected / subSamplingFactor,
      newInfected: newInfected / subSamplingFactor,
      newReportedInfected: newReportedInfected / subSamplingFactor,
      dead: dead / subSamplingFactor,
      infected: infected / subSamplingFactor,
      recovered: recovered / subSamplingFactor,
      totalInfected: totalInfected / subSamplingFactor,
      totalPopulation: totalPopulation / subSamplingFactor
    };
  });
}
/**
 * Initialize.
 */


function initialize() {
  var _simulationParameters4 = simulationParameters,
      averageRecoveringDays = _simulationParameters4.averageRecoveringDays,
      initialDead = _simulationParameters4.initialDead,
      initialReportedInfected = _simulationParameters4.initialReportedInfected,
      initialReportedRecovered = _simulationParameters4.initialReportedRecovered,
      population = _simulationParameters4.population,
      underReportingFactor = _simulationParameters4.underReportingFactor;
  studyPopulation = [];
  simulationState = (0, _objectSpread.default)({}, initialSimulationState);

  var daysBackDiagnosticDistribution = _distributions.default.Normal(averageRecoveringDays, averageRecoveringDays / 5);

  var daysList = (0, _lodash.range)(100);
  var daysBackDistributionWeights = daysList.map(function (day) {
    return 1 - daysBackDiagnosticDistribution.cdf(day);
  });

  for (var i = 0; i < upsampleSizeRounded(population); i++) {
    studyPopulation.push({
      healthState: healthState.HEALTHY,
      infectionState: null
    });
  }

  for (var _i = 0; _i < upsampleSizeRounded(initialReportedInfected); _i++) {
    studyPopulation[_i].healthState = healthState.INFECTED;
    studyPopulation[_i].infectionState = infectionState.DIAGNOSED;
    studyPopulation[_i].willBeDiagnosed = true;
    studyPopulation[_i].infectedDay = -_weighted.default.select(daysList, daysBackDistributionWeights);
  }

  var lastIndex = upsampleSizeRounded(initialReportedInfected);
  var totalNonDiagnosedInfected = initialReportedInfected * (underReportingFactor - 1);

  for (var _i2 = lastIndex; _i2 < lastIndex + upsampleSizeRounded(totalNonDiagnosedInfected); _i2++) {
    studyPopulation[_i2].healthState = healthState.INFECTED;
    studyPopulation[_i2].infectionState = infectionState.UNDETECTED;
    studyPopulation[_i2].infectedDay = -_weighted.default.select(daysList, daysBackDistributionWeights);
  }

  lastIndex += upsampleSizeRounded(totalNonDiagnosedInfected);

  for (var _i3 = lastIndex; _i3 < lastIndex + upsampleSizeRounded(initialReportedRecovered); _i3++) {
    studyPopulation[_i3].healthState = healthState.RECOVERED;
    studyPopulation[_i3].infectionState = infectionState.DIAGNOSED;
  }

  lastIndex += upsampleSizeRounded(initialReportedRecovered);
  var totalNonDiagnosedRecovered = initialReportedRecovered * (underReportingFactor - 1);

  for (var _i4 = lastIndex; _i4 < lastIndex + upsampleSizeRounded(totalNonDiagnosedRecovered); _i4++) {
    studyPopulation[_i4].healthState = healthState.RECOVERED;
    studyPopulation[_i4].infectionState = null;
  }

  lastIndex += upsampleSizeRounded(totalNonDiagnosedRecovered);

  for (var _i5 = lastIndex; _i5 < lastIndex + upsampleSizeRounded(initialDead); _i5++) {
    studyPopulation[_i5].healthState = healthState.DEAD;
    studyPopulation[_i5].willDie = true;
    studyPopulation[_i5].infectionState = null;
  }

  lastIndex += upsampleSizeRounded(initialDead);
  createFates(studyPopulation.filter(function (person) {
    return person.healthState === healthState.INFECTED && person.infectionState === infectionState.UNDETECTED;
  }), true);
  simulationStats = [calculateStats()];

  if (_loglevel.default.getLevel() <= _loglevel.default.levels.DEBUG) {
    _loglevel.default.debug('Diagnosed: ', studyPopulation.filter(function (person) {
      return person.infectionState === infectionState.DIAGNOSED;
    }).length);

    _loglevel.default.debug('Will be diagnosed: ', studyPopulation.filter(function (person) {
      return person.willBeDiagnosed;
    }).length);

    _loglevel.default.debug('Will be diagnosed infected: ', studyPopulation.filter(function (person) {
      return person.willBeDiagnosed && person.healthState === healthState.INFECTED;
    }).length);

    _loglevel.default.debug('Undiagnosed: ', studyPopulation.filter(function (person) {
      return person.healthState === healthState.INFECTED && person.infectionState === infectionState.UNDETECTED;
    }).length);

    _loglevel.default.debug('Will die: ', studyPopulation.filter(function (person) {
      return person.willDie;
    }).length);

    _loglevel.default.debug('Dead: ', studyPopulation.filter(function (person) {
      return person.healthState === healthState.DEAD;
    }).length);

    _loglevel.default.debug('Recovered: ', studyPopulation.filter(function (person) {
      return person.healthState === healthState.RECOVERED;
    }).length);
  }
}
/**
 * Infect.
 */


function infect() {
  var _simulationParameters5 = simulationParameters,
      averageRecoveringDays = _simulationParameters5.averageRecoveringDays,
      initialTransmissionBoost = _simulationParameters5.initialTransmissionBoost,
      measuresSeverity = _simulationParameters5.measuresSeverity,
      population = _simulationParameters5.population,
      transmissibility = _simulationParameters5.transmissibility;
  var susceptible = studyPopulation.filter(function (person) {
    return person.healthState === healthState.HEALTHY;
  });
  var infectedFreeCount = studyPopulation.filter(function (person) {
    return person.healthState === healthState.INFECTED && person.infectionState !== infectionState.DIAGNOSED;
  }).length;
  var susceptibleCount = susceptible.length;
  var allAffectedCount = studyPopulation.filter(function (person) {
    return person.healthState !== healthState.HEALTHY;
  }).length;
  var healthyPopulationRatio = susceptibleCount / upsampleSize(population);

  var initialContagionEffect = function initialContagionEffect(allAffectedCount) {
    return (initialTransmissionBoost - 1) * Math.exp(-(allAffectedCount * 300 / upsampleSize(population))) + 1;
  };

  var contagionFactor = (1 - measuresSeverity) * transmissibility * initialContagionEffect(allAffectedCount);
  var toBeInfectedCount = infectedFreeCount * healthyPopulationRatio * contagionFactor * (1 / averageRecoveringDays);

  _loglevel.default.debug('Infected before:', studyPopulation.filter(function (person) {
    return person.healthState === healthState.INFECTED;
  }).length);

  for (var i = 0; i < Math.round(toBeInfectedCount); i++) {
    susceptible[i].healthState = healthState.INFECTED;
    susceptible[i].infectedDay = simulationState.day;
    susceptible[i].infectionState = infectionState.UNDETECTED;
  }

  createFates(susceptible.slice(0, Math.round(toBeInfectedCount)));

  _loglevel.default.debug('Infected after:', studyPopulation.filter(function (person) {
    return person.healthState === healthState.INFECTED;
  }).length);
}
/**
 * Recover.
 */


function recover() {
  var _simulationParameters6 = simulationParameters,
      averageRecoveringDays = _simulationParameters6.averageRecoveringDays;

  var personCanRecoverThisDay = function personCanRecoverThisDay(person) {
    return !person.willDie && (person.infectionState === infectionState.DIAGNOSED || !person.willBeDiagnosed) && person.infectedDay !== simulationState.day;
  };

  var infected = studyPopulation.filter(function (person) {
    return person.healthState === healthState.INFECTED && personCanRecoverThisDay(person);
  });

  var recoverDayDistribution = _distributions.default.Normal(averageRecoveringDays, averageRecoveringDays / 5);

  var daysList = (0, _lodash.range)(300);
  var daysDistributionWeights = daysList.map(function (day) {
    return 1000 * recoverDayDistribution.pdf(day);
  });

  _loglevel.default.debug('Recovered before:', studyPopulation.filter(function (person) {
    return person.healthState === healthState.RECOVERED;
  }).length);

  infected.forEach(function (infectedPerson) {
    var daysSinceInfected = simulationState.day - infectedPerson.infectedDay;

    var dayThisPersonWouldRecover = _weighted.default.select(daysList.slice(daysSinceInfected), daysDistributionWeights.slice(daysSinceInfected));

    if (daysSinceInfected === dayThisPersonWouldRecover) {
      infectedPerson.healthState = healthState.RECOVERED;
    }
  });

  _loglevel.default.debug('Recovered after:', studyPopulation.filter(function (person) {
    return person.healthState === healthState.RECOVERED;
  }).length);
}
/**
 * Kill.
 */


function kill() {
  var _simulationParameters7 = simulationParameters,
      averageDyingDays = _simulationParameters7.averageDyingDays;

  var personCanDyeThisDay = function personCanDyeThisDay(person) {
    return person.willDie && (person.infectionState === infectionState.DIAGNOSED || !person.willBeDiagnosed) && person.infectedDay !== simulationState.day;
  };

  var infectedThatWillDie = studyPopulation.filter(function (person) {
    return person.healthState === healthState.INFECTED && personCanDyeThisDay(person);
  });

  var dyingDayDistribution = _distributions.default.Normal(averageDyingDays, averageDyingDays / 5);

  var daysList = (0, _lodash.range)(300);
  var daysDistributionWeights = daysList.map(function (day) {
    return 1000 * dyingDayDistribution.pdf(day);
  });

  _loglevel.default.debug('Dead before:', studyPopulation.filter(function (person) {
    return person.healthState === healthState.DEAD;
  }).length);

  infectedThatWillDie.forEach(function (infectedPerson) {
    var daysSinceInfected = simulationState.day - infectedPerson.infectedDay;

    var dayThisPersonWouldDie = _weighted.default.select(daysList.slice(daysSinceInfected), daysDistributionWeights.slice(daysSinceInfected));

    if (daysSinceInfected === dayThisPersonWouldDie) {
      infectedPerson.healthState = healthState.DEAD;
    }
  });

  _loglevel.default.debug('Dead after:', studyPopulation.filter(function (person) {
    return person.healthState === healthState.DEAD;
  }).length);
}
/**
 * Diagnose.
 */


function diagnose() {
  var _simulationParameters8 = simulationParameters,
      averageDiagnosticDays = _simulationParameters8.averageDiagnosticDays;

  var personCanBeDiagnosedThisDay = function personCanBeDiagnosedThisDay(person) {
    return person.willBeDiagnosed && person.infectionState === infectionState.UNDETECTED && person.infectedDay !== simulationState.day;
  };

  var infectedThatWillBeDiagnosed = studyPopulation.filter(function (person) {
    return person.healthState === healthState.INFECTED && personCanBeDiagnosedThisDay(person);
  });

  var diagnosticDayDistribution = _distributions.default.Normal(averageDiagnosticDays, averageDiagnosticDays / 5);

  var daysList = (0, _lodash.range)(300);
  var daysDistributionWeights = daysList.map(function (day) {
    return 1000 * diagnosticDayDistribution.pdf(day);
  });

  _loglevel.default.debug('Diagnosed before:', studyPopulation.filter(function (person) {
    return person.infectionState === infectionState.DIAGNOSED;
  }).length);

  infectedThatWillBeDiagnosed.forEach(function (infectedPerson) {
    var daysSinceInfected = simulationState.day - infectedPerson.infectedDay;

    var dayThisPersonWouldBeDiagnosed = _weighted.default.select(daysList.slice(daysSinceInfected), daysDistributionWeights.slice(daysSinceInfected));

    if (daysSinceInfected === dayThisPersonWouldBeDiagnosed) {
      infectedPerson.infectionState = infectionState.DIAGNOSED;
      infectedPerson.diagnosedDay = simulationState.day;
    }
  });

  _loglevel.default.debug('Diagnosed after:', studyPopulation.filter(function (person) {
    return person.infectionState === infectionState.DIAGNOSED;
  }).length);
}
/**
 * Simulate a new day.
 */


function iterate() {
  simulationState.day++;
  infect();
  recover();
  kill();
  diagnose();
  simulationStats.push(calculateStats());
}
/**
 * Set simulation parameters.
 */


function setParameters(parameters) {
  simulationParameters = (0, _objectSpread.default)({}, parameters);

  if (simulationState) {
    simulationState.parametersChanges = [].concat((0, _toConsumableArray2.default)(simulationState.parametersChanges), [simulationState.day]);
  } // Fates should not be changeable, so leave commented.
  // if (!isEmpty(studyPopulation)) {
  //   createFates(studyPopulation);
  // }

}
/**
 * Gather simulation state.
 */


function getState() {
  return {
    isInitialized: !(0, _lodash.isEmpty)(studyPopulation),
    parametersChanges: simulationState.parametersChanges,
    rawStats: simulationStats,
    stats: virtualizeRawStats(simulationStats)
  };
}
/**
 * Expose methods.
 */


(0, _worker.expose)({
  setParameters: setParameters,
  getState: getState,
  initialize: initialize,
  iterate: iterate
});
},{"@babel/runtime/helpers/toConsumableArray":"../node_modules/@babel/runtime/helpers/toConsumableArray.js","@babel/runtime/helpers/objectSpread":"../node_modules/@babel/runtime/helpers/objectSpread.js","threads/worker":"../node_modules/threads/worker.js","lodash":"../node_modules/lodash/lodash.js","distributions":"../node_modules/distributions/distributions.js","loglevel":"../node_modules/loglevel/lib/loglevel.js","weighted":"../node_modules/weighted/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62440" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","simulation/index.js"], null)
//# sourceMappingURL=/simulation.bc0f6e28.js.map