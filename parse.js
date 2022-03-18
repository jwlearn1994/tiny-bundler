const parser = require('@babel/parser');

const options = {
  sourceType: 'module', // 表示我们要解析的是ES模塊
};

function parseAST(input) {
  return parser.parse(input, options);
}

module.exports = parseAST;
