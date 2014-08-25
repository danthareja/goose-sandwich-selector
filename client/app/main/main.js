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
  .factory('Sandwich', function($http) {
    var attach = {

      getSandwich: function(meat, cheese, sauce) {
        //start processing here (spin wheel);
        var sandwichPrefs = {
          meat: meat,
          cheese: cheese,
          sauce: sauce
        };

        $http.get('/api/sandwiches', {
          params: sandwichPrefs
        })
        .success(function(data){
          console.log("Got sandwiches!", data);
        })
        .error(function(err) {
          console.log("Error getting sandwiches", err);
        });
      },

      getRandomSandwich: function() {
        //start processing here (spin wheel);
 
         $http.get('/api/sandwiches')
        .success(function(data){
          console.log("Got sandwiches!", data);
        })
        .error(function(err) {
          console.log("Error getting sandwiches", err);
        });
      },

    };
    
    return attach;
  });