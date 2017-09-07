(function () {
  'use strict';

  function ColleaguesAddComponent(colleaguesToAdd, existingUsersCount) {
    this.template = new app.Template('colleagues-add');
    this.colleaguesAddListItemAddButtonDisabled = '';
    this.colleaguesAddButtonText = 'Add a colleague';
    this.colleaguesToAdd = colleaguesToAdd;
    this.colleaguesToAddReset = Array.from(colleaguesToAdd);
    this.existingUsersCount = existingUsersCount;

    // This event got caught in a multiplying loop because _bindEvents and updateView call each other
    this.colleaguesAddListItemRemoveHandler = handleColleaguesAddListItemRemove.bind(this);
    off(document, 'colleagues-add-list-item-remove', this.colleaguesAddListItemRemoveHandler);
  }

  ColleaguesAddComponent.prototype.updateView = function() {
    var templateData = {
      // This is snake_case because it's used in a HTML element attribute, and it must be all lowercase
      colleagues_add_list_item_add_button_disabled: this._updateColleaguesAddListItemAddButtonDisabled(this.colleaguesToAdd.length),
      colleaguesAddButtonText: this._updateColleaguesAddButtonText(this.colleaguesToAdd.length),
      colleaguesToAddCount: this.colleaguesToAdd.length
    };
    this.template.render(templateData);

    this.colleaguesAddListComponent = new app.ColleaguesAddListComponent(this.colleaguesToAdd);
    this.colleaguesAddListComponent.updateView();

    this._bindEvents();
  }

  ColleaguesAddComponent.prototype._bindEvents = function() {
    var buttonAddColleagueToList = qs(`[data-action="colleagues-add-list-item-add"]`, this.template.templateTarget);
    var buttonResetColleaguesAddList = qs(`[data-action="colleagues-add-list-reset"]`, this.template.templateTarget);

    on(buttonAddColleagueToList, 'click', function(event) {
      event.preventDefault();
      event.stopPropagation();

      this._saveUserInput();
      // TODO: Refactor using a model
      this.colleaguesToAdd.push({ email: '', name: '' });
      updateStore(this.colleaguesToAdd);
      this.updateView();
    }.bind(this));

    on(buttonResetColleaguesAddList, 'click', function(event) {
      event.preventDefault();
      event.stopPropagation();

      this.colleaguesToAdd = Array.from(this.colleaguesToAddReset);
      updateStore(this.colleaguesToAdd);
      this.updateView();
    }.bind(this));

    on(document, 'colleagues-add-list-item-remove', this.colleaguesAddListItemRemoveHandler);
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

  ColleaguesAddComponent.prototype._updateColleaguesAddListItemAddButtonDisabled = function(count) {
    var maxColleaguesToAdd = 10 - this.existingUsersCount; // 10 should be a configuration constant
    if (count < maxColleaguesToAdd) {
      return this.colleaguesAddListItemAddButtonDisabled;
    } else {
      return 'disabled'
    }
  }

  ColleaguesAddComponent.prototype._updateColleaguesAddButtonText = function(count) {
    if (count === 1) {
      return this.colleaguesAddButtonText
    } else {
      return `Add ${count} colleagues`
    }
  }

  function removeFromArray(array, index) {
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  function updateStore(colleaguesToAdd) {
    var customEvent = new CustomEvent('store-update', { detail: { key: 'colleaguesToAdd', data: colleaguesToAdd } });
    window.dispatchEvent(customEvent);
  }

  function handleColleaguesAddListItemRemove(event) {
    event.stopPropagation();

    removeFromArray(this.colleaguesToAdd, event.detail);
    updateStore(this.colleaguesToAdd);
    this.updateView();
  }

  window.app = window.app || {};
  window.app.ColleaguesAddComponent = ColleaguesAddComponent;
})();
