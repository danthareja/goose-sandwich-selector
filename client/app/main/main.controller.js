'use strict';

angular.module('gooseSandwichApp')
  .controller('MainCtrl', function ($scope, Tweet) {

    $scope.orderSandwich = function() {

      // Maybe add some random tony compliment at the end? or Tony hashtag?
      var order = { tweet: "(at) thegoosemen the I just ordered a " + $scope.sandwich + " from @thegoosewheel. What will you get?" };
      Tweet.sendTweet(order);
      $scope.sandwich = "";
    };

  });