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
        $http.post('/api/sandwiches/tweet', order)
        .success(function(){
          console.log("Tweet away!");
        })
        .error(function() {
          console.log("error sending tweet");
        });
      }
    };

    return attach;
  });