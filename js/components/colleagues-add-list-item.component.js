(function () {
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
  }

  window.app = window.app || {};
  window.app.ColleaguesAddListItemComponent = ColleaguesAddListItemComponent;
})();
