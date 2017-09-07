(function() {
  'use strict';

  function ColleaguesListComponent(existingUsers) {
    this.template = new app.Template('colleagues-list');
    this.existingUsers = existingUsers;

    this._bindEvents();
  }

  ColleaguesListComponent.prototype.updateView = function() {
    // Quick way to ensure a proper update while using appendChild()
    this.template.templateTarget.innerHTML = '';

    this.existingUsers.forEach(function(user, index) {
      var userElement = document.createElement('li');
      userElement.setAttribute('data-template', 'colleagues-list-item');
      this.template.templateTarget.appendChild(userElement);

      this.colleaguesListItemComponent = new app.ColleaguesListItemComponent(user, index, this.template.templateTarget);
      this.colleaguesListItemComponent.updateView();
    }, this);
  }

  ColleaguesListComponent.prototype._bindEvents = function() {
    on(document, 'existing-colleague-remove', function(event) {
      event.stopPropagation();

      removeFromArray(this.existingUsers, event.detail);

      // This event is also listened to elsewhere
      var customEvent = new CustomEvent('existing-colleagues-update', { detail: this.existingUsers });
      document.dispatchEvent(customEvent);
    }.bind(this));

    on(document, 'existing-colleagues-update', function(event) {
      this.existingUsers = event.detail;

      updateStore(this.existingUsers);
      this.updateView();
    }.bind(this));
  }

  function removeFromArray(array, index) {
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  function updateStore(existingUsers) {
    var customEvent = new CustomEvent('store-update', { detail: { key: 'existingUsers', data: existingUsers } });
    window.dispatchEvent(customEvent);
  }

  window.app = window.app || {};
  window.app.ColleaguesListComponent = ColleaguesListComponent;
})();
