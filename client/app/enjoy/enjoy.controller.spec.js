'use strict';

describe('Controller: EnjoyCtrl', function () {

  // load the controller's module
  beforeEach(module('gooseSandwichApp'));

  var EnjoyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EnjoyCtrl = $controller('EnjoyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
