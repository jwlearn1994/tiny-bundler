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
  require('<% entry %>');
})(<% depsGraph %>)