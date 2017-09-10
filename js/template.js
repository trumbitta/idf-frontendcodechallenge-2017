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

    var newElement = document.createElement(this.templateTarget.tagName);

    var preservedClasses = this.templateTarget.classList;
    // This block is needed because the spread operator wasn't really working with Edge.
    // Also because of Edge, see `DOMTokenList.prototype.forEach = Array.prototype.forEach;` in `utils.js`
    if (preservedClasses.length > 0) {
      preservedClasses.forEach(function(className) {
        newElement.classList.add(className);
      }, this);
    }

    newElement.innerHTML = templateHTMLPopulated;

    var parentNode = this.templateTarget.parentNode;
    parentNode.replaceChild(newElement, this.templateTarget);
    this.templateTarget = newElement; // update templateTarget element in object instance
  }

  window.app = window.app || {};
  window.app.Template = Template;
})();
