'use strict';

angular.module('gooseSandwichApp')
  .controller('MainCtrl', function ($scope, Tweet) {

    $scope.sendTweet = function() {
      var order = {tweet: "@dandougdot testing out a new product, want a " + $scope.sandwich + "?"};
      Tweet.sendTweet(order);
      $scope.sandwich = "";
    };

  });