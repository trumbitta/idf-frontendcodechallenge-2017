(function () {
  'use strict';

  function ColleaguesAddComponent(colleaguesToAdd) {
    this.template = new app.Template('colleagues-add');
    this.colleaguesAddButtonText = 'Add a colleague';
    this.colleaguesToAdd = colleaguesToAdd;
  }

  ColleaguesAddComponent.prototype.updateView = function() {
    var templateData = {
      colleaguesAddButtonText: this._updateColleaguesAddButtonText(this.colleaguesToAdd.length),
      colleaguesToAddCount: this.colleaguesToAdd.length
    };
    this.template.render(templateData);

    this.colleaguesAddListComponent = new app.ColleaguesAddListComponent(this.colleaguesToAdd);
    this.colleaguesAddListComponent.updateView();

    this._bindEvents();
  }

  ColleaguesAddComponent.prototype._bindEvents = function () {
    var eventName = 'colleagues-add-list-item-add';
    var button = qs(`[data-action="${eventName}"]`, this.template.templateTarget);

    on(button, 'click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      this._saveUserInput();
      // TODO: Refactor using a model
      this.colleaguesToAdd.push({ email: '', name: '' });
      updateStore(this.colleaguesToAdd);
      this.updateView();

      // var customEvent = new CustomEvent(eventName);
      // document.dispatchEvent(customEvent); // Dispatching to `document` because more than one component listen to it
    }.bind(this))
  }

  ColleaguesAddComponent.prototype._saveUserInput = function() {
    var inputTextArray = qsa('input[type="text"]');
    var inputEmailArray = qsa('input[type="email"]');

    this.colleaguesToAdd.forEach(function(element, index) {
      // TODO: Refactor using a model
      this.colleaguesToAdd[index] = {
        email: inputEmailArray[index].value,
        name: inputTextArray[index].value
      }
    }, this);
  }

  ColleaguesAddComponent.prototype._updateColleaguesAddButtonText = function(count) {
    if (count === 1) {
      return this.colleaguesAddButtonText
    } else {
      return `Add ${count} colleagues`
    }
  }

  function updateStore(colleaguesToAdd) {
    var customEvent = new CustomEvent('store-update', { detail: { key: 'colleaguesToAdd', data: colleaguesToAdd } });
    window.dispatchEvent(customEvent);
  }

  window.app = window.app || {};
  window.app.ColleaguesAddComponent = ColleaguesAddComponent;
})();
