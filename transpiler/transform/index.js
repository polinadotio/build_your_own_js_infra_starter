const babylon = require('babylon');
const t = require('babel-types');
const generate = require('babel-generator').default;

function transform(code, visitors) {
  //change from 1 to 2 
  //sometimes we want to return the node itself 
  //returning null deletes a node 

  //2 ways to mutate the tree
  //return a new node or null
  //if you return the same node, it's a no-op 

  let ast = babylon.parse(code)
  //traverse ast recursively and mutate the tree 

  //go through the ast. every time we find a node, 
  //check if it matches a visitor
  //if it does, call the handler for the visitor 

  let child_keys = t.VISITOR_KEYS[ast.type];

  traverseAST(ast, visitors);
  //then generate code for your mutated ast

  return generate(ast).code;
}

function traverseAST(node, visitors) {
  if (node === undefined) {
    return
  }
  // console.log("now at the following node", node);
  //for the given node, check if you need to call the 
  //handler for the visitor on it
  for (var type in visitors) {
    if (node.type === type) {
      // console.log("before calling visitor", node);
      // node.value = visitors[type](node).value;
      node = visitors[type](node);
      // console.log("after calling visitor", node);
    }
  }

  //what I'm missing is rewalking the modified node, bc we should
  //probably do that
  if (node === undefined) {
    return
  }

  //continue going through your nodes and visit each node
  let child_keys = t.VISITOR_KEYS[node.type];
  //console.log("all possible node types", child_keys);

  for (var index in child_keys) {
    //the child key can either point to an array 
    //or another another node 
    if (Array.isArray(node[child_keys[index]])) {
      for (var j in node[child_keys[index]]) {
        traverseAST(node[child_keys[index]][j], visitors);
      }
    } else {
      traverseAST(node[child_keys[index]], visitors);
    }

  }
}

module.exports = transform;
