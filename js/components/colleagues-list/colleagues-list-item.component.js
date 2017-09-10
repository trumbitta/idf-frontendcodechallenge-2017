(function() {
  'use strict';

  function ColleaguesListItemComponent(user, id, templateScope) {
    this.template = new app.Template('colleagues-list-item', templateScope);
    this.user = user;
    this.id = id;
  }

  ColleaguesListItemComponent.prototype.updateView = function() {
    var templateData = {
      colleagueEmail: this.user.email,
      colleagueName: this.user.name
    };
    this.template.render(templateData);

    this._bindEvents();
  }

  ColleaguesListItemComponent.prototype._bindEvents = function() {
    var eventName = 'existing-colleague-remove';
    var button = qs(`[data-action="${eventName}"]`, this.template.templateTarget);

    on(button, 'click', function(event) {
      event.preventDefault();
      event.stopPropagation();

      this._fadeOutItem();
    }.bind(this));

    on(this.template.templateTarget, 'animationend', function(event) {
      // Wait for the removal animation to finish, then actually emit the event asking for item removal
      if (event.animationName === 'fade-out') { // This should be a configuration constant
        var customEvent = new CustomEvent(eventName, { detail: this.id });
        // Using `document` for ease of going up two levels
        document.dispatchEvent(customEvent);
      }
    });
  }

  ColleaguesListItemComponent.prototype._fadeOutItem = function() {
    this.template.templateTarget.classList.add('animate', 'fade-out');
  }

  window.app = window.app || {};
  window.app.ColleaguesListItemComponent = ColleaguesListItemComponent;
})();
