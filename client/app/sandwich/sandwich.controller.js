'use strict';

angular.module('gooseSandwichApp')
  .controller('SandwichCtrl', function ($scope, $window, $state, Sandwich, Auth, Tweet, localStorageService) {
    $scope.sandwich = localStorageService.get('sandwich');

    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.spinAgain = function() {
      var sandwichPrefs = localStorageService.get('sandwichPrefs');
      // hide sandwich, show spin animation for small amount of time, refresh scope.sandwich & show again
      Sandwich.getMatchingSandwich(sandwichPrefs.meat, sandwichPrefs.cheese, sandwichPrefs.sauce);
    };

    $scope.orderSandwich = function() {
      var isConfirmed = confirm("Please make ABSOLUTELY SURE that you actually want this sandwich made. Tony WILL make it if you hit ok, don't leave him hanging.")
      
      if (isConfirmed) {
        // Maybe add some random tony compliment at the end? or Tony hashtag?
        var order = { tweet: "(at) thegoosemen I just ordered a " + $scope.sandwich.name + " from @thegoosewheel. #righttherethatis" };
        Tweet.sendTweet(order);
        // $state.go('enjoy');
      }
    };

  });
