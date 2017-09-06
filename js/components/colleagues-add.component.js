(function () {
  'use strict';

  function ColleaguesAddComponent() {
    this.template = new app.Template('colleagues-add');
    this.colleaguesAddButtonText = 'Add a colleague';
    this.colleaguesToAdd = {
      colleaguesToAdd: [{
        email: '',
        name: ''
      }],
      count: 1
    };
  }

  ColleaguesAddComponent.prototype.updateView = function() {
    var templateData = {
      colleaguesAddButtonText: this._updateColleaguesAddButtonText(this.colleaguesToAdd.count),
      colleaguesToAddCount: this.colleaguesToAdd.count
    };
    this.template.render(templateData);

    this.colleaguesAddListComponent = new app.ColleaguesAddListComponent(this.colleaguesToAdd.colleaguesToAdd);
    this.colleaguesAddListComponent.updateView();

    this._bindEvents();
  }

  ColleaguesAddComponent.prototype._bindEvents = function () {
    var eventName = 'colleagues-add-list-item-add';
    var button = qs(`[data-action="${eventName}"]`, this.template.templateTarget);

    on(button, 'click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      this.colleaguesToAdd.count += 1;
      // TODO: Refactor using a model
      this.colleaguesToAdd.colleaguesToAdd.push({ email: '', name: '' });

      // TODO: Save to data store before updating, get from data store while updating, to save unsubmitted data
      this.updateView();

      // var customEvent = new CustomEvent(eventName);
      // document.dispatchEvent(customEvent); // Dispatching to `document` because more than one component listen to it
    }.bind(this))
  }

  ColleaguesAddComponent.prototype._updateColleaguesAddButtonText = function (count) {
    if (count === 1) {
      return this.colleaguesAddButtonText
    } else {
      return `Add ${count} colleagues`
    }
  }

  window.app = window.app || {};
  window.app.ColleaguesAddComponent = ColleaguesAddComponent;
})();
