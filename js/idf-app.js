(function() {
  'use strict';

  var self;

  function IDFApp(name) {
    this.store = new app.Store(name);
    self = this;
  }

  IDFApp.prototype.init = function() {
    var existingUsers = self.store.findAll();
    this.colleaguesStatusComponent = new app.ColleaguesStatusComponent(existingUsers.count);
    this.colleaguesStatusComponent.updateView();

    this.colleaguesListComponent = new app.ColleaguesListComponent(existingUsers.existingUsers);
    this.colleaguesListComponent.updateView();
  }

  IDFApp.prototype.updateStore = function(existingUsers) {
    var newExistingUsers = {
      count: existingUsers.length,
      existingUsers: existingUsers
    };

    this.store.save(newExistingUsers);
  }

  window.app = window.app || {};
  window.app.IDFApp = IDFApp;
})();
