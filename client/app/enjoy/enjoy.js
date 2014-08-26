'use strict';

angular.module('gooseSandwichApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('enjoy', {
        url: '/enjoy',
        templateUrl: 'app/enjoy/enjoy.html',
        controller: 'EnjoyCtrl'
      });
  });