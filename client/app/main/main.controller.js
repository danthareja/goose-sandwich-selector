'use strict';

angular.module('gooseSandwichApp')
  .controller('MainCtrl', function ($window, $scope, $state, $timeout, Sandwich) {
    $scope.sandwichList = [];
    $scope.currentSandwiches = [];

    // Gets all sandwiches -- maybe not the best if database gets bigger
    Sandwich.getAllSandwiches(function(sandwiches){
      $scope.sandwichList = sandwiches;
      $scope.currentSandwiches = _.filter($scope.sandwichList, function(sandwich){
        return _.contains(sandwich.meat, $scope.meatRadio.model);
      });
    });

    // Initialize ingredient options
    $scope.meatList = ['bacon', 'buffalo chicken', 'cheesesteak', 'grilled chicken', 'ham', 'meatballs', 'pepper ham', 'pepperoni', 'roast beef', 'santa fe turkey', 'sausage', 'turkey'];
    $scope.cheeseList = ['any', 'american', 'cheddar', 'cheddar jack', 'muenster', 'pepper jack', 'provolone', 'swiss'];
    $scope.sauceList = ['none', 'au jus', 'barbecue', 'hot sauce', 'mayo', 'mustard', 'russian', 'tomato sauce'];
    
    // Additional variable to make ng-repeat play nicely with radio buttons
    $scope.meatRadio = {model: 'bacon'};
    $scope.cheeseRadio = {model: 'any'};
    $scope.sauceRadio = {model: 'none'};

    // Animations active based on this property
    $scope.isProcessing = false;

    // Magical function for the angular way
    $scope.containsCheese = function(cheese){
      $scope.currentSandwiches = _.filter($scope.sandwichList, function(sandwich){
        return _.contains(sandwich.meat, $scope.meatRadio.model);
      });
      return _.some($scope.currentSandwiches, {cheese: cheese});
    };

    // Even more magical function for the angular way
    $scope.containsSauce = function(sauce) {
      $scope.currentSandwiches = _.filter($scope.sandwichList, function(sandwich){
        return _.contains(sandwich.meat, $scope.meatRadio.model) && _.contains(sandwich.cheese, $scope.cheeseRadio.model);
      });
      return _.some($scope.currentSandwiches, function(sandwich){
        return _.contains(sandwich.sauce, sauce);
      });
    };

    // Calls to server get all sandwiches. Could technically be done client side now with sandwichList
    $scope.getRandomSandwich = function() {
      $scope.isProcessing = true;
      Sandwich.getRandomSandwich(function(){
        $timeout(function(){
          $scope.isProcessing = false;
          $state.go('sandwich');
        }, Math.floor(Math.random() * 1500 + 250));
      });
    };

    // Calls to server to query db and return a random one. Could technically be done client side now as well
    $scope.getMatchingSandwich = function() {
      var meat = $scope.meatRadio.model;
      var cheese = $scope.cheeseRadio.model;
      var sauce = $scope.sauceRadio.model;
      
      Sandwich.getMatchingSandwich(meat, cheese, sauce, function() {
        $state.go('sandwich');
      });
    };
  });