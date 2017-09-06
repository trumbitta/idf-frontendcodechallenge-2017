(function() {
  'use strict';

  var idfApp = new app.IDFApp('idf-fe-code-challenge-2017');
  on(window, 'load', idfApp.init);
  on(window, 'store-update', function(event) {
    event.stopPropagation();

    idfApp.updateStore(event.detail);
  })
})();
