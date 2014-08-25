'use strict';

angular.module('gooseSandwichApp')
  .controller('MainCtrl', function ($scope, Tweet) {
    $scope.meatList = ['bacon',
                    'buffalo chicken',
                    'cheesesteak',
                    'chicken',
                    'corned beef',
                    'eggs',
                    'grilled chicken',
                    'ham',
                    'meatballs',
                    'pepper ham',
                    'pepperoni',
                    'prosciutto',
                    'pepper turkey',
                    'roast beef',
                    'santa fe turkey',
                    'salami',
                    'sausage',
                    'turkey',];

    $scope.cheeseList = ['any',
                      'american',
                      'cheddar',
                      'cheddar jack',
                      'muenster',
                      'pepper jack',
                      'provolone',
                      'swiss'];

    $scope.sauceList = ['none',
                        'au jus',
                        'barbecue',
                        'hot sauce',
                        'mayo',
                        'mustard',
                        'ranch',
                        'russian',
                        'tomato sauce'];

    $scope.meatRadio = {model: undefined};
    $scope.cheeseRadio = {model: 'any'};
    $scope.sauceRadio = {model: 'none'};


    $scope.orderSandwich = function() {
      // Maybe add some random tony compliment at the end? or Tony hashtag?
      var order = { tweet: "(at) thegoosemen the I just ordered a " + $scope.sandwich + " from @thegoosewheel. What will you get?" };
      Tweet.sendTweet(order);
      $scope.sandwich = "";
    };

  });