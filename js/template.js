(function() {
  'use strict';

  function Template(name, scope) {
    this.templateTarget = qs(`[data-template="${name}"]`, scope);
    this.templateHTML = qid(name).innerHTML;
  }

  Template.prototype.render = function(data) {
    var templateHTMLPopulated = this.templateHTML;
    for (var key in data) {
      // TODO: allow for an arbitrary number of spaces between the parenthesis and the variable key
      templateHTMLPopulated = templateHTMLPopulated.replace(new RegExp('{{' + key + '}}', 'g'), data[key]);
    }

    var parentNode = this.templateTarget.parentNode;
    var newElement = document.createElement(this.templateTarget.tagName);
    newElement.innerHTML = templateHTMLPopulated;
    parentNode.replaceChild(newElement, this.templateTarget);
  }

  window.app = window.app || {};
  window.app.Template = Template;
})();
