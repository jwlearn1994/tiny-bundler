(function(modules) {
  var installedModules = {};

  function require(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    var currentModule = installedModules[moduleId] = {
      id: moduleId,
      loaded: false,
      exports: {}
    };

    var args = [currentModule, currentModule.exports, moduleId, modules[moduleId].dirname];

    (function(module, exports, __filename, __dirname) {
      eval(modules[moduleId].code);
    }).apply(currentModule, args);

    currentModule.loaded = true;

    return currentModule.exports;
  }
  require('./src/index.js');
})({"./src/index.js":{"deps":{"./sum.js":"./src/sum.js"},"dirname":"./src","code":"\"use strict\";\n\nvar _sum = _interopRequireDefault(require(\"./src/sum.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n(0, _sum[\"default\"])(1, 2);"},"./src/sum.js":{"deps":{},"dirname":"./src","code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar sum = function sum(a, b) {\n  console.log('sum', a + b);\n  console.log('dirname', __dirname);\n  return a + b;\n};\n\nvar _default = sum;\nexports[\"default\"] = _default;"}})