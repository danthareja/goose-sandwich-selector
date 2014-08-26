'use strict';

angular.module('gooseSandwichApp')
  .controller('SandwichCtrl', function ($scope, $window, $state, Sandwich, Auth, Tweet, localStorageService) {
    $scope.sandwich = localStorageService.get('sandwich');
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isProcessing = false;

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.spinAgain = function() {
      $scope.isProcessing = true;
      // hide sandwich, show spin animation for small amount of time, refresh scope.sandwich & show again
      var sandwichPrefs = localStorageService.get('sandwichPrefs');
      if (sandwichPrefs) {
        Sandwich.getMatchingSandwich(sandwichPrefs.meat, sandwichPrefs.cheese, sandwichPrefs.sauce, function() {
          $scope.isProcessing = false;
          $scope.sandwich = localStorageService.get('sandwich');
        });
      } else {
        Sandwich.getRandomSandwich(function() {
          $scope.isProcessing = false;
          $scope.sandwich = localStorageService.get('sandwich');
        });
      }
    };

    $scope.orderSandwich = function() {
      var isConfirmed = confirm("Please make ABSOLUTELY SURE that you actually want this sandwich made. Tony WILL make it if you hit ok, don't leave him hanging.")
      
      if (isConfirmed) {
        // Maybe add some random tony compliment at the end? or Tony hashtag?
        var order = { tweet: "(at) thegoosemen I just ordered a " + $scope.sandwich.name + " from @thegoosewheel. #righttherethatis" };
        Tweet.sendTweet(order);
      }
    };

  });
