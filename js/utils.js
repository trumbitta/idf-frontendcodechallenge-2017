// Mostly taken from: https://github.com/tastejs/todomvc/blob/gh-pages/examples/vanillajs/js/helpers.js

(function() {
  'use strict';

  // Wish I could've used a transpiler to enable `import`, classes, and avoid this
  window.on = function(target, eventType, callback) {
    target.addEventListener(eventType, callback);
  }

  window.qs = function(selector, scope) {
    return (scope || document).querySelector(selector);
  };

  window.qid = function(id) {
    return document.getElementById(id);
  }
})();
