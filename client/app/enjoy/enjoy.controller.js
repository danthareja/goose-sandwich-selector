'use strict';

angular.module('gooseSandwichApp')
  .controller('EnjoyCtrl', function ($scope, $window, Auth) {

    $scope.redirectToTwitter = function(){
      var user = Auth.getCurrentUser();
      $window.location.href = "https://twitter.com/" + user.twitter.screen_name;
    }

    $scope.logout = function() {
      Auth.logout();
      $window.location.href = "/";
    };


  });
