(function() {
  'use strict';

  function ColleaguesListComponent(existingUsers) {
    this.template = new app.Template('colleagues-list');
    this.existingUsers = existingUsers;
  }

  ColleaguesListComponent.prototype.updateView = function() {
    this.existingUsers.forEach(function (user) {
      var userElement = document.createElement('li');
      userElement.setAttribute('data-template', 'colleagues-list-item');
      this.template.templateTarget.appendChild(userElement);

      this.colleaguesListItemComponent = new app.ColleaguesListItemComponent(user, this.template.templateTarget);
      this.colleaguesListItemComponent.updateView();
    }, this);
  }

  window.app = window.app || {};
  window.app.ColleaguesListComponent = ColleaguesListComponent;
})();
