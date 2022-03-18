const fs = require('fs');
const path = require('path');
const parseAST = require('./parse');
const traverseAST = require('./traverse');
const generate = require('./generate');

const bundleTemplate = fs.readFileSync('./template.js', 'utf-8');

function getModuleInfo(file) {
  const body = fs.readFileSync(file, 'utf-8');
  const ast = parseAST(body);
  const deps = traverseAST(ast, { file });
  const code = generate(ast);
  return { file, deps, code };
}

function parseModules(file) {
  const entry = getModuleInfo(file);
  const temp = [entry];
  const depsGraph = {};

  for (let i = 0; i<temp.length; i++) {
    const deps = temp[i].deps
    if (deps) {
      for (const key in deps) {
        if (deps.hasOwnProperty(key)) {
          temp.push(getModuleInfo(deps[key]))
        }
      }
    }
  }

  temp.forEach((moduleInfo) => {
    const { file, deps, code } = moduleInfo;
    depsGraph[file] = {
      deps,
      dirname: path.dirname(file),
      code,
    };
  })

  return depsGraph;
}

function bundleAll(file) {
  const depsGraph = JSON.stringify(parseModules(file));
  return bundleTemplate
    .replace(/\<\%\s?entry\s?\%\>/g, file)
    .replace(/\<\%\s?depsGraph\s?\%\>/g, depsGraph);
}

function compile({ entry, output }) {
  const content = bundleAll(entry);
  fs.writeFileSync(output, content);
}

module.exports = compile;

