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

      var customEvent = new CustomEvent(eventName, { detail: this.id });
      document.dispatchEvent(customEvent); // Dispatching to `document` because several components listen to it
    }.bind(this));
  }

  window.app = window.app || {};
  window.app.ColleaguesListItemComponent = ColleaguesListItemComponent;
})();
