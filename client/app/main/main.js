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

  .factory('Tweet', function($http) {
    var attach = {

      sendTweet: function(order) {
        $http.post('/api/users/tweet', order)
        .success(function(){
          console.log("Tweet away!");
        })
        .error(function() {
          console.log("error sending tweet");
        });
      },
    };

    return attach;
  })

  .factory('Sandwich', function($http, $window, $state, localStorageService) {

    var setCurrentSandwich = function(newSandwich) {
      // Use local storage to persist sandwich data through auth and refreshes
      localStorageService.set('sandwich', newSandwich);
      $state.go('sandwich');
      console.log(localStorageService.get('sandwich'));
    };
      
    // Array value randomizer helper function
    var selectOneFrom = function(array, callback) {
      var item = array[Math.floor(Math.random() * array.length)];
      callback(item);
    };

    var attach = {
      getMatchingSandwich: function(meat, cheese, sauce) {
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
          selectOneFrom(sandwiches, setCurrentSandwich); // Call setCurrentSandwich so we can store the data and access it across controllers
        })
        .error(function(err) {
          console.log("Error getting sandwiches", err);
        });
      },

      getRandomSandwich: function() {
        // GET request withOUT query parameters will return ALL sandwiches
        $http.get('/api/sandwiches')
        .success(function(sandwiches){
          selectOneFrom(sandwiches, setCurrentSandwich); // Call setCurrentSandwich so we can store the data and access it across controllers
        })
        .error(function(err) {
          console.log("Error getting sandwiches", err);
        });
      },
    };
    
    return attach;
  });