const babelCore = require('@babel/core');

function generate(ast) {
  const { code } = babelCore.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  });
  return code;
}

module.exports = generate;