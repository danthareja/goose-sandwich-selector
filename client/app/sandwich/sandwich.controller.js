'use strict';

angular.module('gooseSandwichApp')
  .controller('SandwichCtrl', function ($scope, $window, $state, $timeout, Sandwich, Auth, Tweet, localStorageService, dialogs) {
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
          $timeout(function() {
            $scope.isProcessing = false;
            $scope.sandwich = localStorageService.get('sandwich');
          }, Math.floor(Math.random() * 1500 + 250));
        });
      } else {
        Sandwich.getRandomSandwich(function() {
          $timeout(function(){
            $scope.isProcessing = false;
            $scope.sandwich = localStorageService.get('sandwich');
          }, Math.floor(Math.random() * 1500 + 250));
        });
      }
    };

    $scope.orderSandwich = function() {
      // Makes use of angular-dialog-service. 
      // Check out angular-dialog-service/dialogs-default-translations.js for other confirm text
      var isConfirmed = dialogs.confirm("Do you really want this sandwich?", "Please make ABSOLUTELY SURE that you actually want this sandwich made. Tony WILL make it if you hit the green button. Don't leave him hanging by not picking up your order...", {
        'windowClass': 'confirm-tweet'
      });
      isConfirmed.result.then(function(){
        var order = { tweet: "(at) thegoosemen I just ordered a " + $scope.sandwich.name + " from @thegoosewheel. #righttherethatis" };
        Tweet.sendTweet(order);
      });
    };

  });
