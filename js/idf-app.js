(function() {
  'use strict';

  var self;

  function IDFApp(name) {
    this.store = new app.Store(name);
    self = this;
  }

  IDFApp.prototype.init = function() {
    var data = self.store.findAll();
    this.colleaguesStatusComponent = new app.ColleaguesStatusComponent(data.existingColleagues.length);
    this.colleaguesStatusComponent.updateView();

    this.colleaguesAddComponent = new app.ColleaguesAddComponent(data.colleaguesToAdd, data.existingColleagues);
    this.colleaguesAddComponent.updateView();

    this.colleaguesListComponent = new app.ColleaguesListComponent(data.existingColleagues);
    this.colleaguesListComponent.updateView();
  }

  IDFApp.prototype.updateStore = function(key, data) {
    this.store.save(key, data);
  }

  window.app = window.app || {};
  window.app.IDFApp = IDFApp;
})();
