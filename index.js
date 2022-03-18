const compile = require('./tiny-webpack');

compile({
  entry: './src/index.js',
  output: './src/bundle.js'
});