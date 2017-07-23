const resolver = require('../resolver');
const fs = require('fs');

const requireRe = /\brequire\s*?\(\s*?(['"])([^"']+)\1\s*?\)/g;

function bundle(entry) {
  // resolve
  // bundle
  // return source string

  // the way we have set up the source string is an executing function 

  //graph search vs dynamic programming approach 
  // to get the cached version   


  //takes an entry point and returns the source 
  //need to build a source string that returns anywhere 

  //we construct modules using a global define function
  //webpack has its own define

  //role of bundler is to contruct the source code at runtime
  //we are generating a giant string ...


  //redundant modules is the perfect excuse for dynamic programming 

  //REASON why we want to do depth first:
  //we want to define the modules in order 
  //the deepest module needs to be defined first, so
  //everything follows from it 

  //you're building code that handles code 
  //you're generating code
  //you're doing metaprogramming 
}
module.exports = { bundle };
