'use strict';

angular.module('gooseSandwichApp')
  .controller('MainCtrl', function ($window, $scope, $state, Sandwich) {
    $scope.meatList = ['bacon', 'buffalo chicken', 'cheesesteak', 'grilled chicken', 'ham', 'meatballs', 'pepper ham', 'pepperoni', 'roast beef', 'santa fe turkey', 'sausage', 'turkey'];
    $scope.cheeseList = ['any', 'american', 'cheddar', 'cheddar jack', 'muenster', 'pepper jack', 'provolone', 'swiss'];
    $scope.sauceList = ['none', 'au jus', 'barbecue', 'hot sauce', 'mayo', 'mustard', 'russian', 'tomato sauce'];
    
    $scope.meatRadio = {model: 'bacon'};
    $scope.cheeseRadio = {model: 'any'};
    $scope.sauceRadio = {model: 'none'};

    $scope.isProcessing = false;

    $scope.getRandomSandwich = function() {
      $scope.isProcessing = true;
      Sandwich.getRandomSandwich(function(){
        $scope.isProcessing = false;
        $state.go('sandwich');
      });
    };

    $scope.getMatchingSandwich = function() {
      // Start processing animation here
      var meat = $scope.meatRadio.model;
      var cheese = $scope.cheeseRadio.model;
      var sauce = $scope.sauceRadio.model;
      
      Sandwich.getMatchingSandwich(meat, cheese, sauce, function() {
        $state.go('sandwich');
      });
    };
  });