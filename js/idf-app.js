(function(window) {
  'use strict';

  var self;

  function IDFApp(name) {
    this.store = new app.Store(name);
    self = this;
  }

  IDFApp.prototype.init = function() {
    console.log('App started');

    var existingUsers = self.store.findAll();
    this.colleaguesStatusComponent = new app.ColleaguesStatusComponent(existingUsers.count);
    this.colleaguesStatusComponent.updateView();
  }

  window.app = window.app || {};
  window.app.IDFApp = IDFApp;
})(window);
