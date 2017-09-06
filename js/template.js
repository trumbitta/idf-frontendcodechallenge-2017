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
    this.templateTarget.innerHTML = templateHTMLPopulated;
  }

  window.app = window.app || {};
  window.app.Template = Template;
})();
