const path = require('path');
const traverse = require('@babel/traverse').default;

function traverseAST(ast, { file }) {
  const deps = {};

  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file);
      const abspath = './' + path.join(dirname, node.source.value);
      deps[node.source.value] = abspath;
      node.source.value = abspath;
    }
  });

  return deps;
}

module.exports = traverseAST;
