'use strict';

describe('Controller: SandwichCtrl', function () {

  // load the controller's module
  beforeEach(module('gooseSandwichApp'));

  var SandwichCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SandwichCtrl = $controller('SandwichCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
