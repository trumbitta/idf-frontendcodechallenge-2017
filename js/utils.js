(function(window) {
    'use strict';

    // Wish I could've used a transpiler to enable `import`, classes, and avoid this
    window.on = function(target, eventType, callback) {
        target.addEventListener(eventType, callback);
    }
})(window);
