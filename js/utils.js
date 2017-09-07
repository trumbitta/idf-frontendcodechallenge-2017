// Mostly taken from: https://github.com/tastejs/todomvc/blob/gh-pages/examples/vanillajs/js/helpers.js

(function() {
  'use strict';

  window.on = function(target, eventType, callback) {
    target.addEventListener(eventType, callback);
  }

  window.off = function (target, eventType, callback) {
    target.removeEventListener(eventType, callback);
  }

  window.qs = function(selector, scope) {
    return (scope || document).querySelector(selector);
  };

  window.qsa = function (selector, scope) {
    return (scope || document).querySelectorAll(selector);
  };

  window.qid = function(id) {
    return document.getElementById(id);
  }
})();
