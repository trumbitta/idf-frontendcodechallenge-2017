(function() {
  'use strict';

  function ColleaguesListComponent(existingColleagues) {
    this.template = new app.Template('colleagues-list');
    this.existingColleagues = existingColleagues;

    this._bindEvents();
  }

  ColleaguesListComponent.prototype.updateView = function() {
    // Quick way to ensure a proper update while using appendChild()
    this.template.templateTarget.innerHTML = '';

    this.existingColleagues.forEach(function(colleague, index) {
      var colleagueElement = prepareColleagueElement();
      this.template.templateTarget.appendChild(colleagueElement);

      this.colleaguesListItemComponent = new app.ColleaguesListItemComponent(colleague, index, this.template.templateTarget);
      this.colleaguesListItemComponent.updateView();
    }, this);
  }

  ColleaguesListComponent.prototype._bindEvents = function() {
    on(document, 'existing-colleague-remove', function(event) {
      event.stopPropagation();

      removeFromArray(this.existingColleagues, event.detail);

      // This event is also listened to elsewhere
      var customEvent = new CustomEvent('existing-colleagues-update', { detail: this.existingColleagues });
      document.dispatchEvent(customEvent);
    }.bind(this));

    on(document, 'existing-colleagues-update', function(event) {
      this.existingColleagues = event.detail;

      updateStore(this.existingColleagues);
      this.updateView();
    }.bind(this));
  }

  function prepareColleagueElement() {
    var element = document.createElement('li');

    element.classList.add('animate', 'fade-in');
    element.setAttribute('data-template', 'colleagues-list-item');

    return element;
  }

  function removeFromArray(array, index) {
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  function updateStore(existingColleagues) {
    var customEvent = new CustomEvent('store-update', { detail: { key: 'existingColleagues', data: existingColleagues } });
    window.dispatchEvent(customEvent);
  }

  window.app = window.app || {};
  window.app.ColleaguesListComponent = ColleaguesListComponent;
})();
