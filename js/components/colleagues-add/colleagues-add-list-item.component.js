(function() {
  'use strict';

  function ColleaguesAddListItemComponent(colleague, id, templateScope) {
    this.template = new app.Template('colleagues-add-list-item', templateScope);
    this.colleague = colleague;
    this.id = id;
  }

  ColleaguesAddListItemComponent.prototype.updateView = function() {
    var templateData = {
      email: this.colleague.email,
      id: this.id,
      name: this.colleague.name
    };
    this.template.render(templateData);

    this._bindEvents();
  }

  ColleaguesAddListItemComponent.prototype._bindEvents = function() {
    var eventName = 'colleagues-add-list-item-remove';
    var button = qs(`[data-action="${eventName}"]`, this.template.templateTarget);

    on(button, 'click', function(event) {
      event.preventDefault();
      event.stopPropagation();

      this._fadeOutItem();
    }.bind(this));

    on(this.template.templateTarget, 'animationend', function(event) {
      event.target.classList.remove('animate', 'fade-in');

      // Wait for the removal animation to finish, then actually emit the event asking for item removal
      if (event.animationName === 'fade-out') { // This should be a configuration constant
        var customEvent = new CustomEvent(eventName, { detail: this.id });
        // Using `document` for ease of going up two levels
        document.dispatchEvent(customEvent);
      }
    });
  }

  ColleaguesAddListItemComponent.prototype._fadeOutItem = function() {
    this.template.templateTarget.classList.add('animate', 'fade-out');
  }

  window.app = window.app || {};
  window.app.ColleaguesAddListItemComponent = ColleaguesAddListItemComponent;
})();
