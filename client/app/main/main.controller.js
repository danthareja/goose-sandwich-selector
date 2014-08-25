'use strict';

angular.module('gooseSandwichApp')
  .controller('MainCtrl', function ($window, $scope, Sandwich) {
    $scope.meatList = ['bacon', 'buffalo chicken', 'cheesesteak', 'chicken', 'corned beef', 'eggs', 'grilled chicken', 'ham', 'meatballs', 'pepper ham', 'pepperoni', 'prosciutto', 'pepper turkey', 'roast beef', 'santa fe turkey', 'salami', 'sausage', 'turkey'];
    $scope.cheeseList = ['any', 'american', 'cheddar', 'cheddar jack', 'muenster', 'pepper jack', 'provolone', 'swiss'];
    $scope.sauceList = ['none', 'au jus', 'barbecue', 'hot sauce', 'mayo', 'mustard', 'ranch', 'russian', 'tomato sauce'];
    
    $scope.meatRadio = {model: 'bacon'};
    $scope.cheeseRadio = {model: 'any'};
    $scope.sauceRadio = {model: 'none'};

    $scope.getRandomSandwich = Sandwich.getRandomSandwich;

    $scope.getMatchingSandwich = function() {
      // Start processing animation here
      var meat = $scope.meatRadio.model;
      var cheese = $scope.cheeseRadio.model;
      var sauce = $scope.sauceRadio.model;
      
      Sandwich.getMatchingSandwich(meat, cheese, sauce);
    };
  });