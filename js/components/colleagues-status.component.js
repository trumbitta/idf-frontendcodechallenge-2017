(function(window) {
  'use strict';

  function ColleaguesStatusComponent(existingUsersCount) {
    this.template = new app.Template('colleagues-status');
    this.existingUsersCount = existingUsersCount;
  }

  ColleaguesStatusComponent.prototype.updateView = function() {
    var templateData = {
      colleaguesCount: this.existingUsersCount,
      colleaguesLeft: 10 - this.existingUsersCount // TODO: '10' should be a configuration constant
    };
    this.template.render(templateData);
  }

  window.app = window.app || {};
  window.app.ColleaguesStatusComponent = ColleaguesStatusComponent;
})(window);
