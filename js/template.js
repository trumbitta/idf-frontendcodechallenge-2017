(function(document) {
  'use strict';

  function Template(name) {
    this.templateTarget = document.querySelector(`[data-template="${name}"]`);
    this.templateHTML = document.getElementById(name).innerHTML;
  }

  Template.prototype.render = function(data) {
    var templateHTMLPopulated = this.templateHTML;
    for (var key in data) {
      // TODO: allow for an arbitrary number of spaces between the parenthesis and the variable key
      templateHTMLPopulated = templateHTMLPopulated.replace(new RegExp('{{' + key + '}}', 'g'), data[key]);
    }
    this.templateTarget.innerHTML = templateHTMLPopulated;
  }

  window.app = window.app || {};
  window.app.Template = Template;
})(document);
