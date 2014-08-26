'use strict';

angular.module('gooseSandwichApp')
  .controller('EnjoyCtrl', function ($scope, $window, Auth) {
    $scope.message = 'Hello';
    $scope.logout = function() {
      Auth.logout();
      $window.location.href = "/";
    }
  });
