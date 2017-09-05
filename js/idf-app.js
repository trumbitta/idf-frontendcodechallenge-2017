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

        // Use data to populate "Existing colleagues" and current number
    }

    window.app = window.app || {};
    window.app.IDFApp = IDFApp;
})(window);