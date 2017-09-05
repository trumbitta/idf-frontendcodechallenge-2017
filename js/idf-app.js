(function(window) {
    'use strict';

    var self;

    function IDFApp(name) {
        this.store = new app.Store(name);
        self = this;
    }

    IDFApp.prototype.init = function() {
        console.log('App started');

        // Start session, load data from storage
        var existingUsers = self.store.findAll();
        console.log('Existing users:', existingUsers);

        // This block should be a component, somehow :-/
        var templateName = 'colleagues-status';
        var templateData = {
            colleaguesCount: existingUsers.count,
            colleaguesLeft: 10 - existingUsers.count // '10' should be a configuration constant
        };
        self.colleaguesStatusTemplate = new app.Template(templateName);
        self.colleaguesStatusTemplate.render(templateData);
    }

    window.app = window.app || {};
    window.app.IDFApp = IDFApp;
})(window);