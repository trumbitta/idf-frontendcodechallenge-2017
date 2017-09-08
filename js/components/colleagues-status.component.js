(function() {
  'use strict';

  function ColleaguesStatusComponent(existingColleaguesCount) {
    this.template = new app.Template('colleagues-status');
    this.existingColleaguesCount = existingColleaguesCount;

    this._bindEvents();
  }

  ColleaguesStatusComponent.prototype.updateView = function() {
    var templateData = {
      colleaguesCount: this.existingColleaguesCount,
      colleaguesLeft: 10 - this.existingColleaguesCount // TODO: '10' should be a configuration constant
    };
    this.template.render(templateData);
  }

  ColleaguesStatusComponent.prototype._bindEvents = function() {
    on(document, 'existing-colleague-remove', function(event) {
      event.stopPropagation();

      this.existingColleaguesCount -= 1;
      this.updateView();
    }.bind(this));

    on(document, 'existing-colleagues-update', function(event) {
      event.stopPropagation();

      this.existingColleaguesCount = event.detail.length;
      this.updateView();
    }.bind(this));
  }

  window.app = window.app || {};
  window.app.ColleaguesStatusComponent = ColleaguesStatusComponent;
})();
