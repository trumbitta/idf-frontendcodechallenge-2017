(function() {
  'use strict';

  function ColleaguesStatusComponent(existingUsersCount) {
    this.template = new app.Template('colleagues-status');
    this.existingUsersCount = existingUsersCount;

    this._bindEvents();
  }

  ColleaguesStatusComponent.prototype.updateView = function() {
    var templateData = {
      colleaguesCount: this.existingUsersCount,
      colleaguesLeft: 10 - this.existingUsersCount // TODO: '10' should be a configuration constant
    };
    this.template.render(templateData);
  }

  ColleaguesStatusComponent.prototype._bindEvents = function () {
    on(document, 'item-remove', function (event) {
      event.stopPropagation();

      this.existingUsersCount -= 1;
      this.updateView();
    }.bind(this))
  }

  window.app = window.app || {};
  window.app.ColleaguesStatusComponent = ColleaguesStatusComponent;
})();
