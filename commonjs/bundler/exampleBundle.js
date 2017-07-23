// Example bundle
function define(id, moduleMap, factory) {
  // Does a lot of other stuff, but one of the things is
  // calling the factory and caching the module object:
  const module = { exports: {} };
  define.moduleMap[id] = module; //attaching to global 
  //you want to define moduleMap before factory bc of
  //cyclical requires 
  //we want to cache the module immediately 
  //in case something in the factory requires the thing
  //we just required 
  //need to resolve cyclical requires ... 
  factory(require, module, module.exports);
}

// Executing this bundle to the end results in something like:
//  define.moduleMap = {
//    '/project/node_modules/lodash/index.js': module, // { exports: { math: function() {} }
//    '/project/index.js': module, // { exports: { math: function } }
//  };

define(
  '/project/node_modules/lodash/index.js',
  {
    './math': '/project/node_modules/lodash/math.js',
  },
  // factory:
  function(require, module, exports) {
    const math = require('./math');
    exports.math = math;
  },
);

define(
  '/project/index.js',
  {
    './foo': '/project/foo',
    lodash: '/project/node_modules/lodash/index.js',
  },
  function(require, module, exports) {
    const foo = require('./foo');
    const lodash = require('lodash');

    module.exports = lodash.math;
  },
);
