(function() {
  'use strict';

  var localStorage = window.localStorage;

  function Store(dbName) {
    this.dbName = dbName;

    // var mockData = {
    //     colleaguesToAdd: [
    //       { email: 'root@disney.com', name: 'Scrooge McDuck' }
    //     ],
    //     existingColleagues: [
    //         { email: 'donald@disney.com', name: 'Donald' },
    //         { email: 'goofy@disney.com', name: 'Goofy' },
    //         { email: 'mickey@disney.com', name: 'Mickey' }
    //     ]
    // };
    // localStorage.setItem(dbName, JSON.stringify(mockData));

    if (localStorage.getItem(dbName) === null) {
      var data = {
        colleaguesToAdd: [
          { email: '', name: '' }
        ],
        existingColleagues: []
      };

      localStorage.setItem(dbName, JSON.stringify(data));
    }
  }

  Store.prototype.findAll = function(key) {
    var data = JSON.parse(localStorage.getItem(this.dbName));
    if (key !== undefined) {
      data = data[key];
    }
    return data;
  };

  Store.prototype.save = function(key, data) {
    var dataToUpdate = JSON.parse(localStorage.getItem(this.dbName));
    dataToUpdate[key] = data;

    localStorage.setItem(this.dbName, JSON.stringify(dataToUpdate));
  }

  window.app = window.app || {};
  window.app.Store = Store;
})();
