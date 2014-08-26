'use strict';

angular.module('gooseSandwichApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  })

  .factory('Tweet', function($http, $state) {
    var attach = {

      sendTweet: function(order) {
        $http.post('/api/users/tweet', order)
        .success(function(){
          console.log("Tweet away!");
          $state.go('enjoy');
        })
        .error(function() {
          console.log("error sending tweet");
        });
      },
    };

    return attach;
  })

  .factory('Sandwich', function($http, $window, localStorageService) {
      
    // Array value randomizer helper function
    var selectOneFrom = function(array) {
      return array[Math.floor(Math.random() * array.length)];
    };

    var attach = {
      getAllSandwiches: function(callback) {
        $http.get('/api/sandwiches')
        .success(function(sandwiches){
          callback(andwichs);
        })
        .error(function(err) {
          console.log("Error getting all sandwiches", err);
        });
      },

      getMatchingSandwich: function(meat, cheese, sauce, callback) {
        var sandwichPrefs = {
          meat: meat,
          cheese: cheese,
          sauce: sauce
        };

        // Stash preferences for spin again
        localStorageService.set('sandwichPrefs', sandwichPrefs);

        // GET request with query parameters will match only those preferences
        $http.get('/api/sandwiches', {
          params: sandwichPrefs
        })
        .success(function(sandwiches){
          var newSandwich = selectOneFrom(sandwiches);
          localStorageService.set('sandwich', newSandwich);
          callback(newSandwich);
        })
        .error(function(err) {
          console.log("Error getting matching sandwiches", err);
        });
      },

      getRandomSandwich: function(callback) {
        // GET request withOUT query parameters will return ALL sandwiches
        $http.get('/api/sandwiches')
        .success(function(sandwiches){
          localStorageService.remove('sandwichPrefs');
          var newSandwich = selectOneFrom(sandwiches);
          localStorageService.set('sandwich', newSandwich);
          callback(newSandwich);
        })
        .error(function(err) {
          console.log("Error getting random sandwiches", err);
        });
      },
    };
    
    return attach;
  });