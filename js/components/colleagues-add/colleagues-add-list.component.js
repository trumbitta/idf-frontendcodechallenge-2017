(function() {
  'use strict';

  function ColleaguesAddListComponent(colleaguesToAdd) {
    this.template = new app.Template('colleagues-add-list');
    this.colleaguesToAdd = colleaguesToAdd;
  }

  ColleaguesAddListComponent.prototype.updateView = function() {
    var templateData = {};
    this.template.render(templateData);

    this.colleaguesToAdd.forEach(function(colleague, index) {
      var colleagueElement = prepareColleagueElement();
      this.template.templateTarget.appendChild(colleagueElement);

      this.colleaguesAddListItemComponent = new app.ColleaguesAddListItemComponent(colleague, index, this.template.templateTarget);
      this.colleaguesAddListItemComponent.updateView();
    }, this);
  }

  function prepareColleagueElement() {
    var element = document.createElement('li');

    // I don't like setting classes programmatically; but this time I couldn't come up with a better custom framework, so I have to.
    element.classList.add('form-row', 'animate', 'fade-in');
    element.setAttribute('data-template', 'colleagues-add-list-item');

    return element;
  }

  window.app = window.app || {};
  window.app.ColleaguesAddListComponent = ColleaguesAddListComponent;
})();
