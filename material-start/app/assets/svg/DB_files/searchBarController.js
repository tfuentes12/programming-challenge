(function () {
  'use strict';
  angular
      .module('users')
      .controller('ContactChipDemoCtrl', DemoCtrl);

  function DemoCtrl ($q, $timeout) {
    var self = this;
    var pendingSearch, cancelSearch = angular.noop;
    var cachedQuery, lastSearch;

    self.allContacts = loadContacts();
    self.contacts = [self.allContacts[0]];
    self.asyncContacts = [];
    self.filterSelected = true;

    self.querySearch = querySearch;
    self.delayedQuerySearch = delayedQuerySearch;

    /**
     * Search for contacts; use a random delay to simulate a remote call
     */
    function querySearch (criteria) {
      cachedQuery = cachedQuery || criteria;
      return cachedQuery ? self.allContacts.filter(createFilterFor(cachedQuery)) : [];
    }

    /**
     * Async search for contacts
     * Also debounce the queries; since the md-contact-chips does not support this
     */
    function delayedQuerySearch(criteria) {
      cachedQuery = criteria;
      if ( !pendingSearch || !debounceSearch() )  {
        cancelSearch();

        return pendingSearch = $q(function(resolve, reject) {
          // Simulate async search... (after debouncing)
          cancelSearch = reject;
          $timeout(function() {

            resolve( self.querySearch() );

            refreshDebounce();
          }, Math.random() * 500, true)
        });
      }

      return pendingSearch;
    }

    function refreshDebounce() {
      lastSearch = 0;
      pendingSearch = null;
      cancelSearch = angular.noop;
    }

    /**
     * Debounce if querying faster than 300ms
     */
    function debounceSearch() {
      var now = new Date().getMilliseconds();
      lastSearch = lastSearch || now;

      return ((now - lastSearch) < 300);
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact._lowername.indexOf(lowercaseQuery) != -1);;
      };

    }

    function loadContacts() {
      var contacts = [
        'ICOM5016 - Databases',
        'MATE666 - Mate der diablou',
        'ICOM4035 - Data Structures',
        'ICOM5016 - Databases',
        'ICOM5016 - Databases',
        'ICOM5016 - Databases',
        'ICOM5016 - Databases',
        'ICOM5016 - Databases',
        'ICOM5016 - Databases',
        'ICOM5016 - Databases',
        'ICOM5016 - Databases',
        'ICOM5016 - Databases',
        'ICOM5016 - Databases',
        'ICOM5016 - Databases'

      ];

      return contacts.map(function (c, index) {
        var cParts = c.split('-');
        var contact = {
          title: c,
          email: cParts[0].toLowerCase() + ' - ' + cParts[1].toLowerCase(),
        };
        contact._lowername = contact.title.toLowerCase();
        return contact;
      });
    }
  }


})();


/**
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
**/