const transform = require('../transform');
const t = require('babel-types');

module.exports = code => {
  return transform(code, {
    ArrowFunctionExpression(node) {

    //'var add = (a, b) => a + b'

    /*
    var add = function add(a, b) {
      return a + b;
    };
    */

    //if it's an arrow function expression, 
    //I want to convert it to a function expression

    console.log("node expression", node);

    return node;
    }, //this helps you give intuition on how to build babel plugins
    //or babel transpiler tools 
  });

};
