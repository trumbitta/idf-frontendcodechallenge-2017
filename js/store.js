(function() {
  'use strict';

  var localStorage = window.localStorage;

  function Store(dbName) {
    this.dbName = dbName;

    // var mockData = {
    //     count: 3,
    //     existingUsers: [
    //         { name: 'Donald', email: 'donald@disney.com' },
    //         { name: 'Goofy', email: 'goofy@disney.com' },
    //         { name: 'Mickey', email: 'mickey@disney.com' }
    //     ]
    // };
    // localStorage.setItem(dbName, JSON.stringify(mockData));

    if (localStorage.getItem(dbName) === null) {
      var data = {
        count: 0,
        existingUsers: []
      };

      localStorage.setItem(dbName, JSON.stringify(data));
    }
  }

  Store.prototype.findAll = function() {
    var data = JSON.parse(localStorage.getItem(this.dbName));
    return data;
  };

  Store.prototype.save = function(data) {
    localStorage.setItem(this.dbName, JSON.stringify(data));
  }

  window.app = window.app || {};
  window.app.Store = Store;
})();
