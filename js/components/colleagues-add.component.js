(function() {
  'use strict';

  function ColleaguesAddComponent(colleaguesToAdd, existingUsers) {
    this.template = new app.Template('colleagues-add');
    this.colleaguesAddListItemAddButtonDisabled = '';
    this.colleaguesAddButtonText = 'Add a colleague';
    this.colleaguesToAdd = colleaguesToAdd;
    this.colleaguesToAddReset = Array.from(colleaguesToAdd);
    this.existingUsers = existingUsers;

    // These events got caught in a multiplying loop because _bindEvents and updateView call each other
    this.colleaguesAddListItemRemoveHandler = handleColleaguesAddListItemRemove.bind(this);
    this.existingColleaguesUpdateHandler = handleExistingColleaguesUpdate.bind(this);

    off(document, 'colleagues-add-list-item-remove', this.colleaguesAddListItemRemoveHandler);
    off(document, 'existing-colleagues-update', this.existingColleaguesUpdateHandler);
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
    var buttonColleaguesAdd = qs(`[data-action="colleagues-add"]`, this.template.templateTarget);
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

    on(buttonColleaguesAdd, 'click', function(event) {
      // This also disables automatic form validation, but it's needed because only Chrome was working with `action=""` and `method="POST"`.
      event.preventDefault();
      event.stopPropagation();

      if (validateUserInput() === true) {
        this._saveUserInput();
        var newExistingUsers = this.existingUsers.concat(this.colleaguesToAdd);
        this.existingUsers = Array.from(newExistingUsers);
        updateStore(this.existingUsers, 'existingUsers');
        updateExistingColleaguesList(this.existingUsers);

        // TODO: extract a method from these three lines: see also the next code block
        this.colleaguesToAdd = [{ email: '', name: '' }]; // TODO: use a model for this
        updateStore(this.colleaguesToAdd);
        this.updateView();
      } else {
        // TODO: dispatch event(s) to display helpful error message(s)
      }
    }.bind(this));

    on(buttonResetColleaguesAddList, 'click', function(event) {
      event.preventDefault();
      event.stopPropagation();

      this.colleaguesToAdd = Array.from(this.colleaguesToAddReset);
      updateStore(this.colleaguesToAdd);
      this.updateView();
    }.bind(this));

    on(document, 'colleagues-add-list-item-remove', this.colleaguesAddListItemRemoveHandler);

    on(document, 'existing-colleagues-update', this.existingColleaguesUpdateHandler);
  }

  ColleaguesAddComponent.prototype._saveUserInput = function() {
    var userInput = getUserInput();

    this.colleaguesToAdd.forEach(function(element, index) {
      // TODO: Refactor using a model
      this.colleaguesToAdd[index] = {
        email: userInput.emails[index].value,
        name: userInput.names[index].value
      }
    }, this);
  }

  ColleaguesAddComponent.prototype._updateColleaguesAddListItemAddButtonDisabled = function(count) {
    var maxColleaguesToAdd = 10 - this.existingUsers.length; // 10 should be a configuration constant
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

  function validateUserInput() {
    var userInput = getUserInput();

    return (checkNames(userInput.names) === true) && (checkEmails(userInput.emails) === true);
  }

  function checkNames(names) {
    var isValid = true;

    names.forEach(function(name) {
      if (name.value === undefined || name.value === null || name.value === '') {
        isValid = false;
      }
    }, this);

    return isValid;
  }

  function checkEmails(emails) {
    var isValid = true;

    // TODO: check for a valid email address
    // Warning: it's controversial https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
    emails.forEach(function(email) {
      if (email.value === undefined || email.value === null || email.value === '') {
        isValid = false;
      }
    }, this);

    return isValid;
  }

  function getUserInput() {
    var inputTextArray = qsa('input[type="text"]');
    var inputEmailArray = qsa('input[type="email"]');

    return {
      emails: inputEmailArray,
      names: inputTextArray
    }
  }

  function removeFromArray(array, index) {
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  function updateStore(data, key) {
    if (key === undefined) {
      key = 'colleaguesToAdd';
    }
    var customEvent = new CustomEvent('store-update', { detail: { key: key, data: data } });
    window.dispatchEvent(customEvent);
  }

  function handleColleaguesAddListItemRemove(event) {
    event.stopPropagation();

    removeFromArray(this.colleaguesToAdd, event.detail);
    updateStore(this.colleaguesToAdd);
    this.updateView();
  }

  function handleExistingColleaguesUpdate(event) {
    this.existingUsers = event.detail;
    this.updateView();
  }

  function updateExistingColleaguesList(existingUsers) {
    var customEvent = new CustomEvent('existing-colleagues-update', { detail: existingUsers });
    document.dispatchEvent(customEvent);
  }

  window.app = window.app || {};
  window.app.ColleaguesAddComponent = ColleaguesAddComponent;
})();
