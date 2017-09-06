(function() {
  'use strict';

  function ColleaguesListItemComponent(user, templateScope) {
    this.template = new app.Template('colleagues-list-item', templateScope);
    this.user = user;
  }

  ColleaguesListItemComponent.prototype.updateView = function() {
    var templateData = {
      colleagueEmail: this.user.email,
      colleagueName: this.user.name
    };
    this.template.render(templateData);
  }

  window.app = window.app || {};
  window.app.ColleaguesListItemComponent = ColleaguesListItemComponent;
})();
