'use strict';

angular.module('gooseSandwichApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sandwich', {
        url: '/sandwich',
        templateUrl: 'app/sandwich/sandwich.html',
        controller: 'SandwichCtrl'
      });
  });