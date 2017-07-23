const transform = require('../');
const t = require('babel-types'); //allows you to build up an ast from scratch

describe('transform', () => {
  it('should transform a literal', () => {
    const code = transform('1;', {
      NumericLiteral(node) {
        node.value = t.numericLiteral(2).value; //oh shit, you don't have to specify the key 
        return node;
      },
    });

    expect(code).toBe('2;');
  });

  it('should keep the same node', () => {
    const code = transform('1;', {
      NumericLiteral(node) {
        return node;
      },
    });

    expect(code).toBe('1;');
  });

  it('should delete a node', () => {
    const code = transform('x = 1;console.log(a)', {
      ExpressionStatement(node) {
        if (t.isCallExpression(node.expression)) {
          return null;
        }

        return node;
      },
    });

    expect(code).toBe('x = 1;');
  });
});
