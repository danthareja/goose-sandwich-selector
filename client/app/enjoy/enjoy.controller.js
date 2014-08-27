'use strict';

angular.module('gooseSandwichApp')
  .controller('EnjoyCtrl', function ($scope, $window, Auth) {

    $scope.redirectToTwitter = function(){
      var user = Auth.getCurrentUser();
      $window.open('https://twitter.com/' + user.twitter.screen_name + '_blank');
    };

    $scope.logout = function() {
      Auth.logout();
      $window.location.href = '/';
    };
  });
