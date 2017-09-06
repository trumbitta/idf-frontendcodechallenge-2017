(function () {
  'use strict';

  function ColleaguesAddListItemComponent(colleague, id, templateScope) {
    this.template = new app.Template('colleagues-add-list-item', templateScope);
    this.colleague = colleague;
    this.id = id;
  }

  ColleaguesAddListItemComponent.prototype.updateView = function() {
    var templateData = {
      id: this.id
    };
    this.template.render(templateData);
  }

  window.app = window.app || {};
  window.app.ColleaguesAddListItemComponent = ColleaguesAddListItemComponent;
})();